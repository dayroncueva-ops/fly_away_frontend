import { api } from "./api";

export const getCurrent =()=> api.get("/users/current");

//export const getUser = (id: string) => api.get(`/users/current/${id}`);
// innecesariop porque getCurrent funciona si user autenticado