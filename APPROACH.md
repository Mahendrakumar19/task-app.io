# Development Approach & Technical Decisions

## Overview

This document explains the technical decisions I made while building this project and what I learned along the way. I believe understanding the "why" behind code choices is as important as the "how."

## Architecture Decisions

### 1. Frontend Framework: Next.js

**Why Next.js over Create React App?**

I chose Next.js for several practical reasons:
- Built-in routing system that's simpler than React Router
- Automatic code splitting means faster page loads
- The App Router gives us a clear file structure
- SEO benefits if we want to add a public landing page later
- Easy deployment on Vercel

**Trade-off**: Next.js has a steeper learning curve, but the benefits outweigh the initial complexity.

### 2. State Management: Context API

**Why Context API instead of Redux?**

For this project's scope, Context API made more sense:
- Simpler setup, less boilerplate
- Perfect for auth state (user info, tokens, login status)
- We're not managing complex state trees
- Easier for others to understand and modify

**When I'd use Redux**: If we had multiple data sources, complex state updates, or needed time-travel debugging.

### 3. Database: MongoDB

**Why MongoDB?**

- Flexible schema - task properties can evolve easily
- JSON-like documents match JavaScript objects naturally
- Mongoose provides nice validation and middleware hooks
- Quick to set up for prototyping

**Consideration**: For this use case, PostgreSQL would work equally well. I'd choose Postgres if we needed complex joins or strict data integrity.

### 4. Authentication: JWT with Refresh Tokens

**Why this approach?**

I implemented a dual-token system:
- **Access Token (15 min)**: Short-lived for security
- **Refresh Token (7 days)**: Long-lived for user convenience

**The Challenge**: 
Getting the token refresh logic right was tricky. I had to handle:
1. Detecting when access token expires (401 response)
2. Calling refresh endpoint to get new token
3. Retrying the original request with new token
4. Avoiding infinite loops if refresh also fails

**Solution**: I created an axios interceptor that queues failed requests and retries them after refresh.

```javascript
// The key insight: only refresh once, even if multiple requests fail
let isRefreshing = false;
let failedQueue = [];
```

This pattern ensures we don't spam the refresh endpoint.

## Code Organization

### Backend Structure (MVC Pattern)

```
backend/
├── models/         # Database schemas
├── controllers/    # Business logic
├── routes/         # Endpoint definitions
├── middleware/     # Reusable functions (auth, validation)
└── config/         # Configuration
```

**Why MVC?**
- Clear separation of concerns
- Easy to test each layer independently
- New developers can find code quickly
- Scales well as project grows

### Frontend Structure

```
frontend/src/
├── app/           # Pages (Next.js App Router)
├── components/    # Reusable UI components
├── context/       # Global state
└── lib/          # Utilities (axios config, helpers)
```

**Key Decision**: I kept components small and focused. Each component does one thing well.

## Security Considerations

### 1. Password Security

**What I implemented:**
- bcrypt hashing with 10 salt rounds
- Never return password in API responses (using `select: false`)
- Password validation (min 6 characters, but could be stricter)

**What I'd improve:**
- Enforce stronger password requirements (uppercase, numbers, symbols)
- Add password strength meter on frontend
- Implement password history (prevent reuse)

### 2. Token Security

**Current approach:**
- Access tokens in localStorage (easy to access, XSS risk)
- Refresh tokens in HTTP-only cookies (safer from XSS)

**Trade-off**: 
I know storing tokens in localStorage has XSS risks. In a production app, I'd consider:
- Moving access tokens to memory only
- Using HTTP-only cookies for both tokens
- Implementing CSRF protection

### 3. Input Validation

**Two-layer validation:**
1. **Client-side**: Immediate feedback, better UX
2. **Server-side**: Security (never trust the client)

Example: Email validation happens in the registration form AND in the backend route.

## Performance Optimizations

### Database Indexing

I added indexes early:
```javascript
// User model
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });

// Task model
taskSchema.index({ user: 1, status: 1 });
taskSchema.index({ user: 1, createdAt: -1 });
```

**Why**: These indexes speed up common queries:
- Login by email/username
- Fetch user's tasks filtered by status
- Get recent tasks

**Learning**: I learned that indexes have a cost (write performance, storage). Don't index everything, only frequently queried fields.

### Frontend Performance

**What I did:**
- TailwindCSS purges unused styles in production
- Next.js automatically code-splits pages
- Axios interceptor prevents redundant refresh calls

**What I'd add with more time:**
- React Query for caching API responses
- Debounced search input
- Virtualized list for many tasks
- Lazy loading for modal components

## Challenges & Solutions

### Challenge 1: CORS Issues

**Problem**: Frontend couldn't call backend during development.

**Solution**: 
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
```

Learning: Always enable credentials for cookie-based auth.

### Challenge 2: Token Refresh Timing

**Problem**: How to refresh token before it expires vs after?

**Decision**: Refresh on 401 error, not proactively.

**Why**: 
- Simpler implementation
- Avoids clock sync issues
- 15-minute tokens are acceptable latency

**Alternative**: I considered refreshing at 80% expiry, but added complexity wasn't worth it for this project.

### Challenge 3: Protected Routes in Next.js

**Problem**: How to prevent authenticated users from seeing login page?

**Solution**: Created a ProtectedRoute wrapper that:
1. Checks auth state from Context
2. Redirects to /dashboard if logged in (for auth pages)
3. Redirects to /login if not logged in (for protected pages)
4. Shows loading state while checking

**Code pattern:**
```javascript
if (loading) return <div>Loading...</div>;
if (!isAuthenticated && requiresAuth) router.push('/login');
```

## Testing Strategy (Not Implemented Yet)

If I had more time, here's how I'd test:

### Backend Tests
- **Unit tests**: Test each controller function
- **Integration tests**: Test API endpoints end-to-end
- **Tools**: Jest + Supertest

### Frontend Tests
- **Component tests**: Test UI components in isolation
- **Integration tests**: Test user flows (login, create task)
- **Tools**: Jest + React Testing Library

### Example test I'd write first:
```javascript
describe('Login Flow', () => {
  it('should redirect to dashboard after successful login', async () => {
    // Test implementation
  });
});
```

## Scalability Thoughts

### Current Limitations

1. **Single server**: Can't handle high traffic
2. **No caching**: Every request hits the database
3. **Synchronous processing**: Blocks on slow operations

### How to Scale (detailed in SCALABILITY.md)

**Phase 1: Vertical Scaling**
- Upgrade server resources
- Add Redis for session/data caching
- Implement connection pooling

**Phase 2: Horizontal Scaling**
- Multiple backend instances behind load balancer
- Stateless design enables this (JWT helps!)
- MongoDB replica set for read scaling

**Phase 3: Microservices**
- Separate auth service
- Separate task service
- API gateway for routing

## What I Learned

### Technical Skills
- Token refresh patterns in practice
- Database indexing strategies
- Next.js App Router (new to me!)
- Proper error handling in async/await

### Soft Skills
- Breaking down requirements into tasks
- Prioritizing features (MVP first)
- Documenting decisions (this file!)
- Managing time constraints

## Time Breakdown

Roughly how I spent the 3 days:

**Day 1** (6 hours):
- Project setup
- Backend models and auth
- Basic frontend pages

**Day 2** (7 hours):
- Task CRUD implementation
- Dashboard UI
- Bug fixes and testing

**Day 3** (5 hours):
- Refinement and polish
- Documentation
- Deployment preparation

**Total**: ~18 hours of focused work

## If I Started Over

Things I'd do differently:

1. **Plan database schema first**: I refactored task model twice
2. **Set up testing early**: Would have caught bugs faster
3. **Use TypeScript**: Would prevent type-related bugs
4. **Implement error boundaries**: Better error UX on frontend
5. **Add loading states sooner**: Improved perceived performance

## Conclusion

This project taught me that building a "simple" auth system isn't simple. There are many edge cases, security considerations, and user experience details to think through.

I'm proud of the result, but I also see many areas for improvement. That's the sign of growth - always seeing the next level.

Thanks for reviewing my work!

---

*Mahendra Kumar*
*December 2025*
