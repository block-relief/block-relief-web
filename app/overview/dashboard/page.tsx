import DonationSummary from "@/components/custom/DonationSummary";
import LocationStats from "@/components/custom/LocationStats";
import MonthlyStats from "@/components/custom/MonthlyStats";
import LatestCampaigns from "@/components/sections/LatestCampaigns";
import RecommendedCampaigns from "@/components/sections/RecommendedCampaigns";

export default function DashboardPage() {
  return (
    <div className="h-full flex flex-col px-6 py-12 gap-8">
      <DonationSummary />
      <div className="w-full h-auto grid xl:grid-cols-2 gap-8 flex-shrink-0 flex-grow-0 bg-fuchsia-300">
        <MonthlyStats />
        <LocationStats />
      </div>
      <RecommendedCampaigns />
      <LatestCampaigns />
    </div>
  );
}
