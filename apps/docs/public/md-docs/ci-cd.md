# 🚀 CI/CD Pipeline

## Overview
Implemented via GitHub Actions with full automation.

## Pipeline Stages
1. Install dependencies
2. Lint (Biome)
3. Run unit/integration tests
4. Security scan (Snyk)
5. Build Docker images
6. Push to ECR
7. Deploy to AWS ECS

## Security
- Snyk used for dependency vulnerability checks
- Pipeline halts on scan/test failure
