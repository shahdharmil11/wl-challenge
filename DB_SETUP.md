# Database Setup with Docker

## 🐳 PostgreSQL Setup using Docker Compose

### Prerequisites
- Docker and Docker Compose installed on your system

### Quick Start

1. **Start PostgreSQL Database:**
```bash
docker-compose up -d
```

2. **Verify Database is Running:**
```bash
docker-compose ps
```

3. **Start Backend Server:**
```bash
cd backend
npm run dev
```

4. **Check Connection:**
Visit http://localhost:3001/api/health - you should see database status as "Connected"

## 🛠️ Database Management Commands

### Basic Operations
```bash
# Start database (detached mode)
docker-compose up -d

# Stop database
docker-compose down

# View database logs
docker-compose logs postgres

# Follow logs in real-time
docker-compose logs -f postgres
```

### Database Access
```bash
# Access PostgreSQL shell
docker-compose exec postgres psql -U postgres -d wl_challenge

# Run SQL commands from outside container
docker-compose exec postgres psql -U postgres -d wl_challenge -c "SELECT version();"
```

### Data Management
```bash
# Stop and remove containers (data persists in volume)
docker-compose down

# Remove containers AND data volume (⚠️ DATA LOSS)
docker-compose down -v
```

## 📊 Database Configuration

**Connection Details:**
- Host: `localhost`
- Port: `5433` (mapped from container's 5432)
- Database: `wl_challenge`
- Username: `postgres`
- Password: `password`

**Environment Variables (already configured in `.env`):**
```
DB_HOST=localhost
DB_PORT=5433
DB_NAME=wl_challenge
DB_USER=postgres
DB_PASSWORD=password
```

## ✅ Expected Output

When starting your backend server, you should see:
```
✅ Database connection established successfully
✅ Database synchronized successfully
🚀 Backend server running at http://localhost:3001
🗄️ Database connected and synchronized
```

## 🔧 Troubleshooting

**If connection fails:**
1. Ensure Docker is running
2. Check if database container is up: `docker-compose ps`
3. Check database logs: `docker-compose logs postgres`
4. Verify port 5432 is not in use by another service