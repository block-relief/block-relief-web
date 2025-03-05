"use client";

import { locationStats } from "@/api/dummy";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useApiQuery from "@/hooks/useApiQuery";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRightIcon, ChartPieIcon } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/hooks/AuthContext";

export default function LocationStats() {
  const { user } = useAuth();
  const { result, isLoading, error } = useApiQuery({
    queryKey: ["location-stats"],
    queryFn: async () => locationStats(),
    retry: 3,
    enabled: !!user,
  });

  if (isLoading || !user) {
    return <Skeleton className="w-full h-full rounded-xl" />;
  }

  if (error || !result) {
    return (
      <div className="w-full h-full rounded-xl flex items-center justify-center">
        <span>Error</span>
      </div>
    );
  }

  // Sort by totalDonations (largest first) and take the top 7 countries
  const sortedStats = result.sort(
    (a, b) => b.totalDonations - a.totalDonations,
  );
  const topCountries = sortedStats.slice(0, 7);

  // Helper for formatting donation amounts in USD
  const formatUSD = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <Card className="w-full h-full flex-shrink-0 flex-grow-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ChartPieIcon className="w-6 h-6" />
          <p>Top 7 Countries by Donations</p>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {/* Bar Chart */}
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={topCountries}
            layout="vertical"
            margin={{ left: 50, right: 50, top: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              tickFormatter={(value) => formatUSD(Number(value))}
            />
            <YAxis type="category" dataKey="country" width={80} />
            <Tooltip formatter={(value) => formatUSD(Number(value))} />
            <Bar
              dataKey="totalDonations"
              fill="#34d399"
              radius={[4, 4, 4, 4]}
            />
          </BarChart>
        </ResponsiveContainer>

        {/* Custom Legend */}
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(96px,_1fr))] gap-x-2 gap-y-4">
          {topCountries.map((stat, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between border-b border-gray-200 py-1"
            >
              <Image
                src={`https://flagcdn.com/24x18/${stat.country.code.toLowerCase()}.png`}
                alt={`${stat.country.code} flag`}
                className="w-6 h-[18px]"
                width={24}
                height={18}
              />
              <ArrowRightIcon className="w-4 h-4" />
              <span>{formatUSD(stat.totalDonations)}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
