# 📝 Daily Task Management Server

This is a **Daily Task Management** server-side application that allows users to **add tasks, view tasks, filter tasks by status**, and manage their **profile and authentication securely**.

## 🚀 Features

- 🔒 **User Authentication**: Secure login and registration system.
- ✅ **Task Management**: Users can create, view, update, and delete tasks.
- 🔍 **Task Filtering**: Filter tasks based on status (e.g., pending, completed).
- 👤 **User Profile Management**: View and update user profile information.
- 🛡️ **Secure API**: Protected routes with authentication.
- 📦 **Prisma ORM**: Database management using Prisma.
- 🏗 **Scalable Codebase**: Built with TypeScript for maintainability.

## 🛠️ Tech Stack

- **Node.js** + **Express.js** - Backend framework
- **TypeScript** - Strongly typed JavaScript
- **Prisma ORM** - Database management
- **PostgreSQL** - Database
- **JWT Authentication** - Secure authentication
- **Zod** - Request validation

## 🏗 Installation & Setup

### 1️⃣ Clone the repository

```sh
git clone https://github.com/Pervej0/daily-task
cd daily-task
```

## Start Project

```sh
npm install
DATABASE_URL="your_postgresql_connection_url"
JWT_SECRET="your_secret_key"
npx prisma migrate dev --name init
npm run dev
npm run build
```

## 🔥 API Endpoints

### Authentication

- **POST** `/api/auth/register` - Register a new user
- **POST** `/api/auth/login` - Log in user

### Tasks

- **POST** `/api/tasks` - Create a new task
- **GET** `/api/tasks` - Get all tasks (filter by status)
- **GET** `/api/tasks/:id` - Get a specific task
- **PUT** `/api/tasks/:id` - Update a task
- **DELETE** `/api/tasks/:id` - Delete a task

### User Profile

- **GET** `/api/user/profile` - Get user profile
- **PUT** `/api/user/profile` - Update user profile
