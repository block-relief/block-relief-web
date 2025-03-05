import { Campaign } from "@/types";
import Api, { ApiResponse } from ".";

export async function latestCampaigns(): Promise<ApiResponse<Campaign[]>> {
  return Api.get("/campaigns/latest");
}

export async function recommendedCampaigns(): Promise<ApiResponse<Campaign[]>> {
  return Api.get("/campaigns/recommended");
}
