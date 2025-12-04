import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage.js";
import { insertContactSubmissionSchema, insertAppointmentSchema, adminLoginSchema } from "@shared/schema";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

function generateSessionToken() {
  return randomBytes(32).toString("hex");
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Create default admin user if none exists
  const initializeAdmin = async () => {
    try {
      const existingAdmin = await storage.getAdminByUsername("admin");
      if (!existingAdmin) {
        const hashedPassword = await hashPassword("admin123");
        await storage.createAdminUser({
          username: "admin",
          password: hashedPassword,
        });
        console.log("Default admin user created: username=admin, password=admin123");
      }
    } catch (error) {
      console.error("Error initializing admin user:", error);
    }
  };
  
  initializeAdmin();

  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      res.json({ success: true, id: submission.id });
    } catch (error) {
      console.error("Contact form submission error:", error);
      res.status(400).json({ 
        success: false, 
        error: "Invalid form data" 
      });
    }
  });

  // Get all contact submissions (for admin purposes)
  app.get("/api/contact", async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to fetch submissions" 
      });
    }
  });

  // Appointment booking submission endpoint
  app.post("/api/appointments", async (req, res) => {
    try {
      const validatedData = insertAppointmentSchema.parse(req.body);
      const appointment = await storage.createAppointment(validatedData);
      res.json({ success: true, id: appointment.id });
    } catch (error) {
      console.error("Appointment booking error:", error);
      res.status(400).json({ 
        success: false, 
        error: "Invalid appointment data" 
      });
    }
  });

  // Get all appointments (for admin purposes)
  app.get("/api/appointments", async (req, res) => {
    try {
      const appointments = await storage.getAppointments();
      res.json(appointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to fetch appointments" 
      });
    }
  });

  // Admin authentication routes
  app.post("/api/admin/login", async (req, res) => {
    try {
      const validatedData = adminLoginSchema.parse(req.body);
      const admin = await storage.getAdminByUsername(validatedData.username);
      
      if (!admin || !(await comparePasswords(validatedData.password, admin.password))) {
        return res.status(401).json({ success: false, error: "Invalid credentials" });
      }

      const sessionToken = generateSessionToken();
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
      
      await storage.createAdminSession(admin.id, sessionToken, expiresAt);
      
      res.json({ 
        success: true, 
        sessionToken,
        admin: { id: admin.id, username: admin.username }
      });
    } catch (error) {
      console.error("Admin login error:", error);
      res.status(400).json({ success: false, error: "Invalid login data" });
    }
  });

  app.post("/api/admin/logout", async (req, res) => {
    try {
      const sessionToken = req.headers.authorization?.replace("Bearer ", "");
      if (sessionToken) {
        await storage.deleteAdminSession(sessionToken);
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Admin logout error:", error);
      res.status(500).json({ success: false, error: "Logout failed" });
    }
  });

  app.get("/api/admin/me", async (req, res) => {
    try {
      const sessionToken = req.headers.authorization?.replace("Bearer ", "");
      if (!sessionToken) {
        return res.status(401).json({ success: false, error: "No session token" });
      }

      const admin = await storage.getAdminBySessionToken(sessionToken);
      if (!admin) {
        return res.status(401).json({ success: false, error: "Invalid session" });
      }

      res.json({ 
        success: true, 
        admin: { id: admin.id, username: admin.username }
      });
    } catch (error) {
      console.error("Admin session check error:", error);
      res.status(500).json({ success: false, error: "Session check failed" });
    }
  });

  // Protected admin routes
  async function requireAdmin(req: any, res: any, next: any) {
    try {
      const sessionToken = req.headers.authorization?.replace("Bearer ", "");
      if (!sessionToken) {
        return res.status(401).json({ success: false, error: "No session token" });
      }

      const admin = await storage.getAdminBySessionToken(sessionToken);
      if (!admin) {
        return res.status(401).json({ success: false, error: "Invalid session" });
      }

      req.admin = admin;
      next();
    } catch (error) {
      console.error("Admin auth middleware error:", error);
      res.status(500).json({ success: false, error: "Authentication failed" });
    }
  }

  app.get("/api/admin/contacts", requireAdmin, async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching admin contacts:", error);
      res.status(500).json({ success: false, error: "Failed to fetch contacts" });
    }
  });

  // Update contact submission status
  app.patch("/api/admin/contacts/:id/status", requireAdmin, async (req, res) => {
    try {
      const submissionId = parseInt(req.params.id);
      const { status, rejectionReason } = req.body;

      if (!status || !["unread", "responded", "ignored"].includes(status)) {
        return res.status(400).json({ success: false, error: "Invalid status" });
      }

      if (status === "ignored" && !rejectionReason) {
        return res.status(400).json({ success: false, error: "Ignore reason is required" });
      }

      const updatedSubmission = await storage.updateContactSubmissionStatus(
        submissionId,
        status,
        rejectionReason
      );

      res.json({ success: true, submission: updatedSubmission });
    } catch (error) {
      console.error("Error updating contact status:", error);
      res.status(500).json({ success: false, error: "Failed to update contact status" });
    }
  });

  app.get("/api/admin/appointments", requireAdmin, async (req, res) => {
    try {
      const appointments = await storage.getAppointments();
      res.json(appointments);
    } catch (error) {
      console.error("Error fetching admin appointments:", error);
      res.status(500).json({ success: false, error: "Failed to fetch appointments" });
    }
  });

  // Update appointment status
  app.patch("/api/admin/appointments/:id/status", requireAdmin, async (req, res) => {
    try {
      const appointmentId = parseInt(req.params.id);
      const { status, rejectionReason } = req.body;

      if (!status || !["pending", "approved", "rejected", "completed"].includes(status)) {
        return res.status(400).json({ success: false, error: "Invalid status" });
      }



      const updatedAppointment = await storage.updateAppointmentStatus(
        appointmentId,
        status,
        rejectionReason
      );

      res.json({ success: true, appointment: updatedAppointment });
    } catch (error) {
      console.error("Error updating appointment status:", error);
      res.status(500).json({ success: false, error: "Failed to update appointment status" });
    }
  });

  app.post("/api/admin/create-admin", requireAdmin, async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ success: false, error: "Username and password are required" });
      }

      const existingAdmin = await storage.getAdminByUsername(username);
      if (existingAdmin) {
        return res.status(400).json({ success: false, error: "Username already exists" });
      }

      const hashedPassword = await hashPassword(password);
      const newAdmin = await storage.createAdminUser({
        username,
        password: hashedPassword,
      });

      res.json({ 
        success: true, 
        admin: { id: newAdmin.id, username: newAdmin.username }
      });
    } catch (error) {
      console.error("Error creating admin:", error);
      res.status(500).json({ success: false, error: "Failed to create admin account" });
    }
  });

  app.get("/api/admin/admins", requireAdmin, async (req, res) => {
    try {
      const admins = await storage.getAllAdmins();
      // Don't return passwords
      const safeAdmins = admins.map(admin => ({
        id: admin.id,
        username: admin.username,
        createdAt: admin.createdAt
      }));
      res.json(safeAdmins);
    } catch (error) {
      console.error("Error fetching admins:", error);
      res.status(500).json({ success: false, error: "Failed to fetch admin accounts" });
    }
  });

  app.put("/api/admin/admins/:id", requireAdmin, async (req, res) => {
    try {
      const adminId = parseInt(req.params.id);
      const { username, password } = req.body;
      
      if (!username) {
        return res.status(400).json({ success: false, error: "Username is required" });
      }

      // Check if username already exists (excluding current admin)
      const existingAdmin = await storage.getAdminByUsername(username);
      if (existingAdmin && existingAdmin.id !== adminId) {
        return res.status(400).json({ success: false, error: "Username already exists" });
      }

      const updates: any = { username };
      if (password) {
        updates.password = await hashPassword(password);
      }

      const updatedAdmin = await storage.updateAdminUser(adminId, updates);
      res.json({ 
        success: true, 
        admin: { id: updatedAdmin.id, username: updatedAdmin.username }
      });
    } catch (error) {
      console.error("Error updating admin:", error);
      res.status(500).json({ success: false, error: "Failed to update admin account" });
    }
  });

  app.delete("/api/admin/admins/:id", requireAdmin, async (req, res) => {
    try {
      const adminId = parseInt(req.params.id);
      const currentAdmin = (req as any).admin;
      
      // Prevent deleting self
      if (adminId === currentAdmin.id) {
        return res.status(400).json({ success: false, error: "Cannot delete your own account" });
      }

      await storage.deleteAdminUser(adminId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting admin:", error);
      res.status(500).json({ success: false, error: "Failed to delete admin account" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
