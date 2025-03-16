import Image from "next/image";

interface TeamMemberCardProps {
  member: {
    id: string;
    name: string;
    photoUrl: string;
    role: string;
  };
}

export default function TeamMemberCard({
  member: { name, photoUrl, role },
}: TeamMemberCardProps) {
  return (
    <div className="py-[30px] px-2.5 w-full sm:w-[303px] h-[370px] flex flex-col items-center text-center gap-2">
      <div className="w-[263px] h-[300px] flex items-center justify-center">
        <Image
          src={photoUrl}
          alt={name}
          width={240}
          height={240}
          className="rounded-lg"
        />
      </div>
      <p className="text-2xl text-primary-foreground font-alata">{name}</p>
      <p className="text-base leading-7 text-secondary-foreground font-plusJakartaSans">
        {role}
      </p>
    </div>
  );
}
