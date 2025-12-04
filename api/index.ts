import type { VercelRequest, VercelResponse } from "@vercel/node";
import serverless from "serverless-http";
import express from "express";
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
    // Try to register API routes, but don't fail if database is not configured
    // This allows static files to be served even if API routes fail
    const hasDatabase = !!process.env.DATABASE_URL;
    
    if (!hasDatabase) {
        console.warn("⚠️  DATABASE_URL is not set - API routes will not work");
        // Add a fallback for API routes - use all HTTP methods
        app.all("/api/*", (req, res) => {
            res.status(500).json({ 
                error: "Database not configured",
                message: "DATABASE_URL environment variable is not set. Please configure it in Vercel project settings."
            });
        });
    } else {
        // Dynamically import routes to catch any import-time errors
        try {
            const { registerRoutes } = await import("../server/routes.js");
            // Register API routes first (these must come before static file serving)
            // Note: registerRoutes returns a Server, but we don't need it for serverless
            await registerRoutes(app);
            console.log("✅ API routes registered successfully");
        } catch (importError) {
            console.error("❌ Error importing/registering routes:", importError);
            // Add a fallback route handler for API routes if registration fails
            app.all("/api/*", (req, res) => {
                res.status(500).json({ 
                    error: "Server configuration error",
                    message: importError instanceof Error ? importError.message : "Unknown error"
                });
            });
        }
    }

    // SPA fallback: serve index.html for all non-API routes
    // Note: Vercel serves static files from outputDirectory automatically,
    // so we only need to handle SPA routing here
    const distPath = path.resolve(process.cwd(), "dist", "public");
    const indexPath = path.resolve(distPath, "index.html");
    
    if (fs.existsSync(indexPath)) {
        console.log("✅ index.html found at:", indexPath);
        
        // SPA fallback: serve index.html for all non-API GET/HEAD requests
        // This handles client-side routing (like /admin/login, /admin/dashboard, etc.)
        app.get("*", (req, res, next) => {
            // Skip if it's an API route
            if (req.path.startsWith("/api")) {
                return res.status(404).json({ error: "API endpoint not found" });
            }
            
            // Serve index.html for SPA routing
            res.sendFile(indexPath, (err) => {
                if (err) {
                    console.error("Error sending index.html:", err);
                    next(err);
                }
            });
        });
        
        // Handle other HTTP methods for non-API routes (POST, PUT, DELETE, etc.)
        app.all("*", (req, res) => {
            if (req.path.startsWith("/api")) {
                res.status(404).json({ error: "API endpoint not found" });
            } else if (req.method !== "GET" && req.method !== "HEAD") {
                res.status(404).json({ error: "Not found" });
            }
            // GET/HEAD requests are handled by app.get("*") above
        });
    } else {
        console.error("❌ index.html not found at:", indexPath);
        // Fallback for missing index.html
        app.use("*", (req, res) => {
            if (req.path.startsWith("/api")) {
                res.status(404).json({ error: "API endpoint not found" });
            } else {
                res.status(500).json({ 
                    error: "Application not built correctly",
                    message: `index.html not found at: ${indexPath}`
                });
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
    
    console.log("✅ App initialization complete");
}

// Vercel serverless function handler
export default async function vercelHandler(req: VercelRequest, res: VercelResponse) {
    try {
        // Ensure initialization happens only once
        if (!initializationPromise) {
            console.log("🚀 Initializing app...");
            initializationPromise = initializeApp()
                .then(() => {
                    // Create serverless handler after initialization
                    handler = serverless(app);
                    console.log("✅ Serverless handler created");
                })
                .catch((initError) => {
                    console.error("❌ Initialization failed:", initError);
                    // Create a minimal handler that just serves static files
                    handler = serverless(app);
                    // The app should still work for static files even if routes failed
                });
        }
        
        // Wait for initialization to complete
        await initializationPromise;
        
        // Ensure handler exists
        if (!handler) {
            throw new Error("Handler not initialized");
        }
        
        // Call the handler
        // serverless-http returns a promise that resolves when response is sent
        return handler(req, res);
    } catch (error) {
        console.error("❌ Handler error:", error);
        console.error("Error stack:", error instanceof Error ? error.stack : "No stack");
        // Make sure we haven't already sent a response
        if (!res.headersSent) {
            res.status(500).json({ 
                error: "Internal server error",
                message: error instanceof Error ? error.message : "Unknown error",
                hint: "Check Vercel function logs for more details"
            });
        }
    }
}
