"use client";
import { latestCampaigns } from "@/api/dummy";
import { useAuth } from "@/hooks/AuthContext";
import useApiQuery from "@/hooks/useApiQuery";
import DashboardSectionHeader from "../custom/DashboardSectionHeader";
import { Skeleton } from "../ui/skeleton";
import CampaignCard from "../custom/CampaignCard";

export default function LatestCampaigns() {
  const { user } = useAuth();
  const { result, isLoading } = useApiQuery({
    queryKey: ["latest-campaigns"],
    queryFn: async () => latestCampaigns(),
    retry: 3,
    enabled: !!user,
  });

  if (isLoading || !user) {
    return (
      <div className="flex flex-col gap-4 w-full h-[536px]">
        <Skeleton className="w-[80%] h-24 mt-4" />
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex flex-col gap-4 w-full h-[536px]">
        <DashboardSectionHeader
          title="Latest Campaigns"
          pageUrl="/campaigns/latest"
        />
        <div className="w-full h-full flex items-center justify-center">
          <span>No data</span>
        </div>
      </div>
    );
  }

  const data = result.slice(0, 3);

  return (
    <div className="flex flex-col gap-4 w-full h-auto">
      <DashboardSectionHeader
        title="Latest Campaigns"
        pageUrl="/campaigns/latest"
      />
      <div className="w-full h-full grid lg:grid-cols-2 2xl:grid-cols-3 gap-8">
        {data.map((campaign, index) => (
          <CampaignCard key={index} campaign={campaign} />
        ))}
      </div>
    </div>
  );
}
