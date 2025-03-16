"use client";
import React, {
  createContext,
  useContext,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { User } from "@/types";
import useApiQuery from "./useApiQuery";
import Api, { setReturnTo } from "@/api";
import { useRouter } from "next/navigation";
import { me } from "@/api/dummy";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: Error | undefined;
  reload: () => void;
  logout: () => Promise<void>;
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
  const [loggingOut, setLogggingOut] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!loggingOut && enforceLogin && !isLoading && !user) {
      setReturnTo();
      router.push("/login");
    }
  }, [loggingOut, enforceLogin, isLoading, user, router]);

  const reload = () => {
    refetch();
  };

  const logout = async () => {
    if (user) {
      setLogggingOut(true);
      Api.resetToken();
      await refetch();
      router.push("/");
      setLogggingOut(false);
    }
  };

  const value = {
    user: user || null,
    error,
    isLoading,
    reload,
    logout,
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
