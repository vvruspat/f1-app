# 🧱 Infrastructure

The F1 App is deployed on AWS using a robust and scalable architecture. Below is a detailed breakdown of the infrastructure components.

---

## Monorepo
- **Managed with Turborepo:** Ensures efficient builds and task execution across multiple apps and packages.
- **Apps:**
  - **Frontend:** Next.js app for user-facing features.
  - **Backend:** NestJS API for business logic and data processing.
- **Packages:**
  - **UI Kit:** Shared React components for consistent design.
  - **Types:** Shared TypeScript types for API and UI.

---

## AWS Architecture

![Architecture Diagram](../images/architecture-diagram.png)

### **Route 53**
- Acts as the DNS service for the application.
- Routes traffic to the public-facing load balancer.

### **Load Balancer**
- Distributes incoming traffic to the frontend ECS service.
- Ensures high availability and scalability.

### **VPC (Virtual Private Cloud)**
- Isolates resources into public and private subnets for security and performance.

#### **Public Subnets**
- **Frontend ECS Service:**
  - Hosts the Next.js frontend application.
  - Includes caching for optimized performance.
  - Handles server-side rendering (SSR) and static content delivery.

#### **Private Subnets**
- **Backend ECS Service:**
  - Hosts the NestJS backend application.
  - Processes API requests and interacts with databases.
  - Includes a validator for request validation.

- **MemoryDB (Redis) cluster:**
- **DocumentDB (MongoDB) cluster:**
---

## Databases

### **MemoryDB (Redis)**
- **Purpose:** Caching layer for aggregated and calculated data to improve performance.
- **Security:** Protected by a dedicated security group.

### **DocumentDB (MongoDB)**
- **Purpose:** Stores application data, such as F1 seasons, races, and results.
- **Security:** Protected by a dedicated security group.

---

## Gateway
- Providing outbound access for backend service from private subnet.

---

## Monitoring and Logging

### **CloudWatch**
- Used for infrastructure monitoring, logging, and alerting.
- Tracks application performance and logs errors.

### **Sentry**
- **Frontend Sentry:** Monitors and logs errors in the frontend application.
- **Backend Sentry:** Monitors and logs errors in the backend application.

---

## Static Hosting
- **Next.js:** Optimized for both server-side rendering (SSR) and static pages.
- **Caching:** Improves performance for frequently accessed pages.

---

## Backup
- **Database Backup:** Regular backups of the DocumentDB cluster to ensure data durability and recovery in case of failure.

---

This infrastructure ensures a secure, scalable, and high-performance deployment for the F1 App.
