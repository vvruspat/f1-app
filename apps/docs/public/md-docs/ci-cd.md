# 🚀 CI/CD Pipeline

## Overview
The CI/CD (Continuous Integration/Continuous Deployment) pipeline for the F1 App is fully automated using **GitHub Actions**. This ensures that every change is automatically built, tested, and deployed, maintaining code quality and enabling rapid iteration.

## Triggers
The pipeline is triggered by:
- **Pushes** to the `main` and `staging` branches.
- **Pull Requests** targeting the `main` or `staging` branches.

## Pipeline Stages

The pipeline consists of several sequential stages, each designed to validate the code and prepare it for deployment:

1.  **Checkout Code:**
    *   The first step in any workflow, it checks out the repository's code so the job can access it.

2.  **Setup Environment:**
    *   Sets up the necessary environment, including Node.js, and caches dependencies to speed up subsequent runs.

3.  **Install Dependencies:**
    *   Installs all project dependencies using `npm install` This is crucial for all subsequent steps.

4.  **Linting:**
    *   **Tool:** Biome (as per `package.json`).
    *   **Purpose:** Enforces code style and catches syntax errors early. The command `biome lint --write .` is typically run.
    *   **Failure:** If linting errors are found (and not auto-fixable), the pipeline fails.

5.  **Testing:**
    *   **Framework:** Jest (as per `package.json`).
    *   **Purpose:** Runs unit tests, integration tests, and potentially end-to-end tests to ensure code correctness and prevent regressions. Commands like `npm test` or `npm run test:cov` are executed.
    *   **Failure:** If any test fails, the pipeline stops.

6.  **Security Scan (Snyk):**
    *   **Tool:** Snyk.
    *   **Purpose:** Scans dependencies for known vulnerabilities and checks code for security issues.
    *   **Integration:** Uses `SENTRY_AUTH_TOKEN` for Sentry integration (if applicable to Snyk setup, though Snyk usually has its own `SNYK_TOKEN`).
    *   **Failure:** If critical vulnerabilities are found, the pipeline fails, preventing insecure code from being deployed.

- - following stages runs only in main branch

7.  **Build Application(s):**
    *   **Purpose:** Compiles the frontend (Next.js) and backend (NestJS) applications into production-ready artifacts, running `npm run build` for each application.
    *   **Sentry Sourcemaps:** For the backend, this stage also includes injecting and uploading sourcemaps to Sentry (`npm run sentry:sourcemaps`) to aid in debugging production errors.

8.  **Build Docker Images:**
    *   **Purpose:** Creates Docker images for the frontend and backend applications using their respective `Dockerfile`s. This packages the applications and their dependencies into portable containers.
    *   **Images:** `builder-base` image builds both artifact for frontend and backend, then the other two images just use this artifacts

9.  **Push Docker Images to ECR (Amazon Elastic Container Registry):**
    *   **Purpose:** Stores the built Docker images in a private and secure AWS ECR repository.
    *   **Authentication:** Requires AWS credentials and login to ECR.
    *   **Repos:** For this project there are 4 image repos, for frontend, backend docs and base images


10. **Deploy to AWS ECS (Amazon Elastic Container Service):**
    *   **Purpose:** Deploys the new Docker images from ECR to the appropriate ECS services (e.g., frontend, backend).
    *   **Strategy:** Uses a deployment strategy (e.g., blue/green, rolling update) to update the services with minimal downtime.

## Security in CI/CD
-   **Snyk:** Integrated directly into the pipeline to perform automated security scanning for vulnerabilities in dependencies and code.
-   **Secret Management:** Sensitive information like `SENTRY_AUTH_TOKEN`, AWS credentials, and other API keys are managed as encrypted secrets in GitHub Actions.
-   **Pipeline Halts on Failure:** Any failure in linting, testing, security scans, or build steps will halt the pipeline, preventing problematic code from reaching production.

## Notifications
-   **Email:** Notifications are sent via email to alert stakeholders when the pipeline fails.

---

This detailed CI/CD process ensures a high level of automation, quality control, and security for the F1 App.
