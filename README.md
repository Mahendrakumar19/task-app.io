# Scalable Web App with Authentication & Dashboard

A modern full-stack web application built with Next.js, Express.js, MongoDB, and JWT authentication.

## 🚀 Features

### Frontend
- **Next.js 14** with App Router
- **TailwindCSS** for responsive design
- **Protected Routes** with JWT authentication
- **Form Validation** (client + server side)
- **Dashboard** with CRUD operations
- **Search & Filter** functionality

### Backend
- **Express.js** REST API
- **MongoDB** database with Mongoose
- **JWT Authentication** with refresh tokens
- **Password Hashing** with bcrypt
- **Input Validation** with express-validator
- **Error Handling** middleware

### Security Features
- ✅ Password hashing with bcrypt
- ✅ JWT token-based authentication
- ✅ HTTP-only cookies for refresh tokens
- ✅ Input validation and sanitization
- ✅ Protected API routes
- ✅ CORS configuration

## 📦 Project Structure

```
assessment/
├── frontend/          # Next.js application
│   ├── src/
│   │   ├── app/      # App router pages
│   │   ├── components/
│   │   ├── lib/      # Utilities
│   │   └── context/  # React context
│   └── public/
├── backend/           # Express.js API
│   ├── src/
│   │   ├── models/   # Mongoose models
│   │   ├── routes/   # API routes
│   │   ├── middleware/ # Auth & validation
│   │   ├── controllers/
│   │   └── config/   # Configuration
│   └── server.js
└── docs/             # Documentation & Postman
```

## 🛠️ Tech Stack

### Frontend
- Next.js 14
- React 18
- TailwindCSS
- Axios
- React Hook Form
- Zod (validation)

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcrypt
- express-validator

## 🚦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

#### 1. Clone the repository
```bash
git clone <repository-url>
cd assessment
```

#### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file
cp .env.example .env
# Edit .env with your MongoDB URI and secrets

# Start backend
npm run dev
```

Backend runs on: `http://localhost:5000`

#### 3. Frontend Setup
```bash
cd frontend
npm install

# Create .env.local file
cp .env.example .env.local

# Start frontend
npm run dev
```

Frontend runs on: `http://localhost:3000`

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/profile` - Get user profile

### Tasks (CRUD)
- `GET /api/tasks` - Get all tasks (with search/filter)
- `POST /api/tasks` - Create new task
- `GET /api/tasks/:id` - Get task by ID
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## 🔐 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskapp
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_refresh_secret_key
JWT_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## 📱 Features Demo

### 1. User Authentication
- Register with email, username, password
- Login with email/username
- JWT tokens with refresh mechanism
- Protected routes

### 2. Dashboard
- View user profile
- CRUD operations on tasks
- Search tasks by title/description
- Filter by status (pending, in-progress, completed)
- Responsive design for all devices

### 3. Task Management
- Create tasks with title, description, status, priority
- Edit existing tasks
- Delete tasks
- Mark tasks as complete
- Filter and search

## 🧪 Testing

### Using Postman
Import the Postman collection from `docs/postman_collection.json`

### Manual Testing
1. Register a new user
2. Login with credentials
3. Access dashboard (protected route)
4. Create, read, update, delete tasks
5. Test search and filter functionality
6. Logout and verify session cleared

## 📈 Scalability Considerations

### Frontend
1. **Code Splitting**: Next.js automatic code splitting
2. **State Management**: Context API (can scale to Redux/Zustand)
3. **Component Library**: Modular components for reusability
4. **Image Optimization**: Next.js Image component
5. **Caching**: React Query for data fetching (future)
6. **CDN**: Static assets on CDN in production

### Backend
1. **Database Indexing**: Indexed fields for faster queries
2. **Connection Pooling**: MongoDB connection pooling
3. **Rate Limiting**: Express rate limiter (can be added)
4. **Caching Layer**: Redis for sessions/caching (future)
5. **Microservices**: Modular structure allows service separation
6. **Load Balancing**: PM2 cluster mode or Nginx
7. **Horizontal Scaling**: Stateless JWT authentication

### Production Deployment
- **Frontend**: Vercel, Netlify, AWS Amplify
- **Backend**: AWS EC2, DigitalOcean, Railway, Render
- **Database**: MongoDB Atlas (managed)
- **CDN**: CloudFlare, AWS CloudFront
- **CI/CD**: GitHub Actions
- **Monitoring**: Sentry, LogRocket, Datadog

## 🔒 Security Best Practices

1. **Password Security**: bcrypt with salt rounds
2. **JWT Storage**: Access token in memory, refresh in HTTP-only cookie
3. **Input Validation**: Server-side validation on all inputs
4. **SQL Injection Prevention**: Mongoose ODM with parameterized queries
5. **XSS Prevention**: React's built-in XSS protection
6. **CORS**: Configured for specific origin
7. **Environment Variables**: Secrets in .env files
8. **Error Handling**: No sensitive data in error messages

## 📚 Documentation

- API Documentation: `docs/API.md`
- Postman Collection: `docs/postman_collection.json`
- Scalability Notes: `docs/SCALABILITY.md`

## 👨‍💻 Author

**Mahendra Kumar**  
