# 🚀 TaskFlow – Mini Project Management System

A full-stack **Project Management System** built using **React, Express.js, MongoDB, and JWT Authentication**. Users can securely manage projects and tasks through an intuitive and responsive dashboard.

---

## 🌐 Live Demo

**🚀 Live Website:**
https://taskflow-project-lovat.vercel.app/

---

## 📌 Features

### 🔐 Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Secure Logout

### 📁 Project Management

* Create Project
* View Projects
* Update Project
* Delete Project

### ✅ Task Management

* Create Task
* View Tasks
* Update Task
* Delete Task
* Assign Tasks to Projects

### 📊 Dashboard

* Total Projects
* Total Tasks
* Completed Tasks
* Pending Tasks
* Welcome Section
* Current Date

### 🔍 Search & Filters

* Search Tasks
* Filter by Status
* Filter by Priority
* Pagination

### 🎨 Modern UI

* Fully Responsive Design
* Loading Spinner
* Toast Notifications
* Interactive Dashboard
* Smooth Hover Effects

---

## 📸 Screenshots

### 🏠 Home Page

<img width="940" alt="Home" src="https://github.com/user-attachments/assets/4ff3a47d-1910-4a27-af6c-95e62d2d41c7" />

### 🔐 Login Page

<img width="940" alt="Login" src="https://github.com/user-attachments/assets/eac7ffa4-8916-415f-ac06-92b008d49294" />

### 📊 Dashboard

<img width="940" alt="Dashboard" src="https://github.com/user-attachments/assets/0a3465e4-1858-456a-a6a5-001ac6518d50" />

### 📁 Projects

<img width="940" alt="Projects" src="https://github.com/user-attachments/assets/3ea22c78-08ee-4633-899e-c46dfc99ff39" />

### ✅ Tasks

<img width="940" alt="Tasks" src="https://github.com/user-attachments/assets/97f74742-91eb-4830-bdcd-93f810e9df72" />

### ➕ Create Task

<img width="940" alt="Create Task" src="https://github.com/user-attachments/assets/f3620a7b-7076-462a-a361-f304f6340295" />

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router DOM
* Tailwind CSS
* Axios
* React Icons
* React Hot Toast

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcryptjs

---

## 📂 Folder Structure

```text
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

Create a `.env` file inside the `backend` folder.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
```

---

## 📡 API Endpoints

### Authentication

* `POST /api/auth/register`
* `POST /api/auth/login`
* `GET /api/auth/me`

### Projects

* `GET /api/projects`
* `POST /api/projects`
* `PUT /api/projects/:id`
* `DELETE /api/projects/:id`

### Tasks

* `GET /api/tasks`
* `POST /api/tasks`
* `PUT /api/tasks/:id`
* `DELETE /api/tasks/:id`

---

## 👨‍💻 Author

**Gaurav Kaushik**

**GitHub:**
https://github.com/gaurav908408

**Live Demo:**
https://taskflow-project-lovat.vercel.app/

**LinkedIn:**
*Add your LinkedIn profile link here.*

---

## ⭐ Support

If you like this project, please consider giving it a **⭐ Star** on GitHub. It really helps and motivates me to build more awesome projects!
