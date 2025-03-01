interface SectionHeaderProps {
  title: string;
  subtitle: string;
  description: string;
}

export default function SectionHeader({
  title,
  subtitle,
  description,
}: SectionHeaderProps) {
  return (
    <div className="p-2.5 flex flex-col justify-between w-full sm:w-[297px] h-[340px]">
      <p className="font-normal text-base text-accent-1 text-left font-plusJakartaSans">
        {title}
      </p>
      <p className="font-normal text-5xl text-primary-foreground text-left font-alata">
        {subtitle}
      </p>
      <p className="font-normal text-base leading-7 text-secondary-foreground text-left font-plusJakartaSans">
        {description}
      </p>
    </div>
  );
}
