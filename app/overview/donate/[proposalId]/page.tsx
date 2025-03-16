"use client";
import useApiQuery from "@/hooks/useApiQuery";
import { format } from "date-fns";
import { proposal } from "@/api/dummy";
import { Loader } from "lucide-react";
import { AidRequest, Disaster, NGO, Proposal } from "@/types";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ProposalPage() {
  const { proposalId: id } = useParams();
  const { result, isLoading, error } = useApiQuery({
    queryKey: ["proposal", id],
    queryFn: () => proposal(id as string),
    retry: 2,
    enabled: typeof id == "string" && !!id,
  });

  if (isLoading) return <Loader className="mx-auto mt-12 animate-spin" />;
  if (error) return <></>;
  if (!result) return <></>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 text-primary-foreground">
      {/* Hero Section */}
      <div className="flex flex-col mb-8 w-full">
        <DamageReports disaster={result.disaster as Disaster} />
        <div className="mt-6">
          <h1 className="text-4xl font-bold">{result.title}</h1>
          <div className="mt-2 flex items-center gap-4">
            <span>By {(result.ngo as NGO).contactPerson.name}</span>
            <span>•</span>
            <span>{format(new Date(result.createdAt), "MMM dd, yyyy")}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <DisasterInfo disaster={result.disaster as Disaster} />

          <Section title="About this Proposal">
            <p className="leading-relaxed">{result.description}</p>
          </Section>

          <Section title="Milestones">
            <MilestonesList milestones={result.milestones} />
          </Section>

          {result.aidRequests.length > 0 && (
            <Section title="Associated Aid Requests">
              <AidRequestsList aidRequests={result.aidRequests} />
            </Section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <StatsCard
            requestedAmount={result.requestedAmount}
            deadline={result.deadline}
            status={result.status}
          />

          <NGOInfo ngo={result.ngo as NGO} />
        </div>
      </div>
      <div className="w-full flex justify-center py-12">
        <Link href="/overview/donate" className="btn-primary mt-8">
          <Button className="h-20 w-60 bg-accent-3 rounded-lg border text-lg font-semibold text-foreground shadow-lg">
            Donate Now
          </Button>
        </Link>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="w-full">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      {children}
    </section>
  );
}

function DamageReports({ disaster }: { disaster: Disaster }) {
  if (!disaster.damageReports.length) {
    return (
      <div className="h-64 bg-muted/50 rounded-lg flex items-center justify-center">
        No damage reports available
      </div>
    );
  }

  // src={`https://ipfs.io/ipfs/${report.ipfsCID}`}

  const imgUrl = `/demo/campaign_${1 + Math.floor(3 * Math.random())}.png`;

  return (
    <div className="flex items-center justify-center px-24">
      <Section title="Damage Documentation">
        <Carousel className="">
          <CarouselContent>
            {disaster.damageReports.map((report, idx) => (
              <CarouselItem
                key={idx}
                className="flex w-full h-[480px] justify-center items-center"
              >
                <Link href={imgUrl} className="relative h-[480px] w-full">
                  <Image
                    src={imgUrl}
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
      </Section>
    </div>
  );
}

function DisasterInfo({ disaster }: { disaster: Disaster }) {
  return (
    <div className="bg-card rounded-lg p-6 shadow-sm">
      <h3 className="text-xl font-semibold">{disaster.name}</h3>
      <div className="mt-2 flex gap-4 text-sm">
        <span>
          {disaster.location.city}, {disaster.location.country}
        </span>
        <span>•</span>
        <span>Severity: {disaster.severity}</span>
        <span>•</span>
        <span>
          Status: <span className="text-green-600">{disaster.status}</span>
        </span>
      </div>
    </div>
  );
}

function MilestonesList({
  milestones,
}: {
  milestones: Proposal["milestones"];
}) {
  return (
    <Card className="space-y-4">
      {milestones.map((milestone, idx) => (
        <div key={idx} className="bg-card p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">{milestone.description}</h4>
            <span
              className={`badge-${
                milestone.isCompleted ? "success" : "warning"
              }`}
            >
              {milestone.isCompleted ? "Completed" : "In Progress"}
            </span>
          </div>
          <div className="mt-2">
            <ProgressBar
              allocated={milestone.fundsAllocated}
              released={milestone.fundsReleased}
              total={milestone.amount}
            />
          </div>
        </div>
      ))}
    </Card>
  );
}

function ProgressBar({
  allocated,
  released,
  total,
}: {
  allocated: number;
  released: number;
  total: number;
}) {
  const allocatedWidth = (allocated / total) * 100;
  const releasedWidth = (released / total) * 100;

  return (
    <div className="relative h-4 rounded-full overflow-hidden">
      <div
        className="absolute h-full bg-warning"
        style={{ width: `${allocatedWidth}%` }}
      />
      <div
        className="absolute h-full bg-success"
        style={{ width: `${releasedWidth}%` }}
      />
    </div>
  );
}

function StatsCard({
  requestedAmount,
  deadline,
  status,
}: {
  requestedAmount: number;
  deadline: Date;
  status: string;
}) {
  return (
    <Card className="p-6 rounded-lg shadow-sm text-foreground">
      <h3 className="text-lg font-semibold mb-4">Campaign Details</h3>
      <dl className="space-y-3">
        <StatItem
          label="Requested Amount"
          value={`$${requestedAmount.toLocaleString()}`}
        />
        <StatItem
          label="Deadline"
          value={format(new Date(deadline), "MMM dd, yyyy")}
        />
        <StatItem label="Status">
          <span className={`text-green-500 badge-${status.toLowerCase()}`}>
            {status}
          </span>
        </StatItem>
      </dl>
    </Card>
  );
}

function StatItem({
  label,
  value,
  children,
}: {
  label: string;
  value?: string | number;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex justify-between items-center">
      <dt className="">{label}</dt>
      <dd className="font-medium">{children || value}</dd>
    </div>
  );
}

function NGOInfo({ ngo }: { ngo: NGO }) {
  return (
    <div className="bg-card p-6 rounded-lg shadow-sm">
      <div className="flex items-center gap-4">
        <Image
          src={ngo.logo}
          alt={ngo.contactPerson.name}
          width={64}
          height={64}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold">{ngo.contactPerson.name}</h3>
          <p className="text-sm">{ngo.registrationNumber}</p>
        </div>
      </div>
      <div className="mt-4 space-y-2 text-sm">
        <p className="">{ngo.address}</p>
        <p className="">{ngo.contactPerson.email}</p>
        <p className="">{ngo.contactPerson.phone}</p>
      </div>
    </div>
  );
}

function AidRequestsList(props: { aidRequests: Proposal["aidRequests"] }) {
  const aidRequests = props.aidRequests as AidRequest[];
  return (
    <div className="grid gap-4">
      {aidRequests.map((request, idx) => (
        <div key={idx} className="bg-card p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium">{request.description}</h4>
              <div className="mt-1 text-sm">
                {request.items.map((item, idx) => (
                  <span key={idx} className="mr-2">
                    {item.quantity}x {item.type}
                  </span>
                ))}
              </div>
            </div>
            <span className={`badge-${request.urgency}`}>
              {request.urgency}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
