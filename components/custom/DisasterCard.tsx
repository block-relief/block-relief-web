import { ImageIcon, MapPin } from "lucide-react";
import { Card } from "../ui/card";
import { Disaster } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function DisasterCard({ disaster }: { disaster: Disaster }) {
  //const thumbnail = `https://ipfs.io/ipfs/${disaster.damageReports[0]?.ipfsCID}` || "";
  const thumbnail = `/demo/campaign_${1 + Math.floor(3 * Math.random())}.png`;

  return (
    <Link href={`/overview/disasters/${disaster._id}`} className="grid">
      <Card className="hover:shadow-lg transition-shadow">
        <div className="flex gap-6 p-6">
          {/* Thumbnail */}
          <div className="relative w-32 h-32 flex-shrink-0 bg-muted rounded-lg overflow-hidden">
            {thumbnail ? (
              <Image
                src={thumbnail}
                alt={disaster.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <ImageIcon className="w-8 h-8 text-muted-foreground" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">{disaster.name}</h3>
                <div className="flex items-center gap-4 mt-2 text-sm">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>
                      {disaster.location.city}, {disaster.location.country}
                    </span>
                  </div>
                  <span>•</span>
                  <span className="capitalize">
                    {disaster.type.toLowerCase()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <StatusBadge status={disaster.status} />
              <SeverityBadge severity={disaster.severity} />
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}

export const StatusBadge = ({ status }: { status: string }) => (
  <span
    className={`px-2 py-1 rounded-full text-xs font-medium ${
      status.toLowerCase() === "active"
        ? "bg-green-100 text-green-800"
        : "bg-gray-100 text-gray-800"
    }`}
  >
    {status}
  </span>
);

export const SeverityBadge = ({ severity }: { severity: string }) => (
  <span
    className={`px-2 py-1 rounded-full text-xs font-medium ${
      severity.toLowerCase() === "high"
        ? "bg-red-100 text-red-800"
        : severity.toLowerCase() === "medium"
          ? "bg-yellow-100 text-yellow-800"
          : "bg-gray-100 text-gray-800"
    }`}
  >
    {severity} Severity
  </span>
);
