# Formula 1 World Champions App

- Full documentation: [https://f1app-docs.whitesquirrel.digital/](https://f1app-docs.whitesquirrel.digital/)
- Production: [https://f1app.whitesquirrel.digital/](https://f1app.whitesquirrel.digital/)

## Overview

### Project Purpose
A full-stack web application displaying Formula 1 World Champions from 2005 to the present, demonstrating complete front-end, back-end, DevOps, and testing skills.

### Technology Stack Summary
- **Frontend:** React, Next.js, TypeScript, Custom UI Kit, Storybook, RTL
- **Backend:** NestJS, TypeScript, Redis, MongoDB
- **Infrastructure:** Docker Compose, GitHub Actions, AWS ECS/ECR
- **CI/CD & QA:** Snyk, Biome, GitHub Actions, Multi-stage Dockerfiles

## Running the App Locally

### Prerequisites

- Docker + Docker Compose
- MongoDB
- Redis
- Node.js

### Developing with Docker

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

npm run docker:dev runs all the containers including MongoDB & Redis


### Developing without Docker

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

### Access

- Frontend: [http://localhost:3000](http://localhost:3000)
- Docs: [http://localhost:3001](http://localhost:3001)
- Backend: [http://localhost:3002](http://localhost:3002)
- Swagger: [http://localhost:3002/api](http://localhost:3002/api)
- UIKit Storybook: [http://localhost:6006](http://localhost:6006)
