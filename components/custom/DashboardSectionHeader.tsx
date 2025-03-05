import Link from "next/link";

export default function DashboardSectionHeader({
  title,
  pageUrl,
}: {
  title: string;
  pageUrl: string;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-shrink-0 flex-grow-0">
      <p className="font-alata text-2xl text-primary-foreground text-left">
        {title}
      </p>
      <Link
        href={pageUrl}
        className="text-accent-3 font-semibold font-plusJakartaSans text-right "
      >
        <span className="rounded-lg border border-accent-3 py-4 px-8 hover:bg-accent-3 hover:text-white transition-colors">
          See More
        </span>
      </Link>
    </div>
  );
}
