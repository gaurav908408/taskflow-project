# 🚀 TaskFlow – Full Stack Project Management System

> A modern and responsive **Project Management System** built with **React, Express.js, MongoDB, and JWT Authentication**. Manage projects, organize tasks, upload profile images, and track progress through a clean dashboard with **Dark & Light Mode** support.

---

## 🌐 Live Demo

🚀 **Live Website:** [https://taskflow-project-lovat.vercel.app/](https://taskflow-project-lovat.vercel.app/)

💻 **GitHub Repository:** [https://github.com/gaurav908408](https://github.com/gaurav908408)

---

## ✨ Features

### 🔐 Authentication
* User Registration & Login
* JWT Authentication & Protected Routes
* Secure Logout

### 👤 User Profile
* View Profile Details & Account Info
* Upload & Update Profile Picture (Multer Integration)

### 📁 Project Management
* Create, View, Edit & Delete Projects
* Project Overview & Description

### ✅ Task Management
* Create, View, Edit & Delete Tasks
* Assign Tasks to Specific Projects
* Drag & Drop Kanban Board Integration

### 📊 Dashboard
* Real-time Project & Task Counters (Total Projects, Total Tasks, Completed, Pending)
* Welcome Greeting Section & Live Date & Time Tracker

### 🔍 Search & Filters
* Real-time Task Search
* Filter by Status (*Todo, In Progress, Done*)
* Filter by Priority (*Low, Medium, High*)
* Page Pagination Support

### 🎨 Modern UI & Themes
* Dynamic **Dark Mode / Light Mode** Switch
* Fully Responsive Desktop & Mobile Layouts
* Loading Spinners & Toast Notifications
* Smooth Animations & Hover Effects

---

## 🛠 Tech Stack

### Frontend
* **Core:** React.js, React Router DOM, Context API
* **Styling:** Tailwind CSS, React Icons
* **HTTP & Notifications:** Axios, React Hot Toast

### Backend
* **Server Framework:** Node.js, Express.js
* **Database:** MongoDB, Mongoose ORM
* **Auth & Security:** JWT Authentication, bcryptjs
* **File Storage:** Multer

---

## 📸 Project Screenshots

### 🏠 Dashboard & Theme Modes
| 🌙 Dark Mode Dashboard | ☀️ Light Mode Theme |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/22d211f4-cfdc-4b51-b8c4-ff5a80d3416a" width="100%"/> | <img src="https://github.com/user-attachments/assets/11d9e202-ed96-475c-a5ca-bdabd4a3985d" width="100%"/> |

### 🔐 Authentication Pages
| 🔐 Login Page | 📝 Register Page |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/8a868083-c1f1-48bb-8afa-233aa3573723" width="100%"/> | <img src="https://github.com/user-attachments/assets/d9e8e163-dad7-4078-90d4-64d393a8bc74" width="100%"/> |

### 📁 Project Management
| 📁 All Projects | ➕ Create Project |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/4b5fea4e-a8f9-4d7c-8a36-a92a526cdee6" width="100%"/> | <img src="https://github.com/user-attachments/assets/5933401d-55d1-494d-a652-e2c3d2837827" width="100%"/> |

### ✅ Task Management
| ✅ Task Management | ➕ Create Task |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/43f6ee48-5210-4c49-93f7-769429053985" width="100%"/> | <img src="https://github.com/user-attachments/assets/f5d52aab-27e2-443d-b597-1eb4ce8faeb4" width="100%"/> |

### 👤 User Profile
| 👤 Profile View | ✏️ Profile Details |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/ae2c08f3-b1a5-42b1-a79b-031ddb3b1d74" width="100%"/> | <img src="https://github.com/user-attachments/assets/4cf19199-718b-4581-9a9e-415dd146f9a6" width="100%"/> |

---

## 📂 Folder Structure

```text
TaskFlow/
│
├── frontend/          # React.js Frontend Application
│   └── taskflow-frontend/
│       ├── src/
│       │   ├── components/
│       │   ├── context/
│       │   ├── pages/
│       │   └── services/
│       └── package.json
│
├── backend/           # Express.js REST API Server
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── README.md
└── .gitignore
```

---

## ⚙️ Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/gaurav908408/taskflow-project.git
cd taskflow-project
```

### 2. Backend Setup
```bash
cd backend
npm install
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend/taskflow-frontend
npm install
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
```

---

## 📡 API Endpoints

### 🔐 Authentication
* `POST /api/auth/register` - Register a new user
* `POST /api/auth/login` - User login
* `GET /api/auth/me` - Get current user profile

### 📁 Projects
* `GET /api/projects` - Get all user projects
* `POST /api/projects` - Create a new project
* `PUT /api/projects/:id` - Update project details
* `DELETE /api/projects/:id` - Delete a project

### ✅ Tasks
* `GET /api/tasks` - Get all tasks (with search, filter & pagination)
* `POST /api/tasks` - Create a new task
* `PUT /api/tasks/:id` - Update task details
* `DELETE /api/tasks/:id` - Delete a task

---

## 🚀 Future Improvements

* 👥 Team Collaboration & Member Assignments
* 💬 Task Comments & Discussion Threads
* 📎 File Attachments
* 📧 Email Notifications
* ⏰ Due Date Reminders

---

## 👨‍💻 Author

**Gaurav Kaushik**
* **GitHub:** [gaurav908408](https://github.com/gaurav908408)
* **Live Demo:** [TaskFlow App](https://taskflow-project-lovat.vercel.app/)

---

## ⭐ Support

If you found this project helpful, don't forget to **⭐ Star** the repository! Your support is greatly appreciated! 🚀
