# RentSafe MVP

RentSafe is a car rental management system with a single admin role, JWT auth, and a mobile-friendly dashboard. The project is split between a Node/Express API and an Astro frontend.

## Project Structure

- `frontend/` — Astro frontend
- `backend/` — Express API and MongoDB models

## Installation

1. Open two terminals.
2. In the backend folder, install dependencies:
   ```bash
   cd backend
   npm install
   ```
3. In the frontend folder, install dependencies:
   ```bash
   cd frontend
   npm install
   ```

## MongoDB Setup

- Create a MongoDB Atlas cluster or run local MongoDB.
- Set `MONGODB_URI` in backend `.env` to your database connection string.
- For local testing, the API falls back to a local MongoDB instance at `mongodb://127.0.0.1:27017/rentsafe`.

## Environment Variables

Backend `.env` (local development):

```bash
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/rentsafe
JWT_SECRET=replace_with_secure_secret
FRONTEND_URL=http://localhost:3000
ADMIN_USERNAME=admin
ADMIN_EMAIL=admin@rentsafe.com
ADMIN_PASSWORD=replace_with_a_strong_password
```

Frontend `.env`:

```bash
PUBLIC_API_URL=http://localhost:5000
```

## Admin Account Setup

On first backend startup, the API creates a default admin account if one does not already exist.

Default admin:

- username: `admin`
- email: `admin@rentsafe.com`
- password: `admin123`

You can change the seeded credentials by hitting the seed endpoint or by updating the environment process. The default seeded admin is intended for local MVP testing only.

## Running Frontend

```bash
cd frontend
npm run dev
```

Frontend runs on:

- http://localhost:3000

## Running Backend

```bash
cd backend
npm run dev
```

Backend runs on:

- http://localhost:5000

## Production Deployment

### Render Deployment

The repository includes `render.yaml` for two Render Web Services. The frontend uses Astro SSR (`output: 'server'`), so it is deployed as a Node Web Service rather than a Static Site.

Frontend service (`rentsafe-frontend`):

- Root directory: `frontend`
- Build command: `npm install && npm run build`
- Start command: `npm start`
- Environment variable: `PUBLIC_API_URL=https://rentsafe-backend.onrender.com`

Backend service (`rentsafe-backend`):

- Root directory: `backend`
- Build command: `npm install`
- Start command: `npm start`
- Health check: `/api/health`
- Environment variables: `NODE_ENV=production`, `MONGODB_URI`, `JWT_SECRET`, `FRONTEND_URL`, `ADMIN_USERNAME`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD`

Do not commit `.env` files. Enter the real values in Render's service Environment settings. Render provides `PORT` automatically; the backend listens on `process.env.PORT`.

MongoDB Atlas setup:

1. Create an Atlas cluster and a least-privilege database user.
2. Add the Render outbound network access required by your Atlas plan, or use Atlas's temporary `0.0.0.0/0` rule only when appropriate for your deployment security policy.
3. Copy the Atlas connection string into the backend Render service's `MONGODB_URI` variable. Never add it to frontend variables.

After both services are created, set the exact generated URLs in `FRONTEND_URL` and `PUBLIC_API_URL`, then redeploy both services.

## MVP Workflow

1. Login as admin
2. Add cars
3. Add renters
4. Check blacklist matches
5. Create rental
6. Record Cash/GCash payment
7. Complete rental
8. Car becomes available again and rental remains in history

## Notes

- The backend validates rental duration, applicable rate, and total amount before saving.
- Frontend totals are informational only; the backend is authoritative.
- Passwords are never exposed, and JWT tokens are stored in secure HTTP-only cookies.
