# Cynbit Technologies — High-Fidelity Website Recreation + Smart Project Hub

> **Technical Assessment for Full Stack Developer Intern**  
> An autonomous, high-fidelity recreation of the official [Cynbit Technologies](https://www.cynbit.in/) web platform, integrated with an innovative enterprise feature: **Cynbit Smart Project Hub (Discovery & AI Blueprint Engine)** and a protected **Admin Inquiry Command Center**.

> 🌐 **Live Web Application (Vercel)**: [https://cynbit-smart-project-hub.vercel.app](https://cynbit-smart-project-hub.vercel.app)  
> ⚡ **Live Backend API (Render)**: [https://cynbit-smart-project-hub.onrender.com](https://cynbit-smart-project-hub.onrender.com)  
> 🩺 **Live Health Diagnostics**: [https://cynbit-smart-project-hub.onrender.com/api/health](https://cynbit-smart-project-hub.onrender.com/api/health)  
> 📦 **GitHub Repository**: [https://github.com/Ayushi-Choudhary22/cynbit-smart-project-hub](https://github.com/Ayushi-Choudhary22/cynbit-smart-project-hub)

---

## 📌 Executive Summary

This project delivers a complete, production-grade full-stack web application built inside this repository. It recreates the public-facing brand identity, visual architecture, and information hierarchy of **Cynbit Technologies** ([https://www.cynbit.in/](https://www.cynbit.in/)) while solving a critical user experience gap: **transforming ambiguous client project inquiries into structured, production-ready architectural blueprints using adaptive discovery and AI.**

### Disclaimer
> **Notice:** This project is an independent technical assessment prototype developed for recruitment evaluation. It is not affiliated with, operated by, or deployed to the production infrastructure of Cynbit Technologies.

---

## 🌟 Key Features

### 1. High-Fidelity Brand Recreation
- **Official Brand Design System**: Tailored colors reflecting Cynbit's palette:
  - Primary Deep Teal (`#006067`)
  - Accent Sky Blue (`#0284c7`)
  - Cyan Highlights (`#0d9488`)
  - Deep Onyx Dark Theme (`#0a0f14` & `#101820`)
- **Typography**: Google Fonts typography hierarchy using **Outfit** (headings) and **Inter** (technical body/UI).
- **Core Public Pages**:
  - ` / ` — **Homepage**: Cinematic hero with interactive architectural hub graphic, 6-stage delivery lifecycle, partner marquee, core product suites, testimonials, and FAQ.
  - `/services` — **Services Hub**: Enterprise suites (AI Automation, Full Stack Development, Cloud & DevOps) with interactive tech stack matrix.
  - `/story` — **Our Story**: Verified company timeline (2021: Preparatory Rigor → 2022: Validation → 2023: Roadmap → 2024: Official Launch) and architectural philosophy.
  - `/team` — **Leadership**: Profiles for founders **Mohak Saini** (Founder & CEO), **Ashutosh Upadhyay** (Co-Founder), and **Dhawan Nama** (Co-Founder & CTO).
  - `/products` — **Product Ecosystem**: Deep dives into **Cynbit Studio**, **TenantEase**, and **Revio** with interactive architecture modal.
  - `/bitelevate` — **Technical Learning**: Specialized cohort tracks for students, explicitly kept distinct from business client inquiry workflows.
  - `/careers` — **Careers & Internships**: Verified internship and full-time listings with dedicated application flow.
  - `/contact` — **Contact & Dispatch**: Jaipur HQ address (`32/115 Pratap Nagar, Jaipur, RJ 302033`), direct phone lines, email forms, and FAQ accordion.
- **Theme Switcher**: Working Dark / Light mode toggle with persistent state in `localStorage`.

---

### 2. Central Innovation: Cynbit AI Solution Studio (`/discovery`)
Transforms the traditional inquiry friction into a guided, 7-stage consulting and visualization experience:
**Understand Business → Generate Solution Blueprint → Visualize Solution → Customize Solution → Connect with an Engineer → Commercial Preferences → Confirmation**

- **Stage 1 — Business Discovery (Smart Solution Finder & Adaptive Profiler)**:
  - Captures real business context: company identity, target audience, business stage, operational friction, current bottlenecks, tools in use, and desired outcomes.
  - Interactive selection across 9 strategic project categories with immediate architectural alignment suggestions.
- **Stage 2 — AI Solution Blueprint Generation (Google Gemini 3.5 Flash Lite)**:
  - Generates a production-grade 10-point technical architectural blueprint powered by **Google Gemini 3.5 Flash Lite** (with `gemini-3.1-flash-lite` and deterministic zero-failure fallbacks).
  - Includes: Executive Solution Overview, Core Problem Framing, Target Personas, Functional Modules, Primary User Workflows, Tech Stack (Frontend, Backend, DB, Cloud, AI), 3rd-Party Integrations, Security & Auth, Scalability, Missing Information, and 4-Phase Delivery Milestones.
  - **Conversational Blueprint Refinement**: Allows clients to submit natural-language adjustment requests that immediately regenerate the blueprint while preserving confirmed context.
- **Stage 3 — Category-Tailored Solution Visualizer (Interactive UX Prototype)**:
  - Context-aware prototype engine detecting domain archetypes:
    - *Pet Care & Veterinary Platform* (Pet parent dashboard, electronic pet health record EHR, appointment scheduler with 15-minute intervals, services directory).
    - *E-Commerce & Storefront* (Curated catalog, faceted filter browse, PDP, customer order hub).
    - *AI Agent Automation Console* (Execution telemetry, visual node workflow graph, semantic vector RAG hub, audit trail).
    - *Healthcare & Clinical Desk* (Operations desk, patient EHR, doctor scheduler, telehealth triage).
    - *PropTech & Tenant Ecosystem* (Property hub, floorplans, digital rent ledger, maintenance tickets).
    - *SaaS Executive Dashboard* (KPI widgets, operations matrix, customer records, analytics).
    - *Native Mobile Application* (Touch feed, quick booking, biometric concept).
  - Desktop / Mobile responsive viewport toggle.
  - Transparently marked as an **AI-Assisted React-Rendered Concept Prototype** for assessment review.
- **Stage 4 — Live Solution Customization & Feedback**:
  - Live design palette switching (*Cynbit Teal, Midnight Onyx, Electric Indigo, Clean Minimal, Emerald Mint*).
  - One-click feature modifications (e.g. 15-minute appointment slots, emergency telehealth hotline, clinical store) that instantly re-render inside the visualizer.
  - Concept approval marking and client design feedback capture.
- **Stage 5 — Engineer Consultation Booking**:
  - Option A: Schedule a 1-on-1 technical discovery session with Cynbit engineering (Channel: Google Meet, Phone, In-person; preferred date, time slot, and discussion topics).
  - Option B: Fast-track submission directly to the commercial scope stage.
- **Stage 6 — Commercial Preferences (Budget & Timeline)**:
  - Captures realistic budget tiers (₹3L–₹5L, ₹5L–₹10L, ₹10L–₹25L, ₹25L+) and timeline horizons (Under 1 month, 1–3 months, 3–6 months, 6+ months).
  - Captures complete stakeholder contact details and explicit consent timestamp.
- **Stage 7 — Confirmation & Reference Tracking**:
  - Issues a verifiable reference ID (e.g., `CYN-2026-XXXXXX`) and persists the entire journey to MongoDB Atlas.

---

### 3. Supporting Feature: Protected Admin Inquiry Dashboard (`/admin/dashboard`)
- **JWT & Bcrypt Security**: Strict route protection via Authorization Bearer header.
- **Dedicated Admin Login (`/admin/login`)**: Secure credential verification with JWT token issuance, protected against brute-force and credential exposure.
- **Dual Lookup Engine**: Deep search and status inspection supported by both internal MongoDB `_id` and formatted reference ID (`CYN-2026-XXXXXX`).
- **Operational Metrics**:
  - Total Inquiries & Active Pipeline counts (New, Reviewing, Clarification Required, Qualified, Closed).
  - Engineering Consultation metrics (Total Requested, Pending, Confirmed).
- **Interactive Inquiries Table**:
  - Live search across Client Name, Work Email, Company, Reference ID, and Consultation status.
  - Multi-status and category dropdown filters.
- **Slide-Over Blueprint & Customer Journey Inspector**:
  - Displays original adaptive discovery answers, business context, and contact details.
  - Complete AI Blueprint with modules, tech architecture, and roadmap.
  - Visual concept configuration, theme choice, and requested feature customizations.
  - Consultation status manager (Pending → Confirmed → Completed) and internal staff notes logger.

---

## 🏗️ Architecture & Technology Stack

```mermaid
graph TD
  User((Client Visitor)) -->|Interacts| Client[React 18 + Vite + Tailwind CSS]
  Admin((Engineering Lead)) -->|Reviews| AdminUI[Admin Dashboard /admin/dashboard]

  subgraph Frontend [Client Layer - Port 5173]
    Client -->|Route /discovery| DiscoveryStudio[Cynbit AI Solution Studio]
    DiscoveryStudio -->|Stage 3 & 4| Visualizer[Interactive Solution Visualizer]
    Client -->|Public Pages| BrandPages[Home, Services, Story, Team, etc.]
    AdminUI -->|JWT Auth| AuthCtx[AuthContext]
  end

  subgraph Backend [Server Layer - Port 5000]
    API[Express.js REST API]
    AuthMdw[JWT + Role Middleware]
    RateLimit[Express Rate Limiter]
    ZodVal[Zod Validation Schemas]
    AISvc[aiBlueprintService]
    
    API --> RateLimit --> ZodVal
    AuthMdw --> AdminController[Admin Controller (Dual-Lookup)]
  end

  subgraph External & Database
    AISvc -->|Primary| GeminiAPI[Google Gemini 3.5 Flash Lite API]
    AISvc -->|Candidate Fallback| Gemini31[Google Gemini 3.1 Flash Lite API]
    AISvc -->|Offline Fallback| LocalRules[Deterministic Engine]
    API -->|Mongoose ODM| DB[(MongoDB Atlas / MongoMemoryServer)]
  end

  Client -->|REST API| API
  AdminUI -->|Bearer Token| API
```

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite 6, Tailwind CSS, React Router v6, Lucide React Icons |
| **Backend** | Node.js, Express.js (ES Modules), CORS, Helmet, Rate Limiter |
| **Database** | MongoDB Atlas with Mongoose ODM (Auto-fallback to `mongodb-memory-server` for zero-setup local runs) |
| **Security** | JWT (jsonwebtoken), Bcrypt.js password hashing, Zod request schema validation, Rate Limiting |
| **AI Integration** | Google Gemini 3.5 Flash Lite API with Gemini 3.1 Flash Lite and domain-tailored deterministic fallbacks |
| **DevOps** | Vercel (Client deployment ready), Render (Server deployment ready) |

---

## 🚀 Quick Start Guide (Local Setup)

The application has been engineered to run out of the box with zero external setup required. If MongoDB is not installed locally or no Atlas URI is provided, the backend automatically boots an in-memory MongoDB server and seeds initial demo inquiries and the admin user!

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Git**

---

### Step 1: Clone & Inspect Repository
```bash
git clone <repository-url>
cd Cynbit
```

---

### Step 2: Backend Setup
Open a terminal in the `server` directory:
```bash
cd server
npm install
```

Create a `.env` file from the provided example:
```bash
cp .env.example .env
```
*(The default `.env` will use the in-memory database and deterministic fallback if no external keys are added).*

Start the backend server:
```bash
npm run dev
# Or for standard execution:
node server.js
```
The server will start on **`http://localhost:5000`** and log:
```
ℹ️ Notice: No MONGODB_URI provided. Starting MongoMemoryServer for development...
✅ Connected to MongoMemoryServer successfully (in-memory mode for development).
ℹ️ Database Mode: In-Memory (MongoMemoryServer). Data resets on process termination.
ℹ️ Admin user seeded: admin@cynbit.in
ℹ️ Seeded 3 initial synthetic demo inquiries for testing.
🚀 Cynbit Server running on port 5000
```

---

### Step 3: Frontend Setup
In a new terminal window, navigate to the `client` directory:
```bash
cd client
npm install
npm run dev
```
Open **`http://localhost:3000`** in your browser.

---

## 🔐 Admin & Evaluator Authentication Setup

The **Admin Inquiry Dashboard** (`/admin/dashboard`) is strictly protected and requires a valid JWT Bearer token obtained via `/api/admin/login`.

To provision credentials safely without exposing passwords:

1. **Option A: Automatic One-Time Session Password (Zero-Config Development)**  
   When the server boots in development mode without an `ADMIN_PASSWORD` defined, it automatically generates a cryptographically secure random one-time session password and logs it directly to your terminal.

2. **Option B: Evaluator Demo Provisioning Script**  
   From the `server` directory, run:
   ```bash
   node scripts/createEvaluator.js
   ```
   This generates an on-demand reviewer account (`evaluator@cynbit.test`) with a random password printed strictly to stdout.

3. **Option C: Environment Variables (Recommended for local dev & production)**  
   Specify credentials in `server/.env`:
   ```bash
   ADMIN_EMAIL=your-admin@cynbit.in
   ADMIN_PASSWORD=YourStrongPasswordHere
   ```
   When the server boots, it provisions/updates the administrator account with `bcrypt` (10 rounds).

*Security Notice: Passwords are encrypted with bcrypt, never committed to git, excluded from JSON serialization via Mongoose `toJSON` transforms, and never returned in API payloads.*

---

## 🗄️ Database Architecture & Persistence Transparency

- **Development In-Memory Mode (`mongodb-memory-server`)**: If no `MONGODB_URI` is provided, the server initializes an embedded in-memory MongoDB instance so reviewers can test the application immediately with zero setup. **Note that in-memory storage resets when the server process stops.** In-memory mode is never represented as production persistence.
- **Production Persistence Mode (MongoDB Atlas / External MongoDB)**: Set `MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/cynbit` in `server/.env`. In production (`NODE_ENV=production`), the server enforces a real database connection and rejects startup if `MONGODB_URI` is missing.
- **Health Diagnostics (`GET /api/health`)**: Transparently reports whether the active database is an in-memory session or a production-persistent cluster.

---

## 📡 API Reference Documentation

### Public Endpoints

#### `GET /api/health`
Health check verifying server status, environment, and detailed database connectivity.
- **Response 200**:
  ```json
  {
    "success": true,
    "status": "healthy",
    "timestamp": "2026-10-31T05:55:00.000Z",
    "database": {
      "status": "Connected",
      "type": "MongoMemoryServer (In-Memory Development)",
      "isProductionPersistent": false,
      "isFallbackMode": true,
      "notice": "In-memory database is active for zero-config local evaluation. Data will reset on server restart. For persistent production storage, set MONGODB_URI in server/.env."
    },
    "environment": "development"
  }
  ```

#### `POST /api/discovery/blueprint`
Analyzes discovery answers and generates an architectural project blueprint.
- **Body**:
  ```json
  {
    "category": "ai-automation",
    "answers": {
      "businessProcess": "Invoice verification and matching",
      "currentSystem": "Manual entry in Excel",
      "toolsInUse": "Gmail, SAP, Google Drive",
      "goals": "Reduce turnaround time to 10 minutes"
    }
  }
  ```
- **Response 200**: Returns structured blueprint with overview, problem, solution, functional requirements, technical considerations, clarification questions, and next steps.

#### `POST /api/inquiries`
Validates and persists a client project inquiry and blueprint.
- **Body**:
  ```json
  {
    "clientName": "Dr. Siddharth Sen",
    "email": "siddharth@medixcare.com",
    "company": "MedixCare Health",
    "phone": "+91 99887 76655",
    "projectCategory": "Build a new website or web application",
    "discoveryAnswers": { ... },
    "generatedBlueprint": { ... },
    "consentGiven": true
  }
  ```
- **Response 201**: Returns unique reference ID (`CYN-2026-XXXXXX`) and inquiry record.

---

### Protected Admin Endpoints *(Requires `Authorization: Bearer <token>`)*

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/admin/login` | Authenticates admin credentials, returns JWT. |
| `GET` | `/api/admin/me` | Returns current admin profile. |
| `GET` | `/api/admin/stats` | Returns aggregate counts by status (New, Reviewing, etc.). |
| `GET` | `/api/admin/inquiries` | Returns paginated inquiries list with search and filter support. |
| `GET` | `/api/admin/inquiries/:id` | Returns full inquiry with adaptive answers and AI blueprint. |
| `PATCH` | `/api/admin/inquiries/:id/status` | Updates inquiry status (`New`, `Reviewing`, `Clarification Required`, `Qualified`, `Closed`). |
| `PATCH` | `/api/admin/inquiries/:id/notes` | Appends an internal timestamped note with author attribution. |

---

## ☁️ Deployment Guide

### Frontend Deployment (Vercel)
1. Push the latest code to your GitHub repository.
2. In [Vercel](https://vercel.com), click **Add New Project** and select your repository: `cynbit-smart-project-hub`.
3. Set **Root Directory** to `client` (Click *Edit* next to Root Directory and choose `client`).
4. Framework Preset: **Vite**.
5. Build Command: `npm run build` (Output Directory: `dist`).
6. A configured [client/vercel.json](file:///client/vercel.json) is included with SPA rewrites (`"source": "/(.*)", "destination": "/index.html"`) ensuring internal routes load cleanly on direct page refresh.
7. Configure Environment Variable in Vercel:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://cynbit-smart-project-hub.onrender.com`
   *(Note: The client application automatically appends the `/api` path and prevents duplicate `/api/api` paths, so entering either the base domain or the `/api` endpoint works seamlessly).*
   - **Security Notice**: Do **NOT** add any backend secrets (`MONGODB_URI`, `GEMINI_API_KEY`, `JWT_SECRET`, or passwords) to Vercel. Vite bundles client variables into public JavaScript assets.
8. Click **Deploy**!

### Backend Deployment (Render / Railway)
1. A ready-to-use Render Blueprint is provided in `server/render.yaml`.
2. Alternatively, in Render, create a new **Web Service** pointing to the repository.
3. Set **Root Directory** to `server`.
4. Build Command: `npm install`
5. Start Command: `node server.js`
6. Configure Environment Variables in Render:
   - `PORT`: `5000`
   - `NODE_ENV`: `production`
   - `MONGODB_URI`: Your MongoDB Atlas connection string (`mongodb+srv://...`)
   - `JWT_SECRET`: A strong random 32+ character string
   - `GEMINI_API_KEY`: *(Optional)* Your Google Gemini API key
   - `CORS_ORIGIN`: Your Vercel frontend URL
7. Deploy!

---

## 🛡️ Security & Privacy Practices

- **Zero Hardcoded Secrets**: All API keys, database URIs, and JWT secrets are managed strictly through environment variables.
- **Git Hygiene**: Strict `.gitignore` prevents `node_modules`, `.env`, and build artifacts from ever being committed.
- **Input Sanitization & Validation**: Robust Zod schemas validate both incoming discovery data and inquiry contact submissions.
- **Password Hashing**: Admin credentials stored in database are hashed with `bcryptjs` using a salt work factor of 10.
- **Prototype Transparency**: Clear disclaimers on every page ensure visitors and stakeholders recognize this application as an independent assessment prototype.

---

## 📄 License & Attribution

- Built as an independent Full Stack Developer Intern technical assessment.
- Original brand identity, company history, and service names belong to **Cynbit Technologies** ([https://www.cynbit.in/](https://www.cynbit.in/)).
- Developed with architectural rigor and care.
