"use client";
import { LocalUser } from "@/types";
import useApiQuery from "./useApiQuery";
import { me } from "@/api/auth";

/**
 * Custom hook to check if the client is logged in.
 *
 * Use this hook outside of the AuthContextProvider to check login status.
 * For managing authentication sessions (login/logout), use the `useAuth` hook within the AuthContextProvider.
 *
 * @returns {{
 *   user: LocalUser | null,
 *   isLoading: boolean,
 *   error: Error | undefined,
 *   reload: () => void
 * }} An object containing:
 * - `user` (LocalUser | null): The logged-in user or null if not logged in.
 * - `loading` (boolean): Indicates if the authentication check is in progress.
 * - `error` (Error | undefined): Any error encountered during the authentication check.
 * - `reload` (Function): A function to manually refetch the authentication status.
 */

export default function useUser(): {
  user: LocalUser | null;
  isLoading: boolean;
  error: Error | undefined;
  reload: () => void;
} {
  const { result, isLoading, error, refetch } = useApiQuery({
    queryKey: ["me", Math.random()],
    queryFn: () => me(),
    retry: false,
  });

  const reload = () => {
    refetch();
  };

  return { user: result?.user || null, isLoading, error, reload };
}
