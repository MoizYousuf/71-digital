import type { VercelRequest, VercelResponse } from "@vercel/node";
import serverless from "serverless-http";
import express from "express";
import { registerRoutes } from "../server/routes";
import path from "path";
import fs from "fs";

// Create Express app instance
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Initialize routes
let appInitialized = false;
let handlerPromise: Promise<any> | null = null;

async function initializeApp() {
    if (appInitialized) return;

    await registerRoutes(app);

    // Error handler
    app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
        const status = err.status || err.statusCode || 500;
        const message = err.message || "Internal Server Error";
        res.status(status).json({ message });
    });

    // Serve static files in production
    // Note: Vercel serves static files from outputDirectory automatically,
    // but we keep this as a fallback for the serverless function
    const distPath = path.resolve(process.cwd(), "dist", "public");
    if (fs.existsSync(distPath)) {
        // Serve static assets with proper cache headers
        app.use("/assets", express.static(path.join(distPath, "assets"), {
            maxAge: "1y",
            immutable: true
        }));
        // Serve other static files (favicon, etc.)
        app.use(express.static(distPath, {
            maxAge: "1y"
        }));
        // fall through to index.html for SPA routes
        app.use("*", (_req, res) => {
            res.sendFile(path.resolve(distPath, "index.html"));
        });
    }

    appInitialized = true;
}

// Vercel serverless function handler
export default async function vercelHandler(req: VercelRequest, res: VercelResponse) {
    // Initialize app if not already done
    if (!appInitialized) {
        await initializeApp();
        // Create serverless handler after initialization
        handlerPromise = Promise.resolve(serverless(app));
    }

    const handler = await handlerPromise!;
    return handler(req, res);
}

