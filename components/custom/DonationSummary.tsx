"use client";
import { donationsSummary } from "@/api/dummy";
import useApiQuery from "@/hooks/useApiQuery";
import { Skeleton } from "../ui/skeleton";
import { Flag, HandCoins, HandHeart } from "lucide-react";
import { useAuth } from "@/hooks/AuthContext";

export default function DonationSummary() {
  const { user } = useAuth();
  const { result, isLoading, error } = useApiQuery({
    queryKey: ["donations"],
    queryFn: async () => donationsSummary(),
    retry: 3,
    enabled: !!user,
  });

  if (isLoading || !user) {
    return (
      <div className="w-full grid grid-cols-3 gap-8 h-[120px]">
        <Skeleton className="h-full w-full rounded-lg" />
        <Skeleton className="h-full w-full rounded-lg" />
        <Skeleton className="h-full w-full rounded-lg" />
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="w-full grid grid-cols-3 gap-8 h-[120px]">
        <div className="h-full w-full rounded-lg" />
        <div className="h-full w-full rounded-lg" />
        <div className="h-full w-full rounded-lg" />
      </div>
    );
  }

  const data = [
    {
      title: "Total Donations",
      icon: HandCoins,
      value: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(result.amount),
    },
    { title: "Campaigns", icon: Flag, value: result.campaigns.toString() },
    {
      title: "Impacted Lives",
      icon: HandHeart,
      value: result.beneficiaries.toString(),
    },
  ];

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[120px]">
      {data.map((item, index) => (
        <div
          key={index}
          className="flex items-center px-8 py-6 gap-2.5 bg-secondary rounded-lg shadow-md"
        >
          <div className="size-[72px] bg-accent-2 flex items-center justify-center rounded-full">
            <item.icon className="size-12" />
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-semibold font-plusJakartaSans text-[14px] text-accent-1 leading-[18px]">
              {item.title}
            </p>
            <p className="text-2xl text-primary-foreground font-semibold">
              {item.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
