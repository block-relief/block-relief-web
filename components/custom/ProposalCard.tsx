import { Proposal } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function ProposalCard({ proposal }: { proposal: Proposal }) {
  const amountLeft = proposal.requestedAmount - proposal.milestones[0].amount;
  const previewImageUrl = `/demo/campaign_${
    1 + Math.floor(3 * Math.random())
  }.png`;
  const organizationLogo = `/demo/org_logo_${
    1 + Math.floor(3 * Math.random())
  }.png`;

  return (
    <Link
      href={`/overview/donate/${proposal._id}`}
      className="relative w-[336px] h-auto max-h-[448px] rounded-xl shadow-sm overflow-hidden"
    >
      {/* Header */}

      <div className="absolute top-3 left-3 bg-black/30 text-white text-sm px-3 py-1 rounded-l flex items-center gap-2">
        {organizationLogo && (
          <Image
            src={organizationLogo}
            alt="logo"
            width={16}
            height={16}
            className="rounded-full"
          />
        )}
        {proposal.title}
      </div>

      {/* Preview Image */}
      <div className="relative w-full h-40">
        <Image
          src={previewImageUrl}
          alt="Campaign Preview"
          fill
          className="object-cover"
        />
      </div>

      {/* Description */}
      <div className="px-4 py-2">
        <p className="text-lg font-alata text-primary-foreground">
          {proposal.description}
        </p>
      </div>

      {/* Date */}
      <div className="px-4 py-2 text-sm text-secondary-foreground font-plusJakartaSans font-light">
        {new Date(proposal.createdAt).toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </div>

      {/* Stats */}
      <div className="flex justify-around px-4 py-3 bg-mint-100">
        <div className="text-center bg-secondary rounded-lg p-4">
          <div className="text-xs text-secondary-foreground">Goal</div>
          <div className="text-primary-foreground font-alata">
            ${proposal.requestedAmount.toLocaleString()}
          </div>
        </div>
        <div className="text-center bg-secondary rounded-lg p-4">
          <div className="text-xs text-secondary-foreground">Raised</div>
          <div className="text-primary-foreground font-alata">
            ${(proposal.requestedAmount - amountLeft).toLocaleString()}
          </div>
        </div>
        <div className="text-center bg-secondary rounded-lg p-4">
          <div className="text-xs text-secondary-foreground">Remaining</div>
          <div className="text-primary-foreground font-alata">
            ${amountLeft.toLocaleString()}
          </div>
        </div>
      </div>
    </Link>
  );
}
