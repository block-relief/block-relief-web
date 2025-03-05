import Link from "next/link";

export default function DashboardSectionHeader({
  title,
  pageUrl,
}: {
  title: string;
  pageUrl: string;
}) {
  return (
    <div className="h-auto flex items-center justify-between flex-shrink-0 flex-grow-0">
      <p className="font-alata text-2xl text-primary-foreground text-left">
        {title}
      </p>
      <Link
        href={pageUrl}
        className="text-accent-3 font-semibold font-plusJakartaSans"
      >
        <p className="rounded-lg border border-accent-3 py-4 px-8">See More</p>
      </Link>
    </div>
  );
}
