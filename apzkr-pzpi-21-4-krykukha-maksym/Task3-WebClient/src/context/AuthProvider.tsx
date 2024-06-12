import { createContext, useEffect, useState } from "react";
import { AuthResultDto, WatcherAuthResult } from "../interfaces/account";

interface AuthContextProps {
  auth: WatcherAuthResult;
  setAuth: React.Dispatch<React.SetStateAction<WatcherAuthResult>>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<WatcherAuthResult>({});

  useEffect(() => {
    const id = localStorage.getItem("watcherId");
    const role = localStorage.getItem("role");


    if (!auth.id && id && role  ) {
      setAuth({id,role})
    }
  }, [auth.id]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;