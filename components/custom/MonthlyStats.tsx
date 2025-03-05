"use client";

import { monthlyStats } from "@/api/dummy";
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
import { Skeleton } from "../ui/skeleton";
import { ChartArea } from "lucide-react";
import { useAuth } from "@/hooks/AuthContext";
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function MonthlyStats() {
  const { user } = useAuth();
  const { result, isLoading, error } = useApiQuery({
    queryKey: ["monthly-stats"],
    queryFn: async () => monthlyStats(),
    retry: 3,
    enabled: !!user,
  });

  if (isLoading || !user) {
    return <Skeleton className="w-full h-full rounded-xl"></Skeleton>;
  }

  if (error || !result) {
    return (
      <div className="w-full h-full rounded-xl flex items-center justify-center">
        <span>Error</span>
      </div>
    );
  }

  const donationsData = result
    .map((amount, index) => ({
      month: months[index].slice(0, 3),
      amount,
    }))
    .slice(6);

  return (
    <Card className="w-full h-full flex-shrink-0 flex-grow-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ChartArea className="size-8" />
          <p className="pl-2">By Monthly Donations</p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={donationsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#34d399" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
