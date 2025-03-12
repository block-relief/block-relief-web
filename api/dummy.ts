export const TeamMembers = [
  {
    id: 1,
    fullname: "Tom Hanks",
    role: "Front-end Developer",
    photoUrl: "/demo/profile_1.png",
  },
  {
    id: 2,
    fullname: "Tom Cruise",
    role: "Back-end Developer",
    photoUrl: "/demo/profile_2.png",
  },
  {
    id: 3,
    fullname: "Tom Hardy",
    role: "Designer",
    photoUrl: "/demo/profile_3.png",
  },
  {
    id: 4,
    fullname: "Tom Holland",
    role: "Tester",
    photoUrl: "/demo/profile_2.png",
  },
  {
    id: 5,
    fullname: "Tom Felton",
    role: "Manager",
    photoUrl: "/demo/profile_1.png",
  },
];

export const Features = [
  {
    title: "Donors",
    description:
      "Find campaigns, donate (crypto/fiat), and watch impact unfold.",
    icon: "/demo/feature_1.png",
  },
  {
    title: "NGOs",
    description: "Launch proposals, manage resources, and share success.",
    icon: "/demo/feature_2.png",
  },
  {
    title: "Victims",
    description: "Share stories, receive donations, and express gratitude.",
    icon: "/demo/feature_3.png",
  },
  {
    title: "Community",
    description: "Join a community, share stories, and inspire others.",
    icon: "/demo/feature_2.png",
  },
  {
    title: "Dashboard",
    description: "Manage campaigns, view analytics, and engage with donors.",
    icon: "/demo/feature_1.png",
  },
];

import { Campaign, DonationsSummary, LocalUser, LocationStats } from "@/types";
import { ApiResponse } from ".";
import { DummyApi } from "./dummyApi";

export async function me(): Promise<ApiResponse<{ user: LocalUser | null }>> {
  return DummyApi.me();
}

export async function login(logins: {
  email: string;
  password: string;
}): Promise<ApiResponse<LocalUser>> {
  return DummyApi.login(logins);
}

export async function signup(newUser: {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  role: string;
}): Promise<ApiResponse<LocalUser>> {
  return DummyApi.signup(newUser);
}

export async function resetPassword(
  token: string,
  password: string,
): Promise<ApiResponse<LocalUser>> {
  return DummyApi.resetPassword(token, password);
}

export async function forgotPassword(
  email: string,
): Promise<ApiResponse<string>> {
  return DummyApi.forgotPassword(email);
}

export enum TokenStatus {
  Expired = "Expired",
  Invalid = "Invalid",
  Active = "Active",
}

export async function validateResetToken(
  token: string,
): Promise<ApiResponse<{ status: TokenStatus }>> {
  return DummyApi.validateResetToken(token);
}

export async function donationsSummary(): Promise<
  ApiResponse<DonationsSummary>
> {
  return DummyApi.donationsSummary();
}

export async function monthlyStats(): Promise<ApiResponse<number[]>> {
  return DummyApi.monthlyStats();
}

export async function locationStats(): Promise<ApiResponse<LocationStats[]>> {
  return DummyApi.locationStats();
}

export async function recommendedCampaigns(): Promise<ApiResponse<Campaign[]>> {
  return DummyApi.recommendedCampaigns();
}

export async function latestCampaigns(): Promise<ApiResponse<Campaign[]>> {
  return DummyApi.latestCampaigns();
}
