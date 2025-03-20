import DonationSummary from "@/components/custom/DonationSummary";
import TransactionsTable from "@/components/custom/TransactionsTable";

export default function TransactionsPage() {
  return (
    <div className="h-full flex flex-col px-6 py-12 gap-8 bg-accent-1/5">
      <DonationSummary />
      <TransactionsTable />
    </div>
  );
}
