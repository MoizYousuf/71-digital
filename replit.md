# 71 Digital Cryptocurrency Mining Platform

## Overview

71 Digital is a comprehensive cryptocurrency mining platform built as a full-stack web application. The platform serves as a business website for institutional-grade Bitcoin mining services, featuring hosting solutions, hardware procurement, site management, and global mining operations. The application includes both a public-facing website and an admin dashboard for managing contact submissions and appointment bookings.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **UI Components**: Shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS with custom theme (orange/brown color scheme)
- **State Management**: TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite with hot module replacement

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: Express sessions with PostgreSQL storage
- **Authentication**: Custom password hashing with scrypt
- **API Design**: RESTful endpoints for contact forms, appointments, and admin operations

### Database Architecture
- **ORM**: Drizzle ORM with type-safe queries
- **Provider**: Neon Database (serverless PostgreSQL)
- **Schema**: Defined in shared TypeScript files for type safety
- **Migration**: Drizzle Kit for schema migrations

## Key Components

### Public Website Features
1. **Landing Page**: Hero section, about, stats, pricing, partners
2. **Services Page**: Detailed service offerings and infrastructure
3. **Mining Store**: Hardware catalog with product specifications
4. **Mining Farms**: Facility information and capabilities
5. **Deployment Sites**: Global site locations and specifications
6. **Contact System**: Contact form with service selection
7. **Appointment Booking**: Comprehensive booking system with timezone support
8. **Legal Pages**: Terms of service, privacy policy, terms of use

### Admin Dashboard Features
1. **Contact Management**: View, respond to, and manage contact submissions
2. **Appointment Management**: Approve, reject, and track appointments
3. **Admin User Management**: Create and manage admin accounts
4. **Session Management**: Secure admin authentication with session tokens
5. **Status Tracking**: Filter and sort submissions by status and service type

### Database Schema
- **users**: Basic user authentication (minimal usage)
- **contact_submissions**: Contact form data with status tracking
- **appointments**: Booking system with approval workflow
- **admin_users**: Admin account management
- **admin_sessions**: Secure session management

## Data Flow

### Contact Form Submission
1. User fills out contact form on website
2. Form data validated with Zod schema
3. Submission stored in database with "unread" status
4. Admin can view and respond through dashboard
5. Status updated to "responded" or "ignored"

### Appointment Booking
1. User selects service type and preferred time
2. Timezone and contact information collected
3. Appointment stored with "pending" status
4. Admin reviews and approves/rejects through dashboard
5. Status tracking through approval workflow

### Admin Operations
1. Admin logs in with username/password
2. Session token generated and stored
3. Dashboard provides filtered views of submissions
4. Bulk operations for status updates
5. Secure logout with session cleanup

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Database connectivity
- **drizzle-orm**: Database ORM and query builder
- **@tanstack/react-query**: Server state management
- **react-hook-form**: Form handling and validation
- **@radix-ui/***: UI component primitives
- **tailwindcss**: Utility-first CSS framework
- **wouter**: Lightweight React router

### Development Dependencies
- **vite**: Fast build tool and dev server
- **typescript**: Type safety and IntelliSense
- **tsx**: TypeScript execution for Node.js
- **esbuild**: Fast bundler for production builds

## Deployment Strategy

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string (required)
- **SESSION_SECRET**: Secure random string for sessions (required)
- **NODE_ENV**: Environment setting (development/production)

### Build Process
1. Frontend built with Vite to `dist/public`
2. Backend bundled with esbuild to `dist/index.js`
3. Static assets served from build output
4. Database schema pushed with Drizzle Kit

### Production Setup
- **Platform**: Replit with autoscale deployment
- **Port**: 5000 (mapped to external port 80)
- **Database**: Neon serverless PostgreSQL
- **File Structure**: Monorepo with shared types and utilities

### Development Workflow
- Hot module replacement with Vite
- TypeScript compilation checking
- Database schema synchronization
- Automatic admin user creation (admin/admin123)

## Changelog

Changelog:
- June 19, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.