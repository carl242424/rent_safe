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

Backend `.env`:

```bash
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/rentsafe
JWT_SECRET=replace_with_secure_secret
CLIENT_URL=http://localhost:3000
NODE_ENV=development
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

### Vercel Configuration (Frontend)

- Import the frontend folder into Vercel.
- Set the environment variable:
  - `PUBLIC_API_URL=https://your-render-backend-url`
- Build command: `npm run build`
- Output directory: `.vercel/output`

### Render Configuration (Backend)

- Import the backend folder into Render.
- Set environment variables:
  - `PORT=5000`
  - `MONGODB_URI=your_mongodb_atlas_uri`
  - `JWT_SECRET=your_secure_secret`
  - `CLIENT_URL=https://your-frontend-url`
  - `NODE_ENV=production`
- Start command: `node src/server.js`

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
