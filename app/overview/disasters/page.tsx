"use client";
import useApiQuery from "@/hooks/useApiQuery";
import { disasters } from "@/api/dummy";
import { AlertCircle, Loader } from "lucide-react";
import DisastersTable from "@/components/custom/DisastersTable";
import DisasterDetails from "@/components/custom/DisasterDetails";

export default function DisastersPage() {
  return (
    <div className="h-full flex flex-col px-6 py-12 gap-8 bg-accent-1/5">
      <FeaturedDisasters />
      <DisastersTable />
    </div>
  );
}

const FeaturedDisasters = () => {
  const limit = 3;
  const sort = "Newest";
  const filter = "Active";
  const { result, isLoading, error } = useApiQuery({
    queryKey: ["disasters", limit, sort, filter],
    queryFn: () => disasters({ limit, sort, filter }),
    retry: 2,
  });

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg flex items-center gap-2 text-red-700">
        <AlertCircle className="w-5 h-5" />
        <span>Failed to load featured disasters</span>
      </div>
    );
  }

  return (
    <section className="relative mb-12 space-y-8">
      <h2 className="text-3xl font-bold">Active Disaster Relief Efforts</h2>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center size-full min-h-72">
          <Loader className="size-8 animate-spin" />
        </div>
      )}
      <div className="grid gap-8 grid-cols-1">
        {result?.data.map((disaster, idx) => (
          <DisasterDetails key={idx} disaster={disaster} />
        ))}
      </div>
    </section>
  );
};
