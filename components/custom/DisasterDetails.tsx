"use client";
import { Disaster } from "@/types";
import useApiQuery from "@/hooks/useApiQuery";
import { format } from "date-fns";
import { disasterProposals } from "@/api/dummy";
import { Card } from "@/components/ui/card";
import { MapPin, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { SeverityBadge, StatusBadge } from "./DisasterCard";

export default function DisasterDetails({ disaster }: { disaster: Disaster }) {
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
}

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
