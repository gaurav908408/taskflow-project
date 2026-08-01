# 🚀 TaskFlow - Full Stack Project Management System

<p align="center">

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?logo=mongodb)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-UI-38BDF8?logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-blue)

</p>

> A modern and responsive **Project Management System** built using **React.js, Express.js, MongoDB, and JWT Authentication**. Manage projects, organize tasks, upload profile pictures, and track progress with a beautiful dashboard supporting **Dark & Light Mode**.

---

# 🌐 Live Demo

🚀 **Website**

https://taskflow-project-lovat.vercel.app/

💻 **GitHub Repository**

https://github.com/gaurav908408/taskflow-project

---

# 📑 Table of Contents

- Features
- Tech Stack
- Screenshots
- Folder Structure
- Installation
- Environment Variables
- API Endpoints
- Deployment
- Future Improvements
- Author

---

# ✨ Features

## 🔐 Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Secure Logout

---

## 👤 User Profile

- View User Profile
- Update Account Information
- Upload Profile Picture
- Multer Image Upload Integration

---

## 📁 Project Management

- Create Projects
- View Projects
- Edit Projects
- Delete Projects
- Project Description

---

## ✅ Task Management

- Create Tasks
- Update Tasks
- Delete Tasks
- Assign Tasks to Projects
- Drag & Drop Kanban Board

---

## 📊 Dashboard

- Total Projects Counter
- Total Tasks Counter
- Completed Tasks
- Pending Tasks
- Welcome Section
- Live Date & Time

---

## 🔍 Search & Filters

- Search Tasks
- Filter by Status
- Filter by Priority
- Pagination Support

---

## 🎨 Modern UI

- Dark Mode
- Light Mode
- Responsive Design
- Toast Notifications
- Loading Spinner
- Smooth Animations
- Hover Effects

---

# 🛠 Tech Stack

## Frontend

- React.js
- React Router DOM
- Context API
- Tailwind CSS
- Axios
- React Icons
- React Hot Toast

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- Multer

---

# 📸 Screenshots

## 📝 Register

<img width="100%" src="https://github.com/user-attachments/assets/39d82e4f-d2f4-4894-9e4d-221fb833e95b"/>

---

## 🔑 Login

<img width="100%" src="https://github.com/user-attachments/assets/b892ceda-4d66-475e-a0b8-8252fbd69d07"/>

---

## 📊 Dashboard

<img width="100%" src="https://github.com/user-attachments/assets/344a3624-ac4e-4ffc-9d62-9ee654ef8340"/>

---

## 📁 Projects

<img width="100%" src="https://github.com/user-attachments/assets/a5d5cac5-0bf2-4530-8dea-a03752b60dec"/>

---

## ✅ Tasks

<img width="100%" src="https://github.com/user-attachments/assets/aaa60800-f8a6-4161-9b84-377728683c9c"/>

---

## 📌 Kanban Board

<img width="100%" src="https://github.com/user-attachments/assets/110afcd0-6207-4482-9f95-e963debe8a81"/>

---

## 👤 Profile

<img width="100%" src="https://github.com/user-attachments/assets/aaaf978d-0cc1-45b0-b145-c9f20cbf94a3"/>

---

# 📂 Folder Structure

```text
TaskFlow
│
├── backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── uploads
│   ├── server.js
│   └── package.json
│
├── frontend
│   └── taskflow-frontend
│       ├── public
│       ├── src
│       │   ├── assets
│       │   ├── components
│       │   ├── context
│       │   ├── pages
│       │   ├── services
│       │   └── App.jsx
│       └── package.json
│
├── README.md
└── .gitignore
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/gaurav908408/taskflow-project.git
```

```bash
cd taskflow-project
```

---

## Backend

```bash
cd backend
```

```bash
npm install
```

```bash
npm run dev
```

---

## Frontend

```bash
cd frontend/taskflow-frontend
```

```bash
npm install
```

```bash
npm run dev
```

---

# 🔐 Environment Variables

Create a `.env` file inside the **backend** folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

NODE_ENV=development
```

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint | Description |
|----------|----------------------|---------------------|
| POST | /api/auth/register | Register User |
| POST | /api/auth/login | Login User |
| GET | /api/auth/me | Current User |

---

## Projects

| Method | Endpoint | Description |
|----------|----------------------|----------------|
| GET | /api/projects | Get Projects |
| POST | /api/projects | Create Project |
| PUT | /api/projects/:id | Update Project |
| DELETE | /api/projects/:id | Delete Project |

---

## Tasks

| Method | Endpoint | Description |
|----------|---------------------|----------------|
| GET | /api/tasks | Get Tasks |
| POST | /api/tasks | Create Task |
| PUT | /api/tasks/:id | Update Task |
| DELETE | /api/tasks/:id | Delete Task |

---

# 🚀 Deployment

| Service | Platform |
|----------|----------|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |

---

# 🔮 Future Improvements

- Team Collaboration
- Role Based Access
- File Attachments
- Email Notifications
- Task Comments
- Activity Logs
- Due Date Reminders
- Calendar View
- Project Analytics

---

# 👨‍💻 Author

**Gaurav Kaushik**

GitHub

https://github.com/gaurav908408

Live Demo

https://taskflow-project-lovat.vercel.app/

---

# 🤝 Contributing

Contributions are welcome.

Fork this repository, create a new branch, make your changes, and submit a Pull Request.

---

# ⭐ Support

If you found this project useful, please consider giving it a **⭐ Star** on GitHub.

It helps the project grow and motivates future improvements.

---
