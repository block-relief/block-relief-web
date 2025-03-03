import { LocalUser } from "@/types";
import Api, { ApiResponse } from ".";

export async function me(): Promise<ApiResponse<{ user: LocalUser | null }>> {
  return Api.get("/auth/me");
}

export async function login(logins: {
  email: string;
  password: string;
}): Promise<ApiResponse<LocalUser>> {
  return Api.post("/auth/login", logins);
}

export async function logout(): Promise<ApiResponse<{}>> {
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

export async function forgotPassword(email: string): Promise<ApiResponse<{}>> {
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
