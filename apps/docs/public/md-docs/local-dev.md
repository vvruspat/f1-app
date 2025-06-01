# 🐳 Running the App Locally

## Prerequisites

- Docker + Docker Compose
- MongoDB
- Redis
- Node.js

## Developing with Docker

- In `apps/backend/` rename `.env.example.docker` to `.env`
- In `apps/frontend/` rename `.env.example.docker` to `.env`
- Run:
```bash
git clone git@github.com:vvruspat/f1-app.git
cd f1-app
npm install
npm run docker:build
npm run docker:dev
```

`npm run docker:dev` starts all the containers including MongoDB & Redis

## Developing without Docker

- Install Mongo and Redis
- In `apps/backend/` rename `.env.example.local` to `.env`
- In `apps/frontend/` rename `.env.example.local` to `.env`
- Run:
```bash
git clone git@github.com:vvruspat/f1-app.git
cd f1-app
npm install
npm run dev
```

## Access

- Frontend: http://localhost:3000
- Docs: http://localhost:3000
- Backend: http://localhost:3002
- Swagger: http://localhost:3002/api
- UIKit Storybook: http://localhost:6006
