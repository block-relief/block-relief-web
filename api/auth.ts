import { LocalUser } from "@/types";
import Api, { ApiResponse } from ".";

export async function login(
  username: string,
  password: string,
): Promise<ApiResponse<LocalUser>> {
  return Api.post("/auth/login", { username, password });
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
