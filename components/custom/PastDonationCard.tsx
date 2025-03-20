import { DonationTransaction } from "@/types";
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "./Progress";
import Link from "next/link";
import { useAuth } from "@/hooks/AuthContext";

export default function PastDonation({
  donation: { proposal, ngo, amount, currency, donor },
}: {
  donation: DonationTransaction;
}) {
  const { user } = useAuth();
  const daysLeft = Math.ceil(
    (new Date(proposal.deadline).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24),
  );
  const progress = Math.min(
    (proposal.milestones.reduce(
      (acc, milestone) => acc + milestone.fundsReleased,
      0,
    ) /
      proposal.requestedAmount) *
      100,
    100,
  );

  return (
    <Card className="bg-gradient p-6 rounded-xl text-primary flex flex-col md:flex-row items-center justify-between">
      {/* Left section - Campaign details */}
      <div className="flex flex-col space-y-2">
        <span className="text-sm">{daysLeft} days left</span>
        <h2 className="text-2xl font-bold">{proposal.title}</h2>
        <p className="text-sm">{proposal.description}</p>
        <p className="text-sm">NGO: {ngo._id}</p>

        {user?._id == donor._id ? (
          <>
            <p className="text-sm">
              You donated {currency} {amount.toLocaleString()}
            </p>
          </>
        ) : (
          <>
            <p className="text-sm">Donor: {donor.profile.name}</p>
            <p className="text-sm">
              Amount Donated: {currency} {amount.toLocaleString()}
            </p>
          </>
        )}
        <Link href={`/overview/donate/${proposal._id}`}>
          <Button variant="link" className="mt-2 text-sm underline">
            See details
          </Button>
        </Link>
      </div>

      {/* Right section - Progress indicator */}
      <div className="mt-6 md:mt-0 flex flex-col items-center">
        <Progress value={progress} className="w-24 h-24" />
        <span className="text-lg font-bold mt-2">{progress}%</span>
        <span className="text-sm mt-2">of Goal</span>
      </div>
    </Card>
  );
}
