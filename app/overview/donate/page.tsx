"use client";
import DonationSummary from "@/components/custom/DonationSummary";
import ProposalsTable from "@/components/custom/ProposalsTable";

export default function DonatePage() {
  return (
    <div className="h-full flex flex-col px-6 py-12 gap-8 bg-accent-1/5">
      <DonationSummary />
      <ProposalsTable />
    </div>
  );
}
