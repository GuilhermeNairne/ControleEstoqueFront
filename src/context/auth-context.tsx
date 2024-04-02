import { ReactNode, createContext, useState } from "react";
import api from "../api";

interface AuthProviderProps {
  children: ReactNode;
}

type LoginResponse = {
  access_token: string;
  usuario: string;
  funcao: string;
};

type LoginAccess = {
  usuario: string;
  senha: string;
};

type AuthResponse = {
  access_token: string;
  usuario: string;
  funcao: string;
};

type LoggedUser = {
  usuario: string;
  funcao: string;
};

interface AuthContextData {
  login: (credentials: LoginAccess) => Promise<AuthResponse>;
  singOut: () => void;
  user?: LoggedUser | null;
  isSignedIn: boolean;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<LoggedUser | null>();
  const isSignedIn = !!user;
  const setAuth = async (auth: AuthResponse) => {
    const { funcao, usuario, access_token } = auth;

    await localStorage.setItem("access_token", access_token);

    api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

    setUser({ usuario, funcao });
  };

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (
        error?.response?.status === 401 &&
        error?.response?.data?.message === "Token inválido ou vencido" &&
        error?.response?.data?.error === "Unauthorized"
      ) {
        singOut();
      }

      throw error;
    }
  );

  async function login(body: LoginAccess) {
    const { data } = await api.post<LoginResponse>("auth/login", body);

    setAuth(data);

    return data;
  }

  function singOut() {
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        login,
        singOut,
        isSignedIn,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
