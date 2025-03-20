import {
  Country,
  Disaster,
  DonationsSummary,
  DonationTransaction,
  Feature,
  LocationStats,
  PaginatedData,
  Proposal,
  TokenStatus,
  User,
} from "@/types";
import Api, { ApiResponse } from ".";

export async function me(): Promise<ApiResponse<User>> {
  return Api.get("/auth/me");
}

export async function login(logins: {
  email: string;
  password: string;
}): Promise<{ success: string | null; error?: string }> {
  const response = await Api.post<{ token: string }>("/auth/login", logins);
  if (response.result) {
    Api.setToken(response.result);
  }
  return { success: "logged in successfully", error: response.error?.message };
}

export async function signup(newUser: {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  role: string;
}): Promise<{ success: string | null; error?: string }> {
  const response = await Api.post<{ token: string }>("/auth/signup", newUser);
  if (response.result) {
    Api.setToken(response.result);
  }
  return { success: "logged in successfully", error: response.error?.message };
}

export async function resetPassword(
  token: string,
  password: string,
): Promise<ApiResponse<User>> {
  return Api.post("/auth/reset-password", { token, password });
}

export async function forgotPassword(
  email: string,
): Promise<ApiResponse<string>> {
  return Api.post("/auth/forgot-password", { email });
}

export async function validateResetToken(
  token: string,
): Promise<ApiResponse<{ status: TokenStatus }>> {
  return Api.get("/auth/validate-token", { token });
}

export async function donationsSummary(): Promise<
  ApiResponse<DonationsSummary>
> {
  return Api.get("/donations/summary");
}

export async function monthlyStats(): Promise<ApiResponse<number[]>> {
  return Api.get("/donations/monthly");
}

export async function locationStats(): Promise<ApiResponse<LocationStats[]>> {
  return Api.get("/donations/location");
}

export async function proposals(options?: {
  page?: number;
  limit?: number;
  location?: Country;
  sort?: "Newest" | "Amount Requested" | "Trending";
  filter?: "All" | "Goal Achieved" | "Goal Failed" | "Ongoing";
}) {
  return Api.get<PaginatedData<Proposal>>("/proposals", options);
}

export async function latestProposals(): Promise<ApiResponse<Proposal[]>> {
  return Api.get<PaginatedData<Proposal>>("/proposals", {
    limit: 5,
    sort: "Newest",
  }).then((response) => ({
    result: response.result?.data ?? null,
    error: response.error,
  }));
}

export async function recommendedProposals(): Promise<ApiResponse<Proposal[]>> {
  return Api.get<PaginatedData<Proposal>>("/proposals", {
    limit: 5,
    sort: "Trending",
    filter: "Ongoing",
  }).then((response) => ({
    result: response.result?.data ?? null,
    error: response.error,
  }));
}

export async function proposal(id: string): Promise<ApiResponse<Proposal>> {
  return Api.get(`/proposals/${id}`);
}

export async function disaster(
  disasterId: string,
): Promise<ApiResponse<Disaster>> {
  return Api.get(`/disasters/${disasterId}`);
}

export async function disasters(options?: {
  page?: number;
  limit?: number;
  location?: Country;
  sort?: string;
  filter?: string;
}) {
  return Api.get<PaginatedData<Disaster>>("/proposals", options);
}

export async function teamMembers(): Promise<ApiResponse<User[]>> {
  return Api.get("/team");
}

export async function features(): Promise<ApiResponse<Feature[]>> {
  return Api.get("/features");
}

export async function disasterProposals({
  disasterId,
}: {
  disasterId: string;
}): Promise<ApiResponse<Proposal[]>> {
  return Api.get(`/disasters/${disasterId}/proposals`);
}

// donations made by current user
export async function currentDonations(options?: {
  search?: string;
  page?: number;
  limit?: number;
  location?: Country;
  sort?: string;
  filter?: string;
}) {
  return Api.get("/donor/donations", options);
}

export async function getTransactions(
  userId: string,
  options?: {
    search?: string;
    page?: number;
    limit?: number;
    location?: Country;
    sort?: string;
    filter?: string;
  },
): Promise<ApiResponse<PaginatedData<DonationTransaction>>> {
  return Api.get(`/transaction/${userId}`, options);
}
