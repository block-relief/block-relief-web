"use client";
import React, { createContext, useContext, PropsWithChildren } from "react";
import { LocalUser } from "@/types";
import { me } from "@/api/auth";
import useApiQuery from "./useApiQuery";

interface AuthContextType {
  user: LocalUser | null;
  isLoading: boolean;
  error: Error | undefined;
  reload: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const {
    result: user,
    error,
    isLoading,
    refetch,
  } = useApiQuery({
    queryKey: ["me", Math.random()],
    queryFn: () => me(),
    retry: false,
  });

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
