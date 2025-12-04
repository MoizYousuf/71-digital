import type { VercelRequest, VercelResponse } from "@vercel/node";
import serverless from "serverless-http";
import express from "express";
import path from "path";
import fs from "fs";

// Create Express app instance
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Request logging middleware
app.use((req, res, next) => {
    console.log(`🔍 Express middleware: ${req.method} ${req.path} (url: ${req.url}, originalUrl: ${req.originalUrl})`);
    next();
});

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
    // but we'll also serve them here as a fallback
    const distPath = path.resolve(process.cwd(), "dist", "public");
    const indexPath = path.resolve(distPath, "index.html");

    if (fs.existsSync(distPath)) {
        console.log("✅ Static files directory found at:", distPath);

        // Check if assets directory exists
        const assetsPath = path.join(distPath, "assets");
        if (fs.existsSync(assetsPath)) {
            console.log("✅ Assets directory found at:", assetsPath);
            const assetsFiles = fs.readdirSync(assetsPath);
            console.log(`✅ Found ${assetsFiles.length} asset files:`, assetsFiles.slice(0, 5).join(", "), "...");
        } else {
            console.warn("⚠️  Assets directory not found at:", assetsPath);
        }

        // Serve static assets - these will be handled by Vercel CDN first, but this is a fallback
        app.use("/assets", (req, res, next) => {
            console.log(`📦 Asset request: ${req.method} ${req.path}`);
            next();
        });

        app.use("/assets", express.static(assetsPath, {
            maxAge: "1y",
            immutable: true,
            setHeaders: (res, filePath) => {
                // Set proper CORS and content-type headers for JS/CSS modules
                if (filePath.endsWith('.js')) {
                    res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
                } else if (filePath.endsWith('.css')) {
                    res.setHeader('Content-Type', 'text/css; charset=utf-8');
                }
            }
        }));
    }

    if (fs.existsSync(indexPath)) {
        console.log("✅ index.html found at:", indexPath);

        // SPA fallback: serve index.html for all non-API routes
        // This MUST be registered after static file serving
        // This handles client-side routing (like /admin/login, /admin/dashboard, etc.)
        app.use("*", (req, res, next) => {
            // Skip if it's an API route (should have been handled already)
            if (req.path.startsWith("/api")) {
                return res.status(404).json({ error: "API endpoint not found" });
            }

            // Skip if it's a static asset request (should have been handled by static middleware)
            if (req.path.startsWith("/assets") || req.path === "/favicon.png") {
                return next(); // Let static middleware handle it or return 404
            }

            // Only serve index.html for GET/HEAD requests
            if (req.method !== "GET" && req.method !== "HEAD") {
                return res.status(404).json({ error: "Not found" });
            }

            console.log(`📄 Serving index.html for ${req.method} ${req.path} (url: ${req.url})`);
            try {
                // Read and send the file content directly for better compatibility with serverless-http
                const fileContent = fs.readFileSync(indexPath, 'utf-8');
                res.setHeader('Content-Type', 'text/html; charset=utf-8');
                res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
                res.status(200).send(fileContent);
                console.log("✅ index.html sent successfully, length:", fileContent.length);
                // Explicitly end the response to ensure serverless-http knows it's complete
                if (!res.headersSent || res.writableEnded === false) {
                    res.end();
                }
            } catch (fileError) {
                console.error("❌ Error reading/sending index.html:", fileError);
                next(fileError);
            }
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
        console.log(`📥 Request: ${req.method} ${req.url}`);

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
        console.log("🔄 Calling serverless handler...");
        try {
            // Log the request URL for debugging
            // Note: serverless-http might normalize the path, but the client-side router handles routing
            console.log(`📍 Request URL: ${req.url || '/'}`);

            const result = await handler(req, res);
            console.log("✅ Handler completed, response sent:", res.statusCode, "headersSent:", res.headersSent);
            return result;
        } catch (handlerError) {
            console.error("❌ Handler error:", handlerError);
            if (!res.headersSent) {
                res.status(500).json({ error: "Handler error" });
            }
            throw handlerError;
        }
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
