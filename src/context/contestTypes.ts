import { ReactNode } from "react";

export interface AuthProviderProps {
  children: ReactNode;
}

export type LoginResponse = {
  access_token: string;
  usuario: string;
  funcao: string;
  urlImage: string;
};

export type LoginAccess = {
  usuario: string;
  senha: string;
};

export type AuthResponse = {
  access_token: string;
  usuario: string;
  funcao: string;
  urlImage: string;
};

export type LoggedUser = {
  usuario: string;
  funcao: string;
  urlImage: string;
};
