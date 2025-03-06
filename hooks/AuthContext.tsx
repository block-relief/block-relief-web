"use client";
import React, {
  createContext,
  useContext,
  PropsWithChildren,
  useEffect,
} from "react";
import { LocalUser } from "@/types";
import { me } from "@/api/dummy";
import useApiQuery from "./useApiQuery";
import { setReturnTo } from "@/api";

interface AuthContextType {
  user: LocalUser | null;
  isLoading: boolean;
  error: Error | undefined;
  reload: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({
  children,
  enforceLogin,
}: PropsWithChildren<{ enforceLogin?: boolean }>) => {
  const {
    result: user,
    error,
    isLoading,
    refetch,
  } = useApiQuery({
    queryKey: ["me"],
    queryFn: () => me(),
    retry: 1,
  });

  useEffect(() => {
    if (enforceLogin && !isLoading && !user?.user) {
      setReturnTo();
      window.location.href = "/login";
    }
  }, [enforceLogin, isLoading, user]);

  const reload = () => {
    refetch();
  };

  const value = {
    user: user?.user || null,
    error,
    isLoading,
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
