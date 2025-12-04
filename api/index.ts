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

    // Register API routes first (these must come before static file serving)
    await registerRoutes(app);

    // Error handler for API routes
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
        
        // Serve other static files (favicon, etc.) - only if they exist
        // express.static automatically calls next() if file doesn't exist
        app.use(express.static(distPath, {
            maxAge: "1y"
        }));
        
        // SPA fallback: serve index.html for all non-API routes
        // This handles client-side routing (like /admin/login, /admin/dashboard, etc.)
        // and allows wouter to handle 404s for non-existent routes
        app.use("*", (req, res, next) => {
            // Skip if it's an API route (should have been handled by registerRoutes)
            if (req.path.startsWith("/api")) {
                return res.status(404).json({ error: "API endpoint not found" });
            }
            
            // Only serve index.html for GET/HEAD requests (normal page navigation)
            // Other methods (POST, PUT, DELETE) to non-API routes should return 404
            if (req.method !== "GET" && req.method !== "HEAD") {
                return res.status(404).json({ error: "Not found" });
            }
            
            // For GET/HEAD requests to non-API routes, serve index.html
            // This allows the SPA router (wouter) to handle client-side routing
            res.sendFile(path.resolve(distPath, "index.html"), (err) => {
                if (err) {
                    next(err);
                }
            });
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

