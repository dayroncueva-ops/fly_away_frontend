import { api } from "./api";


export const login =() => api.post("/auth/login");