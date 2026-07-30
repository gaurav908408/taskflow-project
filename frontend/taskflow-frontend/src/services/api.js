import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// =================== AUTH ===================

export const registerUser = (data) =>
  API.post("/auth/register", data);

export const loginUser = (data) =>
  API.post("/auth/login", data);

export const getMe = () =>
  API.get("/auth/me");

export const logoutUser = () =>
  API.post("/auth/logout");

// ================= DASHBOARD =================

export const getDashboard = () =>
  API.get("/dashboard");

// ================= PROJECTS ==================

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
// ================= TASKS =================

export const getTasks = () =>
  API.get("/tasks");

export const getTask = (id) =>
  API.get(`/tasks/${id}`);

export const createTask = (data) =>
  API.post("/tasks", data);

export const updateTask = (id, data) =>
  API.put(`/tasks/${id}`, data);

export const deleteTask = (id) =>
  API.delete(`/tasks/${id}`);