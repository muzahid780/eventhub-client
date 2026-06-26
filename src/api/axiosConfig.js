import axios from "axios";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 30000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 400:
          toast.error(data?.message || "Bad request. Please check your input.");
          break;

        case 401:
          toast.error("Session expired. Please login again.");
          localStorage.removeItem("authToken");
          localStorage.removeItem("user");
          window.location.href = "/login";
          break;

        case 403:
          toast.error("You do not have permission to perform this action.");
          break;

        case 404:
          toast.error(data?.message || "Resource not found.");
          break;

        case 409:
          toast.error(data?.message || "Conflict with current state.");
          break;

        case 422:
          if (data?.errors) {
            const errorMessages = Object.values(data.errors).flat().join(", ");
            toast.error(errorMessages);
          } else {
            toast.error(data?.message || "Validation failed.");
          }
          break;

        case 429:
          toast.error("Too many requests. Please try again later.");
          break;

        case 500:
          toast.error("Server error. Please try again later.");
          break;

        case 503:
          toast.error("Service unavailable. Please try again later.");
          break;

        default:
          toast.error(data?.message || "An error occurred. Please try again.");
      }

      console.error("API Error:", {
        status,
        data,
        url: error.config?.url,
        method: error.config?.method,
      });
    } else if (error.request) {
      toast.error("Network error. Please check your connection.");
      console.error("Network Error:", error.request);
    } else {
      toast.error("An unexpected error occurred.");
      console.error("Error:", error.message);
    }

    return Promise.reject(error);
  },
);

export const get = async (url, params = {}) => {
  try {
    const response = await api.get(url, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// POST request
export const post = async (url, data = {}) => {
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// PUT request
export const put = async (url, data = {}) => {
  try {
    const response = await api.put(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// PATCH request
export const patch = async (url, data = {}) => {
  try {
    const response = await api.patch(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// DELETE request
export const del = async (url) => {
  try {
    const response = await api.delete(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// File upload with progress
export const uploadFile = async (url, file, onProgress = null) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await api.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          onProgress(percentCompleted);
        }
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Set auth token
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem("authToken", token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    localStorage.removeItem("authToken");
    delete api.defaults.headers.common["Authorization"];
  }
};

// Clear auth token
export const clearAuthToken = () => {
  localStorage.removeItem("authToken");
  delete api.defaults.headers.common["Authorization"];
};

export const hasAuthToken = () => {
  return !!localStorage.getItem("authToken");
};

export const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

export default api;
