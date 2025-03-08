# Flask Site Evaluator Service

A Flask-based microservice for evaluating website performance, accessibility, SEO, and best practices.

## Features

- Evaluates websites based on URL input
- Stores evaluation results in MongoDB
- Provides API endpoints for retrieving past evaluations
- Can be used with or without user authentication

## Getting Started

### Prerequisites

- Python 3.9+
- MongoDB database

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Create a `.env` file with your configuration (see `.env.example`)

4. Run the application:
   ```bash
   python app.py
   ```

The service will be available at `http://localhost:5000`.

## API Endpoints

### Evaluate a website

```
POST /api/evaluate
```

Request body:
```json
{
  "url": "https://example.com",
  "userId": "optional-user-id"
}
```

### Get evaluations

```
GET /api/evaluations
```

Query parameters:
- `userId` (optional): Filter evaluations by user ID

### Get a specific evaluation

```
GET /api/evaluations/:id
```

## Docker Support

Build the Docker image:
```bash
docker build -t site-evaluator-flask .
```

Run the container:
```bash
docker run -p 5000:5000 --env-file .env site-evaluator-flask
```
