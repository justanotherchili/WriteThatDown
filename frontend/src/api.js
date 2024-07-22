import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if(token){
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export const getNotes = async () => {
  try{
    const res = await api.get("/api/notes/")
    return res.data
  } catch (error){
    console.log(error)
  }
}

export const deleteNoteByID = async (id) => {
  try{
    const res = await api.delete(`/api/notes/delete/${id}`)
    return res.status
  } catch(error){
    console.log(error)
  }
};

export const createNote = async (content, title) => {
  try{
    const res = await api.post("/api/notes/", {content, title})
    return res.status
  } catch(error){
    console.log(error)
  }
}