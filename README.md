# TaskFlow – MERN Todo Application

A full-stack task management application built using the MERN stack. TaskFlow allows users to register, log in, and manage their personal tasks with priority levels and completion tracking.

## Features

- User registration and login
- JWT-based authentication
- Password hashing with bcrypt
- Create, read, update, and delete tasks
- User-specific task management
- Task priority levels: Low, Medium, High
- Mark tasks as completed or pending
- Search tasks by title or description
- Filter tasks by status
- Responsive dashboard for mobile and desktop
- Protected API routes
- Backend security with Helmet and rate limiting

## Tech Stack

**Frontend**
- React
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Lucide React

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Helmet
- Express Rate Limit

## Project Structure

```text
mern-todo-app/
├── client/
│   └── src/
│       ├── components/
│       ├── context/
│       ├── pages/
│       └── services/
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   └── routes/
│
├── .gitignore
└── README.md
```

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/sanjaymalviyaaa8/mern-todo-app.git
cd mern-todo-app
```

### 2. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/mern_todo
JWT_SECRET=your_secure_jwt_secret
```

Make sure MongoDB is installed and running.

Start the backend:

```bash
npm run dev
```

Backend runs at `http://localhost:5000`.

### 3. Setup Frontend

Open another terminal:

```bash
cd client
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`.

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user |

### Tasks

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/todos` | Get user's tasks |
| POST | `/api/todos` | Create task |
| PUT | `/api/todos/:id` | Update task |
| DELETE | `/api/todos/:id` | Delete task |

Task endpoints require a valid JWT token.

## Security

- Passwords are hashed before storage.
- JWT authentication protects task routes.
- Users can only access their own tasks.
- Helmet adds security-related HTTP headers.
- Rate limiting protects authentication endpoints.
- Environment variables are excluded from Git.

## Future Improvements

- Task due dates and reminders
- Dashboard analytics
- Password reset functionality
- Deployment with MongoDB Atlas
- Improved task management features

## Author

**Sanjay Malviya**

- Portfolio: https://sanjaymalviya.vercel.app/
- GitHub: https://github.com/sanjaymalviyaaa8
- LinkedIn: https://linkedin.com/in/sanjaymalviya/
