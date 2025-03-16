"use client";
import { Disaster } from "@/types";
import useApiQuery from "@/hooks/useApiQuery";
import { format } from "date-fns";
import { disasterProposals, disasters } from "@/api/dummy";
import { Card } from "@/components/ui/card";
import { Loader, AlertCircle, MapPin, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import DisastersTable, {
  SeverityBadge,
  StatusBadge,
} from "@/components/custom/DisastersTable";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

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

  if (error) return <ErrorAlert message="Failed to load featured disasters" />;

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
          <FeaturedDisasterCard key={idx} disaster={disaster} />
        ))}
      </div>
    </section>
  );
};

const FeaturedDisasterCard = ({ disaster }: { disaster: Disaster }) => {
  //const thumbnail = `https://ipfs.io/ipfs/${disaster.damageReports[0]?.ipfsCID}` || "";
  const thumbnail = `/demo/campaign_${1 + Math.floor(3 * Math.random())}.png`;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-[360px] bg-muted px-16">
        {thumbnail ? (
          <Carousel className="">
            <CarouselContent>
              {disaster.damageReports.map((report, idx) => (
                <CarouselItem
                  key={idx}
                  className="flex w-full h-[360px] justify-center items-center"
                >
                  <Link href={thumbnail} className="relative h-[360px] w-full">
                    <Image
                      src={thumbnail}
                      alt="Damage report"
                      fill
                      style={{ objectFit: "contain" }}
                    />
                    <div className="absolute top-2 right-2 bg-background/80 px-2 py-1 rounded text-sm">
                      {report.name}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-8">
                      <p className="text-xs text-muted-foreground">
                        Uploaded:{" "}
                        {format(new Date(report.uploadedAt), "MMM dd, yyyy")}
                      </p>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        ) : (
          <div className="flex items-center justify-center h-full">
            <ImageIcon className="w-12 h-12 text-muted-foreground" />
          </div>
        )}
      </div>

      <div className="p-6 space-y-4">
        <h3 className="text-xl font-semibold">{disaster.name}</h3>
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="w-4 h-4" />
          <span>
            {disaster.location.city}, {disaster.location.country}
          </span>
        </div>

        <div className="flex gap-4">
          <StatusBadge status={disaster.status} />
          <SeverityBadge severity={disaster.severity} />
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Estimated Damage</p>
            <p className="font-medium">
              ${disaster.totalEstimatedDamage.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Verified Damage</p>
            <p className="font-medium">
              ${disaster.totalVerifiedDamage.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Last Updated</p>
              <p>{new Date(disaster.updatedAt).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Reported By</p>
              <p>
                {typeof disaster.reportedBy === "string"
                  ? disaster.reportedBy
                  : disaster.reportedBy?.profile.name}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-4 p-4">
        <ProposalsList disasterId={disaster._id} />
      </div>
    </Card>
  );
};

const ProposalsList = ({ disasterId }: { disasterId: string }) => {
  const { result, isLoading } = useApiQuery({
    queryKey: ["disaster-proposals", disasterId],
    queryFn: () => disasterProposals({ disasterId }),
  });

  return (
    <div className="mt-4">
      <h4 className="font-medium mb-2">Related Proposals</h4>
      <div className="space-y-3">
        {isLoading ? (
          <div className="p-3 bg-muted rounded-lg">
            <Skeleton className="w-full h-16" />
          </div>
        ) : (
          result?.map((proposal, idx) => (
            <div key={idx} className="p-3 bg-muted rounded-lg">
              <h5 className="font-medium">{proposal.title}</h5>
              <div className="flex items-center gap-4 text-sm">
                <span>
                  Requested: ${proposal.requestedAmount.toLocaleString()}
                </span>
                <span>•</span>
                <span className={`badge-${proposal.status.toLowerCase()}`}>
                  {proposal.status}
                </span>
              </div>
            </div>
          ))
        )}
        {!result?.length && (
          <p className="text-muted-foreground">No related proposals</p>
        )}
      </div>
    </div>
  );
};

const ErrorAlert = ({ message }: { message: string }) => (
  <div className="bg-red-50 p-4 rounded-lg flex items-center gap-2 text-red-700">
    <AlertCircle className="w-5 h-5" />
    <span>{message}</span>
  </div>
);
