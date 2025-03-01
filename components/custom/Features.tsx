import Image from "next/image";

interface FeatureCardProps {
  title: string;
  description: string;
  demo_photo: string;
}

export default function FeatureCard({
  title,
  description,
  demo_photo,
}: FeatureCardProps) {
  return (
    <div className="p-5 pb-2.5 flex flex-col justify-between w-full sm:w-[303px] h-[340px]">
      <p className="text-4xl font-normal text-primary-foreground font-alata">
        {title}
      </p>
      <p className="text-base leading-7 font-normal text-secondary-foreground font-plusJakartaSans">
        {description}
      </p>
      <div className="">
        <Image
          src={demo_photo}
          alt={title}
          width={263}
          height={300}
          layout="intrinsic"
          className="rounded-lg"
        />
      </div>
    </div>
  );
}
