"use client";
import DonationsTable from "@/components/custom/DonationsTable";
import DonationSummary from "@/components/custom/DonationSummary";
import { useAuth } from "@/hooks/AuthContext";
import { Loader2 } from "lucide-react";

export default function Donations() {
  const { user, isLoading, error } = useAuth();

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        {/* Blank page */}
      </div>
    );
  }

  if (!user.roles.includes("ngo")) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        {/* Blank page */}
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col px-6 py-12 gap-8 bg-accent-1/5">
      <DonationSummary />
      <DonationsTable />
    </div>
  );
}
