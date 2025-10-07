# WL Challenge - Setup Instructions

## Prerequisites

1. **Node.js** (v18 or higher)
2. **PostgreSQL** (v12 or higher)

## Database Setup

1. Install PostgreSQL if not already installed
2. Create database:
```sql
CREATE DATABASE wl_challenge;
CREATE USER postgres WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE wl_challenge TO postgres;
```

Or use environment variables to configure your database:
- `DB_HOST` (default: localhost)
- `DB_PORT` (default: 5432) 
- `DB_NAME` (default: wl_challenge)
- `DB_USER` (default: postgres)
- `DB_PASSWORD` (default: password)

## Quick Start

1. **Start Backend**:
```bash
cd backend
npm run dev
```

2. **Start Frontend** (in new terminal):
```bash
cd frontend  
npm run dev
```

3. **Open browser**: http://localhost:5173

## Features

- ✅ 10-question survey form
- ✅ Anonymous submissions (no registration required)
- ✅ User registration & login
- ✅ Session-based authentication
- ✅ View previous submissions (for registered users)
- ✅ Responsive design with Tailwind CSS

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user  
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Forms
- `POST /api/form/submit` - Submit survey form
- `GET /api/form/submissions` - Get user submissions (auth required)

### Health
- `GET /api/health` - Health check

## Tech Stack

**Backend:**
- Node.js + Express + TypeScript
- Sequelize ORM + PostgreSQL
- Session-based authentication
- bcrypt for password hashing

**Frontend:**  
- React + Vite + TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Context API for state management
- Axios for API calls
