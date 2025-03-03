"use client";
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  PropsWithChildren,
} from "react";
import { LocalUser } from "@/types";
import { me, logout as apiLogout } from "@/api/auth";
import { ApiResponse } from "@/api";

interface AuthContextType {
  user: LocalUser | null;
  login: (user: UserResponseNonNullable) => void;
  logout: () => void;
  loading: boolean;
  error: Error | null;
  reload: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type UserResponse = ApiResponse<{ user: LocalUser | null }>;
type UserResponseNonNullable = ApiResponse<{ user: LocalUser }>;

export const AuthContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [response, setResponse] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const login = (user: UserResponseNonNullable) => {
    setResponse(user);
  };

  const reload = () => {
    setLoading(true);
    me()
      .then((res) => setResponse(res || null))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    reload();
  }, []);

  const logout = () => {
    setLoading(true);
    apiLogout()
      .then(() => setResponse(null))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const value = {
    user: response?.result?.user || null,
    error: response?.error || null,
    login,
    logout,
    loading,
    reload,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthContextProvider");
  }
  return context;
};
