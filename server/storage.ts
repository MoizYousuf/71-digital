import { users, contactSubmissions, appointments, adminUsers, adminSessions, type User, type InsertUser, type ContactSubmission, type InsertContactSubmission, type Appointment, type InsertAppointment, type AdminUser, type InsertAdminUser, type AdminSession } from "../shared/schema.js";
import { db } from "./db.js";
import { eq, desc, and, gt } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  updateContactSubmissionStatus(submissionId: number, status: string, rejectionReason?: string): Promise<ContactSubmission>;
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  getAppointments(): Promise<Appointment[]>;
  updateAppointmentStatus(appointmentId: number, status: string, rejectionReason?: string): Promise<Appointment>;
  // Admin functionality
  createAdminUser(adminUser: InsertAdminUser): Promise<AdminUser>;
  getAdminByUsername(username: string): Promise<AdminUser | undefined>;
  getAllAdmins(): Promise<AdminUser[]>;
  updateAdminUser(adminId: number, updates: Partial<InsertAdminUser>): Promise<AdminUser>;
  deleteAdminUser(adminId: number): Promise<void>;
  createAdminSession(adminId: number, sessionToken: string, expiresAt: Date): Promise<AdminSession>;
  getAdminBySessionToken(sessionToken: string): Promise<AdminUser | undefined>;
  deleteAdminSession(sessionToken: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const [submission] = await db
      .insert(contactSubmissions)
      .values(insertSubmission)
      .returning();
    return submission;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    const submissions = await db
      .select()
      .from(contactSubmissions)
      .orderBy(desc(contactSubmissions.createdAt));
    return submissions;
  }

  async updateContactSubmissionStatus(submissionId: number, status: string, rejectionReason?: string): Promise<ContactSubmission> {
    const [updatedSubmission] = await db
      .update(contactSubmissions)
      .set({ 
        status,
        rejectionReason: rejectionReason || null
      })
      .where(eq(contactSubmissions.id, submissionId))
      .returning();
    return updatedSubmission;
  }

  async createAppointment(insertAppointment: InsertAppointment): Promise<Appointment> {
    const [appointment] = await db
      .insert(appointments)
      .values(insertAppointment)
      .returning();
    return appointment;
  }

  async getAppointments(): Promise<Appointment[]> {
    const appointmentList = await db
      .select()
      .from(appointments)
      .orderBy(desc(appointments.createdAt));
    return appointmentList;
  }

  async updateAppointmentStatus(appointmentId: number, status: string, rejectionReason?: string): Promise<Appointment> {
    const updateData: any = {
      status,
      ...(status === "approved" && { approvedAt: new Date() }),
      ...(status === "completed" && { completedAt: new Date() }),
      ...(status === "rejected" && rejectionReason && { rejectionReason }),
    };

    const [updatedAppointment] = await db
      .update(appointments)
      .set(updateData)
      .where(eq(appointments.id, appointmentId))
      .returning();

    return updatedAppointment;
  }

  // Admin functionality
  async createAdminUser(insertAdminUser: InsertAdminUser): Promise<AdminUser> {
    const [adminUser] = await db
      .insert(adminUsers)
      .values(insertAdminUser)
      .returning();
    return adminUser;
  }

  async getAdminByUsername(username: string): Promise<AdminUser | undefined> {
    const [adminUser] = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.username, username));
    return adminUser || undefined;
  }

  async createAdminSession(adminId: number, sessionToken: string, expiresAt: Date): Promise<AdminSession> {
    const [session] = await db
      .insert(adminSessions)
      .values({
        adminId,
        sessionToken,
        expiresAt,
      })
      .returning();
    return session;
  }

  async getAdminBySessionToken(sessionToken: string): Promise<AdminUser | undefined> {
    const [result] = await db
      .select({
        id: adminUsers.id,
        username: adminUsers.username,
        password: adminUsers.password,
        createdAt: adminUsers.createdAt,
      })
      .from(adminSessions)
      .innerJoin(adminUsers, eq(adminSessions.adminId, adminUsers.id))
      .where(
        and(
          eq(adminSessions.sessionToken, sessionToken),
          gt(adminSessions.expiresAt, new Date())
        )
      );
    return result || undefined;
  }

  async getAllAdmins(): Promise<AdminUser[]> {
    return await db.select().from(adminUsers).orderBy(adminUsers.createdAt);
  }

  async updateAdminUser(adminId: number, updates: Partial<InsertAdminUser>): Promise<AdminUser> {
    const [updatedAdmin] = await db
      .update(adminUsers)
      .set(updates)
      .where(eq(adminUsers.id, adminId))
      .returning();
    return updatedAdmin;
  }

  async deleteAdminUser(adminId: number): Promise<void> {
    // First delete all sessions for this admin
    await db.delete(adminSessions).where(eq(adminSessions.adminId, adminId));
    // Then delete the admin user
    await db.delete(adminUsers).where(eq(adminUsers.id, adminId));
  }

  async deleteAdminSession(sessionToken: string): Promise<void> {
    await db
      .delete(adminSessions)
      .where(eq(adminSessions.sessionToken, sessionToken));
  }
}

export const storage = new DatabaseStorage();
