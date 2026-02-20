# KodBank Application

A secure banking application with JWT authentication, built with Node.js, Express, and MySQL (Aiven).

## Features

- User registration with automatic ₹100,000 initial balance
- Secure login with JWT token authentication
- Token storage in database and cookies
- Balance checking with animated celebration
- Role-based access (customer, manager, admin)

## Database Schema

### KodUser Table
- uid (VARCHAR, PRIMARY KEY)
- username (VARCHAR, UNIQUE)
- email (VARCHAR, UNIQUE)
- password (VARCHAR, hashed)
- phone (VARCHAR)
- role (ENUM: customer, manager, admin)
- balance (DECIMAL)
- created_at (TIMESTAMP)

### UserToken Table
- tid (INT, AUTO_INCREMENT, PRIMARY KEY)
- token (TEXT)
- uid (VARCHAR, FOREIGN KEY)
- expiry (DATETIME)
- created_at (TIMESTAMP)

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Configure Aiven MySQL database:
   - Create a MySQL database on Aiven
   - Copy `.env.example` to `.env`
   - Update `.env` with your Aiven credentials

3. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

4. Access the application:
   - Registration: http://localhost:3000
   - Login: http://localhost:3000/login
   - Dashboard: http://localhost:3000/dashboard

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user

### User Operations
- GET `/api/user/balance` - Check balance (requires JWT token)

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- HTTP-only cookies
- Token expiry (24 hours)
- Database token storage
- SSL connection to Aiven MySQL

## Technology Stack

- Backend: Node.js, Express
- Database: MySQL (Aiven)
- Authentication: JWT, bcryptjs
- Frontend: Vanilla JavaScript, HTML, CSS
