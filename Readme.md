# 📚 Note Vault

A full-stack note taking web application built using the MERN stack. Note Vault provides a simple, distraction-free workspace for creating, managing, updating and organizing personal notes with secure user authentication.

The interface is inspired by the atmosphere of a well-organized library and traditional notebooks while maintaining a modern web experience.

---

## Features

### Authentication

- User registration
- Secure login
- JWT authentication
- HttpOnly authentication cookies
- Logout
- View profile
- Update profile
- Delete account

### Notes

- Create notes
- View all notes
- View individual note
- Edit existing notes
- Delete notes
- Automatic ownership validation
- Notes sorted by latest update

### User Experience

- Responsive Bootstrap interface
- Toast notifications
- Loading indicators
- Clean notebook-inspired design
- Library-themed landing page
- Protected routes through backend authentication

---

# Tech Stack

## Frontend

- React
- React Router DOM
- Bootstrap 5
- Axios
- Zustand
- Vite

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Cookie Parser
- CORS
- dotenv

---

# Project Structure

```
** Need to be updated **
NoteVault
│
├── backend
│   ├── middleware
│   ├── routes
│   ├── service
│   ├── database
│   │   └── mongo
│   │       ├── controller
│   │       ├── models
│   │       └── Mongo.js
│   ├── server.js
│   └── serverConfig.js
│
├── frontend
│   ├── src
│   │   ├── apiService
│   │   ├── components
│   │   ├── pages
│   │   ├── utils
│   │   └── App.jsx
│   └── vite.config.js
│
└── README.md
```

---

# Architecture

```
React
   │
Axios API
   │
Express Routes
   │
Authentication Middleware
   │
Service Layer
   │
Repository Layer
   │
MongoDB (Mongoose)
```

The backend follows a layered architecture:

- Routes handle HTTP requests.
- Middleware validates authentication.
- Services implement business logic.
- Repository layer communicates with MongoDB.
- Models define the database schema.

---

# Database Schema

## User

| Field | Type |
|--------|------|
| id | ObjectId |
| name | String |
| email | String (Unique) |
| password | Hashed String |
| createdAt | Date |
| updatedAt | Date |

---

## Note

| Field | Type |
|--------|------|
| id | ObjectId |
| user_id | ObjectId |
| title | String |
| content | String |
| createdAt | Date |
| updatedAt | Date |

---

# REST API

## Authentication

### Register

```
POST /auth/register
```

Body

```json
{
    "name": "John",
    "email": "john@example.com",
    "password": "password"
}
```

---

### Login

```
POST /auth/login
```

Body

```json
{
    "email": "john@example.com",
    "password": "password"
}
```

Returns a JWT stored inside an HttpOnly cookie.

---

### Logout

```
GET /auth/logout
```

---

### Profile

```
GET /auth/profile
```

---

### Update Profile

```
PUT /auth/update-profile
```

---

### Delete Profile

```
DELETE /auth/delete-profile
```

Deleting a profile also removes all notes belonging to that user.

---

# Notes API

## Create Note

```
POST /note
```

Body

```json
{
    "title": "My Note",
    "content": "Hello World"
}
```

---

## Get All Notes

```
GET /note
```

---

## Get Note

```
GET /note/:id
```

---

## Update Note

```
PUT /note/:id
```

---

## Delete Note

```
DELETE /note/:id
```

---

# Authentication Flow

```
Register
      │
      ▼
Login
      │
      ▼
JWT Generated
      │
      ▼
Stored as HttpOnly Cookie
      │
      ▼
Authenticated Requests
      │
      ▼
JWT Middleware
      │
      ▼
Protected Routes
```

---

# Security

- Password hashing using bcrypt
- JWT based authentication
- HttpOnly cookies
- User ownership verification before updating/deleting notes
- CORS configuration
- Environment variables for sensitive configuration

---

# Environment Variables

## Backend (.env)

```env
EXPRESS_PORT=3000

MONGO_URL=your_mongodb_connection

JWT_SECRET=your_secret_secret_key

FRONTEND_URL=http://localhost:5173
```

## Frontend (.env)

```env
VITE_BACKEND_URL=http://localhost:3000
```

---

# Installation

## Clone

```bash
git clone https://github.com/Unknown56860/Note_Vault.git
```

---

## Backend

```bash
cd backend-express

npm install

node server.js
```

---

## Frontend

```bash
cd frontend-react

npm install

npm run dev
```

---

# Screenshots

## Home

(screenshot to be added)

---

## Login

(screenshot to be added)

---

## Notes

(screenshot to be added)

---

## Note Editor

(screenshot to be added)

---

## Profile

(screenshot to be added)

---

# Future Improvements

- Search notes
- Rich text editor
- Markdown support
- Categories
- Tags
- Favorites
- Archive
- Pin notes
- Dark mode
- Profile pictures
- Pagination
- Note sharing
- Export notes
- Autosave
- Rate limiting
- Unit testing
- Docker support

---

# License

This project is intended for educational and portfolio purposes.
