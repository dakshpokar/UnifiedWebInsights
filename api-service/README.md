# API Service

A NestJS-based API service with JWT token-based authentication.

## Description

This service provides:

- User management (CRUD operations)
- Authentication with JWT tokens
- TypeORM integration with PostgreSQL

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_NAME=your_database

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION_TIME=3600

# Server
PORT=3000
```

## API Endpoints

### Authentication

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and get JWT token
- `GET /auth/profile` - Get current user profile (protected)

### Users

- `GET /users` - Get all users (protected)
- `GET /users/:id` - Get user by ID (protected)
- `POST /users` - Create a new user
- `PATCH /users/:id` - Update a user (protected)
- `DELETE /users/:id` - Delete a user (protected)
