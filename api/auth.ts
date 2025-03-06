import { LocalUser } from "@/types";
import Api, { ApiResponse } from ".";

// Have to make sure that this route is not protected in the backend
// It should be accessible without a token, returning a 200 status code on every request if possible
// Should return { user: LocalUser } if the token is valid, otherwise return { user: null }
// This api must not automatically redirect to login by returning a 401 status code
// Redirecting will exist for other protected routes and will be handled by the AuthContextProvider
export async function me(): Promise<ApiResponse<LocalUser>> {
  return Api.get("/auth/me");
}

export async function login(logins: {
  email: string;
  password: string;
}): Promise<ApiResponse<{ access: string; refresh: string }>> {
  const response = await Api.post<{ access: string; refresh: string }>(
    "/auth/login",
    logins,
  );
  if (response.result) {
    Api.setToken(response.result);
  }
  return response;
}

export async function logout(): Promise<ApiResponse<string>> {
  return Api.post("/auth/logout", {});
}

export async function signup(newUser: {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  role: string;
}): Promise<ApiResponse<LocalUser>> {
  return Api.post("/auth/signup", newUser);
}

export async function resetPassword(
  token: string,
  password: string,
): Promise<ApiResponse<LocalUser>> {
  return Api.post("/auth/reset-password", { token, password });
}

export async function forgotPassword(
  email: string,
): Promise<ApiResponse<string>> {
  return Api.post("/auth/forgot-password", { email });
}

export enum TokenStatus {
  Expired = "Expired",
  Invalid = "Invalid",
  Active = "Active",
}

export async function validateResetToken(
  token: string,
): Promise<ApiResponse<{ status: TokenStatus }>> {
  return Api.get("/auth/validate-token", { token });
}
