import { api } from "../api/api";

export type RegisterData = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type CurrentUser = {
  id: number;
  email?: string;
  username?: string;
  firstName?: string;
  firstname?: string;
  lastName?: string;
  lastname?: string;
};

export const register = (data: RegisterData) => {
  return api.post("/users/register", data);
};

export const login = (data: LoginData) => {
  return api.post("/auth/login", data);
};

export const getCurrent = () => {
  return api.get<CurrentUser>("/users/current");
};

