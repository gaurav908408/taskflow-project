import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// =======================
// AUTH APIs
// =======================

export const registerUser = (data) =>
  API.post("/auth/register", data);

export const loginUser = (data) =>
  API.post("/auth/login", data);

export const logoutUser = () =>
  API.post("/auth/logout");

export const getProfile = () =>
  API.get("/auth/me");

// =======================
// PROJECT APIs
// =======================

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

// =======================
// TASK APIs
// =======================

export const getTasks = (params) =>
  API.get("/tasks", { params });

export const getTask = (id) =>
  API.get(`/tasks/${id}`);

export const createTask = (data) =>
  API.post("/tasks", data);

export const updateTask = (id, data) =>
  API.put(`/tasks/${id}`, data);

export const deleteTask = (id) =>
  API.delete(`/tasks/${id}`);

// =======================
// DASHBOARD API
// =======================

export const getDashboard = () =>
  API.get("/dashboard");

export default API;