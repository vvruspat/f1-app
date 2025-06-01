# 📊 API Contract

## Endpoints
- `/seasons` – List all seasons with champions
- `/seasons/:year` – List races for a given year

## Request/Response Samples
```http
GET /seasons
200 OK
[
  { "year": "2024", "champion": "Max Verstappen" },
  ...
]
```

## Errors
- 500 – Internal error
- 404 – Season not found
