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

// Initialize routes - use a promise to ensure initialization happens once
let initializationPromise: Promise<void> | null = null;
let handler: any = null;

async function initializeApp(): Promise<void> {
    // Register API routes first (these must come before static file serving)
    // Note: registerRoutes returns a Server, but we don't need it for serverless
    await registerRoutes(app);

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
            const indexPath = path.resolve(distPath, "index.html");
            if (fs.existsSync(indexPath)) {
                res.sendFile(indexPath, (err) => {
                    if (err) {
                        console.error("Error sending index.html:", err);
                        next(err);
                    }
                });
            } else {
                console.error("index.html not found at:", indexPath);
                res.status(500).json({ error: "Application not built correctly" });
            }
        });
    } else {
        console.error("dist/public directory not found at:", distPath);
        // Still allow API routes to work even if static files aren't found
        app.use("*", (req, res) => {
            if (req.path.startsWith("/api")) {
                res.status(404).json({ error: "API endpoint not found" });
            } else {
                res.status(500).json({ error: "Static files not found" });
            }
        });
    }

    // Error handler must be last (after all routes)
    // Express error handlers have 4 parameters: (err, req, res, next)
    app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
        console.error("Express error:", err);
        const status = err.status || err.statusCode || 500;
        const message = err.message || "Internal Server Error";
        if (!res.headersSent) {
            res.status(status).json({ error: message });
        }
    });
}

// Vercel serverless function handler
export default async function vercelHandler(req: VercelRequest, res: VercelResponse) {
    try {
        // Ensure initialization happens only once
        if (!initializationPromise) {
            initializationPromise = initializeApp().then(() => {
                // Create serverless handler after initialization
                handler = serverless(app);
            });
        }
        
        // Wait for initialization to complete
        await initializationPromise;
        
        // Call the handler
        return handler(req, res);
    } catch (error) {
        console.error("Handler error:", error);
        // Make sure we haven't already sent a response
        if (!res.headersSent) {
            res.status(500).json({ 
                error: "Internal server error",
                message: error instanceof Error ? error.message : "Unknown error"
            });
        }
    }
}

