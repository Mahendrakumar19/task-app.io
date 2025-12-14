# Project Quick Reference

## 🌐 Live Demo

- **Frontend**: [https://task-app-io.vercel.app/](https://task-app-io.vercel.app/)
- **Backend API**: [https://task-app-io.onrender.com/](https://task-app-io.onrender.com/)
- **GitHub**: [https://github.com/Mahendrakumar19/task-app.io](https://github.com/Mahendrakumar19/task-app.io)

> **Try it now!** No installation needed. Backend may take 30-60 seconds to wake up on first request (free tier).

## 🚀 Quick Start Commands (Local Development)

```bash
# Start Backend (Terminal 1)
cd backend
npm install
npm run dev
# Runs on http://localhost:5000

# Start Frontend (Terminal 2)  
cd frontend
npm install
npm run dev
# Runs on http://localhost:3000
```

## 📋 Test User Flow

### Live Demo
1. **Register**: [https://task-app-io.vercel.app/register](https://task-app-io.vercel.app/register)
2. **Login**: [https://task-app-io.vercel.app/login](https://task-app-io.vercel.app/login)
3. **Dashboard**: [https://task-app-io.vercel.app/dashboard](https://task-app-io.vercel.app/dashboard)

### Local Development
1. **Register**: http://localhost:3000/register
   - Username: testuser
   - Email: test@example.com
   - Password: password123

2. **Login**: http://localhost:3000/login

3. **Dashboard**: http://localhost:3000/dashboard
   - Create tasks
   - Search tasks
   - Filter by status/priority

## 🔑 Key Features to Demo

### Authentication
- ✅ Register new account
- ✅ Login with credentials
- ✅ Auto-redirect to dashboard when logged in
- ✅ Protected routes (try accessing /dashboard without login)
- ✅ Logout functionality

### Task Management
- ✅ Create task with title, description, status, priority, due date
- ✅ View all tasks with live statistics
- ✅ Search tasks by title/description
- ✅ Filter by status (pending/in-progress/completed)
- ✅ Filter by priority (low/medium/high)
- ✅ Edit existing tasks
- ✅ Delete tasks

### Profile
- ✅ View user information
- ✅ Update profile (username, full name)

## 🗂️ Important Files

### Documentation
- `README.md` - Project overview
- `APPROACH.md` - Technical decisions & learnings
- `docs/API.md` - API documentation
- `docs/SCALABILITY.md` - Production scaling guide
- `docs/postman_collection.json` - API testing

### Backend Core
- `backend/server.js` - Main server
- `backend/src/models/User.js` - User model
- `backend/src/models/Task.js` - Task model
- `backend/src/controllers/auth.controller.js` - Auth logic
- `backend/src/controllers/task.controller.js` - Task CRUD
- `backend/src/middleware/auth.middleware.js` - JWT verification

### Frontend Core
- `frontend/src/app/page.js` - Landing page
- `frontend/src/app/login/page.js` - Login
- `frontend/src/app/register/page.js` - Register
- `frontend/src/app/dashboard/page.js` - Main dashboard
- `frontend/src/context/AuthContext.js` - Auth state
- `frontend/src/lib/api.js` - Axios config with interceptors

## 📡 API Endpoints

### Authentication
```
POST   /api/auth/register     - Create account
POST   /api/auth/login        - Login
POST   /api/auth/logout       - Logout
POST   /api/auth/refresh      - Refresh access token
GET    /api/auth/profile      - Get user profile
PUT    /api/auth/profile      - Update user profile
```

### Tasks
```
GET    /api/tasks             - Get all tasks (with filters)
GET    /api/tasks/:id         - Get single task
POST   /api/tasks             - Create task
PUT    /api/tasks/:id         - Update task
DELETE /api/tasks/:id         - Delete task
GET    /api/tasks/stats       - Get task statistics
```

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskapp
JWT_SECRET=your_secret_here
JWT_REFRESH_SECRET=your_refresh_secret_here
JWT_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## 🧪 Testing with Postman

1. Import `docs/postman_collection.json`
2. Set environment variable: `BASE_URL = http://localhost:5000`
3. Run requests in order:
   - Register user
   - Login (saves token automatically)
   - Use authenticated endpoints

## 🎯 Assignment Checklist

- ✅ Frontend with React/Next.js
- ✅ Responsive design (TailwindCSS)
- ✅ Form validation (client + server)
- ✅ Protected routes
- ✅ Backend (Node.js/Express)
- ✅ JWT authentication
- ✅ User signup/login/logout
- ✅ Profile management
- ✅ CRUD operations (Tasks)
- ✅ Database (MongoDB)
- ✅ Search & filter UI
- ✅ Password hashing (bcrypt)
- ✅ Error handling
- ✅ Scalable code structure
- ✅ GitHub repository
- ✅ Postman collection
- ✅ API documentation
- ✅ Scaling notes

## 💡 Unique Selling Points

What makes this submission stand out:

1. **Dual Token System** - Access + Refresh tokens for security + UX
2. **Real-time Statistics** - Dashboard shows task counts at a glance
3. **Smart Token Refresh** - Auto-refreshes expired tokens seamlessly
4. **Database Indexing** - Optimized queries from day one
5. **Comprehensive Docs** - Not just what, but why (APPROACH.md)
6. **Professional UI** - Loading states, error states, empty states
7. **Clean Code** - MVC pattern, reusable components
8. **Production Ready** - Security, validation, error handling

## 🐛 Troubleshooting

### MongoDB Connection Error
```bash
# Make sure MongoDB is running
mongod
```

### Port Already in Use
```bash
# Kill process on port 5000
npx kill-port 5000

# Kill process on port 3000  
npx kill-port 3000
```

### Module Not Found
```bash
# Reinstall dependencies
cd backend && rm -rf node_modules && npm install
cd frontend && rm -rf node_modules && npm install
```

### Token Not Working
- Clear browser localStorage
- Logout and login again
- Check if backend is running

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

Test on all sizes - the app is fully responsive!

## 🎨 Design Decisions

- **Color Scheme**: Blue primary (professional, trustworthy)
- **Typography**: System fonts (fast, familiar)
- **Spacing**: Consistent 4px grid
- **Animations**: Subtle transitions (professional feel)

## 📊 Code Stats

- **Total Files**: ~40 files
- **Lines of Code**: ~4,300 lines
- **Development Time**: ~18 hours over 3 days
- **Dependencies**: Minimal, only what's needed

## 🔗 Links

- **GitHub**: https://github.com/Mahendrakumar19/task-app.io
- **Live Demo**: (Add if deployed)
- **Developer**: Mahendra Kumar

---

**Last Updated**: December 2025
