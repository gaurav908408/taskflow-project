import axios from "axios";

// Dynamically target local development API or production cloud backend
const API = axios.create({
  baseURL:
    window.location.hostname === "localhost"
      ? "http://localhost:5000/api"
      : "https://taskflow-backend-ytng.onrender.com/api",
});

// Attach authorization bearer token from local storage to outgoing HTTP requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Authentication & Profile API Endpoints
export const registerUser = (data) =>
  API.post("/auth/register", data);

export const loginUser = (data) =>
  API.post("/auth/login", data);

export const getMe = () =>
  API.get("/auth/me");

export const uploadProfilePicture = (formData) =>
  API.post("/auth/profile-picture", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// Client-side logout helper
export const logoutUser = () => Promise.resolve();

// Dashboard Analytics API Endpoint
export const getDashboard = () =>
  API.get("/dashboard");

// Project Management CRUD Operations
export const getProjects = () =>
  API.get("/projects");

export const getProject = (id) =>
  API.get(`/projects/${id}`);

export const createProject = (data) =>
  API.post("/projects", data);

export const updateProject = (id, data) =>
  API.put(`/projects/${id}`, data);

export const deleteProject = (id) =>
  API.delete(`/projects/${id}`);

// Task Management & Kanban Drag-and-Drop Operations
export const getTasks = (params = {}) =>
  API.get("/tasks", { params });

export const getTask = (id) =>
  API.get(`/tasks/${id}`);

export const createTask = (data) =>
  API.post("/tasks", data);

export const updateTask = (id, data) =>
  API.put(`/tasks/${id}`, data);

// Updates task status pill when dragged across Kanban columns
export const updateTaskStatus = (id, status) =>
  API.patch(`/tasks/${id}/status`, { status });

export const deleteTask = (id) =>
  API.delete(`/tasks/${id}`);

export default API;