"use client";
import { recommendedCampaigns } from "@/api/dummy";
import { useAuth } from "@/hooks/AuthContext";
import useApiQuery from "@/hooks/useApiQuery";
import DashboardSectionHeader from "../custom/DashboardSectionHeader";
import { Skeleton } from "../ui/skeleton";
import CampaignCard from "../custom/CampaignCard";

export default function RecommendedCampaigns() {
  const { user } = useAuth();
  const { result, isLoading } = useApiQuery({
    queryKey: ["recommended-campaigns"],
    queryFn: async () => recommendedCampaigns(),
    retry: 3,
    enabled: !!user,
  });

  if (isLoading || !user) {
    return (
      <div className="w-full h-[536px]">
        <DashboardSectionHeader
          title="Recommended Campaigns"
          pageUrl="/campaigns/recommended"
        />
        <Skeleton className="w-[80%] h-24 mt-4" />
      </div>
    );
  }

  if (!result) {
    return (
      <div className="w-full h-[536px]">
        <DashboardSectionHeader
          title="Recommended Campaigns"
          pageUrl="/campaigns/recommended"
        />
        <div className="w-full h-240 flex items-center justify-center">
          <span>No data</span>
        </div>
      </div>
    );
  }

  const data = result.slice(0, 3);

  return (
    <div className="flex flex-col gap-4 w-full h-auto bg-slate-500">
      <DashboardSectionHeader
        title="Recommended Campaigns"
        pageUrl="/campaigns/recommended"
      />
      <div className="w-full h-full grid lg:grid-cols-2 2xl:grid-cols-3 gap-8">
        {data.map((campaign, index) => (
          <CampaignCard key={index} campaign={campaign} />
        ))}
      </div>
    </div>
  );
}
