import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getNotes = async () => {
  try {
    const response = await api.get("/api/notes/");
    console.log(response);
    return response.data;
  } catch {
    console.log(error)
    throw error;
  }
};

export const postLogin = async (route, data) => {
  try {
    const response = await api.post(route, data);
    return response.data;
  } catch (error) {
    console.log(error)
    throw error;
  }
};

export const postNote = async (content, title) => {
  try {
    const response = await api.post("/api/notes/", { content, title });
    if (response.status === 201) {
      alert("Note created");
    } else {
      alert("Failed to make note");
    }
  } catch (error) {
    console.log(error)
    throw error;
  }
};


export const deleteNoteByID = async (id) => {
  try {
    const response = await api.delete(`/api/notes/delete/${id}/`);
    console.log(response.status);
    if (response.status === 204) {
      alert("Note Deleted");
    } else {
      alert("Failed to delete note.");
    }
  } catch (error) {
    console.log(error)
    throw error;
  }
};


export default api;
