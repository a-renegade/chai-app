# Chai Shop

A full-stack chai shop discovery app with user authentication, shop listings, reviews, and map-based shop location features.

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, Zustand, Axios, React Router, Leaflet/Google Maps
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, cookies

## Project Structure

```text
chai/
  backend/    Express API, MongoDB models, routes, and controllers
  frontend/   React/Vite client application
```

## Getting Started

### Backend

```bash
cd backend
npm install
npm start
```

Create a `backend/.env` file before starting the API:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your_jwt_secret
ADMIN_ID=admin@example.com
ADMIN_PASSWORD=admin_password
```

The API runs from:

```text
http://localhost:5000/chaiShop/api
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Optional `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000
```

The frontend usually runs at:

```text
http://localhost:5173
```

## API Routes

- `POST /chaiShop/api/auth/signin`
- `POST /chaiShop/api/auth/profile`
- `GET /chaiShop/api/auth/check`
- `POST /chaiShop/api/auth/logout`
- `POST /chaiShop/api/shop`
- `GET /chaiShop/api/shop`
- `GET /chaiShop/api/shop/:id`
- `POST /chaiShop/api/review`
- `GET /chaiShop/api/review/:shopId`
- `PUT /chaiShop/api/review`

## Scripts

Backend:

```bash
npm start
```

Frontend:

```bash
npm run dev
npm run build
npm run lint
npm run preview
```
