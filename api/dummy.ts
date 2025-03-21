/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Campaign,
  DonationsSummary,
  User,
  LocationStats,
  Proposal,
  TokenStatus,
  PaginatedData,
  Feature,
  TeamMember,
  Country,
  Disaster,
  DonationTransaction,
} from "@/types";
import { ApiResponse } from ".";
import {
  DUMMYUSER,
  DUMMYCAMPAIGNS,
  DUMMYDONATIONSSUMMARY,
  DUMMYLOCATIONSTATS,
  DUMMYPROPOSALS,
  DUMMYFEATURES,
  DUMMYTEAMMEMBERS,
  DUMMYDISASTERS,
  DUMMYNGOS,
  DUMMYAIDREQUESTS,
  DUMMYDONATIONS,
} from "./temp";
import { Neucha } from "next/font/google";

const randomDelay = () =>
  new Promise(
    (resolve) => setTimeout(resolve, Math.random() * 1500 + 500), // 0.5-2 second delay
  );

let loggedIn = false;
export async function me(): Promise<ApiResponse<User>> {
  await randomDelay();
  return {
    result: loggedIn ? DUMMYUSER : null,
    error: null,
  };
}

export async function login(logins: {
  email: string;
  password: string;
}): Promise<{ success: string | null; error?: string }> {
  loggedIn = true;
  await randomDelay();
  return {
    success: "logged in successfully",
  };
}

export async function signup(newUser: {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  role: string;
}): Promise<{ success: string | null; error?: string }> {
  DUMMYUSER.roles = [newUser.role];
  await randomDelay();
  return login({ email: newUser.email, password: newUser.password });
}

export async function resetPassword(
  token: string,
  password: string,
): Promise<ApiResponse<User>> {
  await randomDelay();
  return {
    result: { ...DUMMYUSER },
    error: null,
  };
}

export async function forgotPassword(
  email: string,
): Promise<ApiResponse<string>> {
  await randomDelay();
  return {
    result: "Password reset link sent to email",
    error: null,
  };
}

export async function validateResetToken(
  token: string,
): Promise<ApiResponse<{ status: TokenStatus }>> {
  await randomDelay();
  return {
    result: { status: TokenStatus.Active },
    error: null,
  };
}

export async function donationsSummary(): Promise<
  ApiResponse<DonationsSummary>
> {
  await randomDelay();
  return {
    result: { ...DUMMYDONATIONSSUMMARY },
    error: null,
  };
}

export async function monthlyStats(): Promise<ApiResponse<number[]>> {
  await randomDelay();
  return {
    result: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200],
    error: null,
  };
}

export async function locationStats(): Promise<ApiResponse<LocationStats[]>> {
  await randomDelay();
  return {
    result: [...DUMMYLOCATIONSTATS],
    error: null,
  };
}

export async function proposals(options?: {
  page?: number;
  limit?: number;
  location?: string;
  sort?: string;
  filter?: string;
}): Promise<ApiResponse<PaginatedData<Proposal>>> {
  await randomDelay();
  const data = [...DUMMYPROPOSALS];
  if (options?.limit) {
    while (data.length != options.limit) {
      if (data.length > options.limit) {
        data.pop();
      } else {
        data.push(data[Math.floor(Math.random() * data.length)]);
      }
    }
  }
  return {
    result: {
      data,
      page: options?.page ?? 1,
      limit: options?.limit ?? 6,
      totalItems: 200,
    },
    error: null,
  };
}

export async function latestProposals(): Promise<ApiResponse<Proposal[]>> {
  await randomDelay();
  const result = DUMMYPROPOSALS.slice(0, 3);
  return {
    result,
    error: null,
  };
}

export async function recommendedProposals(): Promise<ApiResponse<Proposal[]>> {
  await randomDelay();
  const result = DUMMYPROPOSALS.slice(0, 3);
  return {
    result,
    error: null,
  };
}

export async function proposal(id: string): Promise<ApiResponse<Proposal>> {
  await randomDelay();
  const result = { ...DUMMYPROPOSALS.find((p) => p._id === id)! };
  result.disaster =
    DUMMYDISASTERS[Math.floor(Math.random() * DUMMYDISASTERS.length)];
  result.ngo = DUMMYNGOS[Math.floor(Math.random() * DUMMYNGOS.length)];
  result.aidRequests = DUMMYAIDREQUESTS;
  return {
    result,
    error: null,
  };
}

export async function disaster(
  disasterId: string,
): Promise<ApiResponse<Disaster>> {
  await randomDelay();
  const result = { ...DUMMYDISASTERS.find((p) => p._id === disasterId)! };
  return {
    result,
    error: null,
  };
}

export async function disasters(options?: {
  page?: number;
  limit?: number;
  location?: Country;
  sort?: string;
  filter?: string;
}): Promise<ApiResponse<PaginatedData<Disaster>>> {
  await randomDelay();
  const data = [...DUMMYDISASTERS];
  if (options?.limit) {
    while (data.length != options.limit) {
      if (data.length > options.limit) {
        data.pop();
      } else {
        data.push(data[Math.floor(Math.random() * data.length)]);
      }
    }
  }
  return {
    result: {
      data,
      page: options?.page ?? 1,
      limit: options?.limit ?? 6,
      totalItems: 200,
    },
    error: null,
  };
}

export async function features(): Promise<ApiResponse<Feature[]>> {
  await randomDelay();
  const result = [...DUMMYFEATURES];
  return {
    result,
    error: null,
  };
}

export async function teamMembers(): Promise<ApiResponse<TeamMember[]>> {
  await randomDelay();
  const result = [...DUMMYTEAMMEMBERS];
  return {
    result,
    error: null,
  };
}

export async function disasterProposals({
  disasterId,
}: {
  disasterId: string;
}): Promise<ApiResponse<Proposal[]>> {
  const result = [...DUMMYPROPOSALS];
  return {
    result,
    error: null,
  };
}

export async function getDonations(
  ngoId: string,
  options?: {
    search?: string;
    page?: number;
    limit?: number;
    location?: Country;
    sort?: string;
    filter?: string;
  },
) {
  await randomDelay();
  const data = [...DUMMYDONATIONS];
  if (options?.limit) {
    while (data.length != options.limit) {
      if (data.length > options.limit) {
        data.pop();
      } else {
        data.push(data[Math.floor(Math.random() * data.length)]);
      }
    }
  }

  return {
    result: {
      data,
      page: 1,
      limit: options?.limit ?? data.length,
      totalItems: 67,
    },
    error: null,
  };
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
  await randomDelay();
  const data = [...DUMMYDONATIONS];
  if (options?.limit) {
    while (data.length != options.limit) {
      if (data.length > options.limit) {
        data.pop();
      } else {
        data.push(data[Math.floor(Math.random() * data.length)]);
      }
    }
  }

  return {
    result: {
      data,
      page: 1,
      limit: options?.limit ?? data.length,
      totalItems: 67,
    },
    error: null,
  };
}
