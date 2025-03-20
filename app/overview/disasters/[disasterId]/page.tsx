"use client";
import { useEffect } from "react";
import { toast } from "react-toastify";
import useApiQuery from "@/hooks/useApiQuery";
import { disaster } from "@/api/dummy";
import { Loader2 } from "lucide-react";
import DisasterDetails from "@/components/custom/DisasterDetails";
import { useParams } from "next/navigation";

export default function DisasterPage() {
  const { disasterId } = useParams();
  const { result, isLoading, error } = useApiQuery({
    queryKey: ["disaster", disasterId],
    queryFn: () => disaster(disasterId! as string),
    retry: 2,
    enabled: !!disasterId && typeof disasterId === "string",
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader2 className="size-8 animate-spin" />
      </div>
    );
  }

  if (!result) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-2xl text-accent-2">Disaster not found</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col py-8 px-4">
      <DisasterDetails disaster={result} />
    </div>
  );
}
