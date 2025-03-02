import Image from "next/image";

interface FeatureCardProps {
  feature: { title: string; description: string; icon: string };
}

export default function FeatureCard({
  feature: { title, description, icon },
}: FeatureCardProps) {
  return (
    <div className="p-5 pb-2.5 pt-[30px] justify-between w-full sm:w-[303px] h-[340px] flex flex-col flex-shrink-0">
      <p className="text-4xl font-normal text-primary-foreground font-alata">
        {title}
      </p>
      <p className="text-base leading-7 font-normal text-secondary-foreground font-plusJakartaSans">
        {description}
      </p>
      <div className="flex justify-start items-end w-full h-auto">
        <Image
          src={icon}
          alt={title}
          width={232}
          height={232}
          className="rounded-lg w-full h-auto"
        />
      </div>
    </div>
  );
}
