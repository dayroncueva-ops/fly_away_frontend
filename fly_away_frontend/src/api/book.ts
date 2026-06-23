import { api } from "./api";


export const book = () => api.post("//flights/book");

export const getBook =(id:string) => api.get(`/flights/book/${id}`);
