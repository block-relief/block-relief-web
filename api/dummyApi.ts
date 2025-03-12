/* eslint-disable @typescript-eslint/no-unused-vars */
import { Campaign, DonationsSummary, LocalUser, LocationStats } from "@/types";
import { recommendedCampaigns } from "./campaigns";

export interface ApiResponse<T> {
  result: T | null;
  error: Error | null;
}

const dummyUser: LocalUser = {
  id: "123",
  username: "John Doe",
  photoUrl: "/demo/profile_2.png",
  role: "donor",
};

const locationStats: LocationStats[] = [
  {
    country: {
      code: "US",
      name: "United States",
    },
    contributions: 123,
    campaigns: 234,
    beneficiaries: 345,
    totalDonations: 456,
  },
  {
    country: {
      code: "CA",
      name: "Canada",
    },
    contributions: 567,
    campaigns: 678,
    beneficiaries: 789,
    totalDonations: 890,
  },
  {
    country: {
      code: "GB",
      name: "United Kingdom",
    },
    contributions: 901,
    campaigns: 123,
    beneficiaries: 234,
    totalDonations: 345,
  },
  {
    country: {
      code: "AU",
      name: "Australia",
    },
    contributions: 567,
    campaigns: 678,
    beneficiaries: 789,
    totalDonations: 890,
  },
  {
    country: {
      code: "MX",
      name: "Mexico",
    },
    contributions: 901,
    campaigns: 123,
    beneficiaries: 234,
    totalDonations: 345,
  },
];

export const campaigns: Campaign[] = [
  {
    id: "1",
    title: "Clean Water for All",
    description:
      "Providing clean and safe drinking water to communities in need.",
    organization: "WaterAid",
    dateStarted: "2025-01-01",
    targetAmount: 10000,
    raisedAmount: 5000,
    totalContributions: 150,
    totalDonors: 100,
    totalBeneficiaries: 200,
    status: "active",
    previewImageUrl: "/demo/campaign_1.png",
    organizationLogo: "/demo/org_logo_1.png",
  },
  {
    id: "2",
    title: "Education for Every Child",
    description:
      "Ensuring access to quality education for children in underprivileged areas.",
    organization: "EduCare",
    dateStarted: "2025-02-01",
    targetAmount: 20000,
    raisedAmount: 15000,
    totalContributions: 300,
    totalDonors: 250,
    totalBeneficiaries: 500,
    status: "active",
    previewImageUrl: "/demo/campaign_2.png",
    organizationLogo: "/demo/org_logo_2.png",
  },
  {
    id: "3",
    title: "Healthcare for the Homeless",
    description:
      "Providing essential healthcare services to homeless individuals.",
    organization: "HealthFirst",
    dateStarted: "2025-03-01",
    targetAmount: 15000,
    raisedAmount: 10000,
    totalContributions: 200,
    totalDonors: 150,
    totalBeneficiaries: 300,
    status: "active",
    previewImageUrl: "/demo/campaign_3.png",
    organizationLogo: "/demo/org_logo_3.png",
  },
];

export const DummyApi = {
  me: async (): Promise<ApiResponse<{ user: LocalUser | null }>> => {
    await randomDelay();
    return {
      result: { user: dummyUser },
      error: null,
    };
  },

  login: async (credentials: {
    email: string;
    password: string;
  }): Promise<ApiResponse<typeof dummyUser>> => {
    await randomDelay();
    return {
      result: { ...dummyUser },
      error: null,
    };
  },

  signup: async (newUser: {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    role: string;
  }): Promise<ApiResponse<typeof dummyUser>> => {
    await randomDelay();
    return {
      result: { ...dummyUser },
      error: null,
    };
  },

  resetPassword: async (
    token: string,
    password: string,
  ): Promise<ApiResponse<typeof dummyUser>> => {
    await randomDelay();
    return {
      result: { ...dummyUser },
      error: null,
    };
  },

  forgotPassword: async (email: string): Promise<ApiResponse<string>> => {
    await randomDelay();
    return {
      result: "Password reset email sent",
      error: null,
    };
  },

  validateResetToken: async (
    token: string,
  ): Promise<ApiResponse<{ status: TokenStatus }>> => {
    await randomDelay();
    return {
      result: { status: TokenStatus.Active },
      error: null,
    };
  },

  donationsSummary: async (): Promise<ApiResponse<DonationsSummary>> => {
    await randomDelay();
    return {
      result: {
        totalDonations: 6323,
        campaigns: 121,
        beneficiaries: 1232,
        contributions: 123,
      },
      error: null,
    };
  },

  monthlyStats: async (): Promise<ApiResponse<number[]>> => {
    await randomDelay();
    return {
      result: [123, 234, 345, 456, 567, 678, 789, 890, 901, 123, 234, 345],
      error: null,
    };
  },

  locationStats: async (): Promise<ApiResponse<LocationStats[]>> => {
    await randomDelay();
    return {
      result: locationStats,
      error: null,
    };
  },

  latestCampaigns: async (): Promise<ApiResponse<Campaign[]>> => {
    await randomDelay();
    return {
      result: campaigns,
      error: null,
    };
  },

  recommendedCampaigns: async (): Promise<ApiResponse<Campaign[]>> => {
    await randomDelay();
    return {
      result: campaigns,
      error: null,
    };
  },
};

// Helpers
const randomDelay = () =>
  new Promise(
    (resolve) => setTimeout(resolve, Math.random() * 1500 + 500), // 0.5-2 second delay
  );

export enum TokenStatus {
  Expired = "Expired",
  Invalid = "Invalid",
  Active = "Active",
}
