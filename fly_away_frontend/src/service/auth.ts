import { api } from "../api/api";


type Datos = {
    email: string;
    firstname: string;
    lastname: string ;
    password: string ;
}
type DatosLogin = {
    email:string;
    password:string;
}
export const register = (data:Datos) => { 
    return api.post("/users/register",data);
 };
 export const login =(data:DatosLogin) => api.post("/auth/login", data);
 export const getCurrent =()=> api.get("/users/current");