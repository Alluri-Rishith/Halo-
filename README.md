# SwasthyaVault

India-first medical report explainer + secure health vault + family/caregiver management + doctor read-only access.

## Quickstart

```bash
cp .env.example .env
npm install
npm run dev
```

### What starts and where to open

- Frontend (Next.js): http://localhost:3000
- Backend API (Express): http://localhost:4000/health

### WSL (Windows Subsystem for Linux)

```bash
sudo apt update
sudo apt install -y postgresql-client docker.io docker-compose-plugin
cp .env.example .env
npm install
npm run dev
```

If Docker is managed by Docker Desktop on Windows, ensure the Docker Desktop integration for your WSL distro is enabled, then run:

```bash
docker compose -f infra/docker-compose.yml up -d
psql "$DATABASE_URL" -f infra/migrations.sql
```

### Docker (local in under 10 minutes)

```bash
docker compose -f infra/docker-compose.yml up -d
psql "$DATABASE_URL" -f infra/migrations.sql
```

### Step-by-step (super clear)

1. **Copy env file**
   ```bash
   cp .env.example .env
   ```
2. **Start local services (Postgres + MinIO)**
   ```bash
   docker compose -f infra/docker-compose.yml up -d
   ```
3. **Create database tables**
   ```bash
   psql "$DATABASE_URL" -f infra/migrations.sql
   ```
4. **Install dependencies**
   ```bash
   npm install
   ```
5. **Run frontend + backend**
   ```bash
   npm run dev
   ```
6. **Open the app**
   - Frontend: http://localhost:3000
   - Backend health check: http://localhost:4000/health

### Troubleshooting (quick fixes)

- **`psql: command not found`** → install client:
  ```bash
  sudo apt install -y postgresql-client
  ```
- **Docker not running** → start Docker Desktop (Windows/macOS) or Docker daemon (Linux).
- **Port already in use** → stop the other process or change `PORT` in `.env`.

### Demo mode

Set `DEMO_MODE=true` and `OTP_MODE=mock` to return OTP in the API response.

## Core Flows

- OTP login
- Create profile & medical ID
- Add family members
- Upload reports -> OCR -> AI explanation
- Emergency card
- Doctor access code (6 digits, expires)

## Screenshots

- Dashboard: (add screenshot here)
- Upload: (add screenshot here)
- Doctor portal: (add screenshot here)

## Security Highlights

- Envelope encryption for sensitive fields
- Signed URLs for report downloads
- RBAC + audit logs
- Rate limiting and input validation

## Disclaimer

SwasthyaVault does not provide medical diagnosis. Always consult a qualified doctor.
