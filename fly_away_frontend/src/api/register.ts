import { api } from "./api";


export const register = () => api.post("/users/register");