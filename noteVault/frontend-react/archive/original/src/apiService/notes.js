import api from "./apiConfig.js";

const NOTE_ROUTE = `/note`

export const getNotes = async () => api.get(`${NOTE_ROUTE}`);
export const getNote = async (id) => api.get(`${NOTE_ROUTE}/${id}`);

export const newNote = async (note) => api.post(`${NOTE_ROUTE}`, note);
export const updateNote = async (id, note) => api.put(`${NOTE_ROUTE}/${id}`, note);
export const deleteNote = async (id) => api.delete(`${NOTE_ROUTE}/${id}`);
