import api from "./apiConfig.js";

const AUTH_ROUTE = `/auth`;

const registerPath = `/register`;
const loginPath = `/login`;
const logoutPath = `/logout`;

const profilePath = `/profile`;

const updatePath = `/update-profile`;
const deletePath = `/delete-profile`;

export const register = async (info) => api.post(`${AUTH_ROUTE}${registerPath}`, info);
export const login = async (credentials) => api.post(`${AUTH_ROUTE}${loginPath}`, credentials);
export const logout = async () => api.get(`${AUTH_ROUTE}${logoutPath}`);

export const profile = async () => api.get(`${AUTH_ROUTE}${profilePath}`);

export const updateProfile = async (data) => api.put(`${AUTH_ROUTE}${updatePath}`, data);
export const deleteProfile = async () => api.delete(`${AUTH_ROUTE}${deletePath}`);
