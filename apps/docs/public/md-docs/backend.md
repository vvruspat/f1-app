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
- On app run data from ergast service is syncronized

## Endpoints
Full information about endpoint can be found on swagger page locally
Swagger: [http://localhost:3002/api](http://localhost:3002/api)

- `/` - Health check endpoint, just return "OK"
- `/seasons` – List all seasons with champions
- `/seasons/:year` – List races for a given year with rounds winners and global winner

## Testing
- Jest for unit & integration tests
- Mocking external API calls

