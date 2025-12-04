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
    const distPath = path.resolve(process.cwd(), "dist", "public");
    if (fs.existsSync(distPath)) {
        app.use(express.static(distPath));
        // fall through to index.html if the file doesn't exist
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

