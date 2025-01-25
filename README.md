# Task Management Application Documentation

## Overview

A full-stack task management application built with React, TypeScript, and Node.js. The application allows users to create, manage, and track tasks with features like priority levels, due dates, and status tracking.

## Tech Stack

### Frontend
- React 18.3
- TypeScript
- Vite
- TailwindCSS
- Lucide React (icons)
- React Router DOM
- React Hot Toast (notifications)
- Axios (API client)
- date-fns (date manipulation)

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs (password hashing)
- CORS

## Project Structure

```
├── server/
│   ├── models/          # Database models
│   │   ├── Task.js      # Task schema
│   │   └── User.js      # User schema
│   ├── routes/          # API routes
│   │   ├── auth.js      # Authentication routes
│   │   └── tasks.js     # Task management routes
│   ├── middleware/      # Custom middleware
│   │   └── auth.js      # JWT authentication middleware
│   └── index.js         # Server entry point
├── src/
│   ├── components/      # React components
│   ├── lib/            # Utility functions and API client
│   ├── types/          # TypeScript type definitions
│   └── main.tsx        # Application entry point
```

## Features

### Authentication
- User registration with email and password
- Secure password hashing with bcrypt
- JWT-based authentication
- Protected routes and API endpoints

### Task Management
- Create, read, update, and delete tasks
- Task properties:
  - Title
  - Description
  - Status (todo, in_progress, completed)
  - Priority (low, medium, high)
  - Due date
- Filter tasks by status
- Visual indicators for task priority
- Due date warnings for approaching deadlines

### User Interface
- Responsive design with Tailwind CSS
- Clean and intuitive task layout
- Loading states and error handling
- Toast notifications for user feedback
- Icon-based actions for better UX

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - User login

### Tasks
- GET `/api/tasks` - Get all tasks for authenticated user
- POST `/api/tasks` - Create new task
- PUT `/api/tasks/:id` - Update existing task
- DELETE `/api/tasks/:id` - Delete task

## Database Schema

### User Model
```typescript
{
  email: string;      // Required, unique
  password: string;   // Required, hashed
  createdAt: Date;    // Automatic timestamp
}
```

### Task Model
```typescript
{
  userId: ObjectId;   // Reference to User
  title: string;      // Required
  description: string;
  status: enum;       // todo, in_progress, completed
  priority: enum;     // low, medium, high
  dueDate: Date;      // Required
  createdAt: Date;    // Automatic timestamp
}
```

## Security Features

1. Password Security
   - Passwords are hashed using bcrypt
   - Minimum password length enforcement
   - Secure password comparison

2. Authentication
   - JWT-based authentication
   - Token expiration
   - Protected routes with middleware

3. Data Access
   - Users can only access their own tasks
   - API endpoints protected with authentication
   - Input validation and sanitization

## Environment Variables

```env
MONGODB_URI=mongodb+srv://[username]:[password]@[cluster]
JWT_SECRET=[your-secret-key]
PORT=5000
```

## Component Documentation

### AuthForm
- Handles user registration and login
- Form validation
- Error handling and user feedback
- Toggles between login and registration modes

### Dashboard
- Main application interface
- Task filtering and management
- Loading and error states
- Logout functionality

### TaskForm
- Create and edit tasks
- Form validation
- Date picker for due dates
- Priority and status selection

### TaskList
- Displays tasks in a clean layout
- Priority color coding
- Due date warnings
- Edit and delete actions

## Error Handling

1. Client-side
   - Form validation
   - API error handling
   - Loading states
   - User feedback via toast notifications

2. Server-side
   - Express error middleware
   - MongoDB error handling
   - JWT verification errors
   - Input validation errors

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Start the backend server:
   ```bash
   npm run server
   ```

## Best Practices

1. Code Organization
   - Component-based architecture
   - Separation of concerns
   - TypeScript for type safety
   - Consistent file structure

2. Performance
   - Optimized React components
   - Efficient database queries
   - Proper indexing
   - Error boundary implementation

3. Security
   - JWT authentication
   - Password hashing
   - Protected routes
   - Input validation

4. User Experience
   - Responsive design
   - Loading states
   - Error feedback
   - Intuitive interface