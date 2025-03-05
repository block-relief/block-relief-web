import { DonationsSummary, LocationStats } from "@/types";
import Api, { ApiResponse } from ".";

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
