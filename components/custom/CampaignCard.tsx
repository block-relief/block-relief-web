import { Campaign } from "@/types";
import Image from "next/image";

export default function CampaignCard({
  campaign: {
    title,
    description,
    previewImageUrl,
    dateStarted,
    targetAmount,
    raisedAmount,
    organizationLogo,
  },
}: {
  campaign: Campaign;
}) {
  const amountLeft = targetAmount - raisedAmount;

  return (
    <div className="relative w-[336px] h-auto max-h-[448px] rounded-xl border shadow-sm overflow-hidden">
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
        {title}
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
          {description}
        </p>
      </div>

      {/* Date */}
      <div className="px-4 py-2 text-sm text-secondary-foreground font-plusJakartaSans font-light">
        {new Date(dateStarted).toLocaleDateString(undefined, {
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
            ${targetAmount.toLocaleString()}
          </div>
        </div>
        <div className="text-center bg-secondary rounded-lg p-4">
          <div className="text-xs text-secondary-foreground">Raised</div>
          <div className="text-primary-foreground font-alata">
            ${raisedAmount.toLocaleString()}
          </div>
        </div>
        <div className="text-center bg-secondary rounded-lg p-4">
          <div className="text-xs text-secondary-foreground">Remaining</div>
          <div className="text-primary-foreground font-alata">
            ${amountLeft.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}
