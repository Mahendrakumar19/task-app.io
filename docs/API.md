# API Documentation

## Base URL
```
http://localhost:5000
```

## Authentication
Most endpoints require authentication using JWT tokens. Include the access token in the Authorization header:
```
Authorization: Bearer <access_token>
```

---

## Authentication Endpoints

### Register User
Create a new user account.

**Endpoint:** `POST /api/auth/register`

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "fullName": "John Doe" // Optional
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "username": "johndoe",
      "email": "john@example.com",
      "fullName": "John Doe"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Validation:**
- Username: 3-30 characters, alphanumeric and underscore only
- Email: Valid email format
- Password: Minimum 6 characters

---

### Login
Authenticate existing user.

**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "emailOrUsername": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "username": "johndoe",
      "email": "john@example.com",
      "fullName": "John Doe"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Note:** Refresh token is set as HTTP-only cookie

---

### Logout
Logout current user and invalidate refresh token.

**Endpoint:** `POST /api/auth/logout`

**Headers:** `Authorization: Bearer <access_token>`

**Response (200):**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

### Refresh Token
Get a new access token using refresh token.

**Endpoint:** `POST /api/auth/refresh`

**Note:** Requires refresh token cookie

**Response (200):**
```json
{
  "success": true,
  "message": "Token refreshed successfully",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### Get Profile
Get current user profile.

**Endpoint:** `GET /api/auth/profile`

**Headers:** `Authorization: Bearer <access_token>`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "username": "johndoe",
      "email": "john@example.com",
      "fullName": "John Doe",
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-01T00:00:00.000Z"
    }
  }
}
```

---

### Update Profile
Update current user profile.

**Endpoint:** `PUT /api/auth/profile`

**Headers:** `Authorization: Bearer <access_token>`

**Request Body:**
```json
{
  "username": "johndoe2", // Optional
  "fullName": "John Doe Jr." // Optional
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "username": "johndoe2",
      "email": "john@example.com",
      "fullName": "John Doe Jr."
    }
  }
}
```

---

## Task Endpoints

### Get All Tasks
Get all tasks for authenticated user with optional filters.

**Endpoint:** `GET /api/tasks`

**Headers:** `Authorization: Bearer <access_token>`

**Query Parameters:**
- `status` (optional): Filter by status (`pending`, `in-progress`, `completed`)
- `priority` (optional): Filter by priority (`low`, `medium`, `high`)
- `search` (optional): Search in title and description
- `sortBy` (optional): Sort field (`createdAt`, `updatedAt`, `title`, `dueDate`, `priority`)
- `order` (optional): Sort order (`asc`, `desc`)

**Example:**
```
GET /api/tasks?status=pending&priority=high&search=project&sortBy=dueDate&order=asc
```

**Response (200):**
```json
{
  "success": true,
  "count": 2,
  "data": {
    "tasks": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "title": "Complete project",
        "description": "Finish the frontend developer assignment",
        "status": "in-progress",
        "priority": "high",
        "dueDate": "2025-12-01T00:00:00.000Z",
        "user": "507f1f77bcf86cd799439010",
        "createdAt": "2025-01-01T00:00:00.000Z",
        "updatedAt": "2025-01-02T00:00:00.000Z"
      }
    ]
  }
}
```

---

### Get Single Task
Get a specific task by ID.

**Endpoint:** `GET /api/tasks/:id`

**Headers:** `Authorization: Bearer <access_token>`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "task": {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Complete project",
      "description": "Finish the frontend developer assignment",
      "status": "in-progress",
      "priority": "high",
      "dueDate": "2025-12-01T00:00:00.000Z",
      "user": "507f1f77bcf86cd799439010",
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-02T00:00:00.000Z"
    }
  }
}
```

---

### Create Task
Create a new task.

**Endpoint:** `POST /api/tasks`

**Headers:** `Authorization: Bearer <access_token>`

**Request Body:**
```json
{
  "title": "Complete project",
  "description": "Finish the frontend developer assignment",
  "status": "pending", // Optional: pending, in-progress, completed
  "priority": "high", // Optional: low, medium, high
  "dueDate": "2025-12-01" // Optional: ISO 8601 date
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "task": {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Complete project",
      "description": "Finish the frontend developer assignment",
      "status": "pending",
      "priority": "high",
      "dueDate": "2025-12-01T00:00:00.000Z",
      "user": "507f1f77bcf86cd799439010",
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-01T00:00:00.000Z"
    }
  }
}
```

**Validation:**
- Title: Required, max 100 characters
- Description: Optional, max 500 characters
- Status: Must be one of: pending, in-progress, completed
- Priority: Must be one of: low, medium, high

---

### Update Task
Update an existing task.

**Endpoint:** `PUT /api/tasks/:id`

**Headers:** `Authorization: Bearer <access_token>`

**Request Body:** (All fields optional)
```json
{
  "title": "Updated task title",
  "description": "Updated description",
  "status": "completed",
  "priority": "medium",
  "dueDate": "2025-12-15"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": {
    "task": {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Updated task title",
      "description": "Updated description",
      "status": "completed",
      "priority": "medium",
      "dueDate": "2025-12-15T00:00:00.000Z",
      "user": "507f1f77bcf86cd799439010",
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-03T00:00:00.000Z"
    }
  }
}
```

---

### Delete Task
Delete a task.

**Endpoint:** `DELETE /api/tasks/:id`

**Headers:** `Authorization: Bearer <access_token>`

**Response (200):**
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

---

### Get Task Statistics
Get task statistics for current user.

**Endpoint:** `GET /api/tasks/stats`

**Headers:** `Authorization: Bearer <access_token>`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "stats": {
      "total": 10,
      "pending": 3,
      "in-progress": 4,
      "completed": 3
    }
  }
}
```

---

## Error Responses

### Validation Error (400)
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please enter a valid email"
    }
  ]
}
```

### Unauthorized (401)
```json
{
  "success": false,
  "message": "Invalid or expired token"
}
```

### Not Found (404)
```json
{
  "success": false,
  "message": "Task not found"
}
```

### Server Error (500)
```json
{
  "success": false,
  "message": "Internal Server Error"
}
```

---

## Rate Limiting
Currently no rate limiting is implemented, but it's recommended for production.

## CORS
CORS is configured to accept requests from the frontend URL specified in environment variables.
