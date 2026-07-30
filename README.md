# 🚀 TaskFlow – Mini Project Management System

A full-stack Project Management System built using React, Express.js, MongoDB, and JWT Authentication. Users can securely manage projects and tasks through an intuitive dashboard.

---

## 📌 Features

### 🔐 Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Logout

### 📁 Project Management
- Create Project
- View Projects
- Update Project
- Delete Project

### ✅ Task Management
- Create Task
- View Tasks
- Update Task
- Delete Task
- Assign Task to Project

### 📊 Dashboard
- Total Projects
- Total Tasks
- Completed Tasks
- Pending Tasks
- Welcome Section
- Current Date

### 🔍 Search & Filters
- Search Tasks
- Filter by Status
- Filter by Priority
- Pagination

### 🎨 UI
- Responsive Design
- Loading Spinner
- Toast Notifications
- Modern Dashboard
- Hover Effects

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Tailwind CSS
- Axios
- React Icons
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

---

## 📂 Folder Structure

```
TaskFlow/
│
├── frontend/
├── backend/
├── README.md
└── .gitignore
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone <your-repository-url>
```

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file inside the backend folder.

Example:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
```

---

## 📡 API Endpoints

### Auth

- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me

### Projects

- GET /api/projects
- POST /api/projects
- PUT /api/projects/:id
- DELETE /api/projects/:id

### Tasks

- GET /api/tasks
- POST /api/tasks
- PUT /api/tasks/:id
- DELETE /api/tasks/:id

---

## 👨‍💻 Author

**Gaurav Kaushik**

GitHub:
https://github.com/gaurav908408

LinkedIn:


---

## ⭐ If you like this project, give it a Star.