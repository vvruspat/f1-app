# 🧪 Backend

## Framework
- Nest.js with modular architecture

## Features
- RESTful API serving frontend only
- Integration with Ergast API
- Redis caching
- MongoDB with indexes and constraints

## Architecture
- Layered: Controller → Service → Repository
- Async job (cron or on boot) to refresh data weekly

## Testing
- Jest for unit & integration tests
- Mocking external API calls
