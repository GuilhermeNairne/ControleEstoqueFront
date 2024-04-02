import { useContext } from "react";
import { AuthContext } from "../context/auth-context";
import { Home } from "./Home";
import { Login } from "./login";

export const Navigation = () => {
  const { isSignedIn } = useContext(AuthContext);

  return isSignedIn ? <Home /> : <Login />;
};
