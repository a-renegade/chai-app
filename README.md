# Chai Shop

A full-stack community-driven platform for discovering and sharing great tea shops.

## Live Demo

🌐 **Frontend:** https://chai-app-sigma.vercel.app

🔗 **Backend API:** https://chai-app-i9mh.onrender.com/chaishop/api

---


## About the Project

Chai Shop is a community platform where anyone can help discover and promote local tea shops. Many small tea stalls serve amazing tea but remain unknown because they have little or no online presence. This platform allows users to share these hidden gems with others.

The project has two main goals:

* Help chai lovers discover authentic and underrated tea shops.
* Support small local tea vendors by increasing their visibility and bringing them more customers.

For example, an elderly tea seller running a small roadside stall may serve excellent tea, but very few people know about the shop. Any community member can upload the shop's details and location so that others can easily find and visit it.

Users can add a new tea shop by selecting its location on the map and submitting the shop details. Every submission is reviewed by an administrator before it is approved and made visible to everyone, ensuring that the information on the platform remains accurate.

The long-term vision is to automate the shop verification process as much as possible so that the platform can eventually become largely community-driven with minimal manual moderation. This has the potential to grow into a scalable startup that benefits both tea enthusiasts and local businesses.

## Features

* User authentication
* Browse tea shops with detailed information
* Interactive map-based shop locations
* Add new tea shops by selecting a location on the map
* Admin approval workflow for new shop submissions
* Shop reviews and ratings
* Community-driven discovery of hidden local tea shops


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
