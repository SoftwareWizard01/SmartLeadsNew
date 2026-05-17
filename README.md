# Smart Leads Dashboard 🚀

A production-grade, full-stack lead management system built to demonstrate scalable architecture, strict TypeScript usage, and robust role-based access control.

## 🛠 Tech Stack

**Frontend**
- React 18 + Vite
- TypeScript (Strict Mode)
- TailwindCSS (Glassmorphism & Custom Palette)
- React Query (TanStack Query v5) for server state
- Zustand for auth state
- React Hook Form + Zod for validation
- Axios with interceptors

**Backend**
- Node.js + Express
- TypeScript
- MongoDB + Mongoose
- JWT Authentication
- Zod for request validation
- Custom Error Handling Middleware

**DevOps**
- Docker & Docker Compose
- Nginx (Frontend static serving)

## ✨ Core Features

1. **Authentication & RBAC**: JWT-based auth with explicit `admin` and `sales` roles.
2. **Advanced Filtering**: Compound text index search, debounced inputs, and multi-field backend filtering.
3. **Pagination**: Efficient backend-driven pagination using Mongoose `skip`/`limit` and `Promise.all`.
4. **Data Export**: Server-side CSV generation using streams (Admin only).
5. **Modern UI**: Dark-mode glassmorphic dashboard with micro-animations and responsive design.

## 🚀 Getting Started

### Prerequisites
- Docker & Docker Compose
- Node.js v20+ (if running locally without Docker)

### Option 1: Run with Docker (Recommended)

1. Clone the repository and navigate to the root directory.
2. Copy the root environment file:
   ```bash
   cp .env.example .env
   ```
3. Start the stack:
   ```bash
   docker-compose up -d --build
   ```
4. Access the application:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:5000/api/v1/health](http://localhost:5000/api/v1/health)

### Option 2: Run Locally (Dev Mode)

1. **Start MongoDB**: Ensure you have a local MongoDB instance running on port 27017.
2. **Backend**:
   ```bash
   cd backend
   cp .env.example .env
   npm install
   npm run dev
   ```
3. **Frontend**:
   ```bash
   cd frontend
   cp .env.example .env
   npm install
   npm run dev
   ```
4. Access the app at [http://localhost:5173](http://localhost:5173).

## 🔑 Default Accounts (If you want to create them manually via UI)
- Admin: Select "Administrator" during registration. (Can delete, export, and edit all fields).
- Sales: Select "Sales User" during registration. (Can only edit status, cannot delete or export).

## 📚 API Reference

| Method | Endpoint | Description | Auth Required | Roles |
|--------|----------|-------------|---------------|-------|
| POST | `/api/v1/auth/register` | Register new user | No | All |
| POST | `/api/v1/auth/login` | Login user | No | All |
| GET | `/api/v1/auth/me` | Get current user | Yes | All |
| GET | `/api/v1/leads` | Get leads (filtered/paginated) | Yes | Admin, Sales |
| POST | `/api/v1/leads` | Create new lead | Yes | Admin, Sales |
| PUT | `/api/v1/leads/:id` | Update lead (Sales: status only) | Yes | Admin, Sales |
| DELETE | `/api/v1/leads/:id` | Delete lead | Yes | Admin |
| GET | `/api/v1/leads/export/csv` | Export leads to CSV | Yes | Admin |

## 🏗 Architecture Highlights

- **Backend Layers**: strict separation between Controller (HTTP), Service (Business Logic), and Repository (Data Access).
- **Frontend Layers**: strict separation between UI Components, Hooks (React Query), and API clients (Axios).
- **Error Handling**: Centralized `AppError` class catches operational errors, Zod errors, and unhandled exceptions globally.
- **Performance**: Debounced UI search prevents API spam; Mongoose `.lean()` minimizes memory overhead on reads.

---
*Developed as a Pre-Internship Engineering Assignment.*
