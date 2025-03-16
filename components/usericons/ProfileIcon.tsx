import { User } from "@/types";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";

export function ProfileIcon({ user }: { user: User }) {
  const defaultAvatar = "/avatar.svg";

  return (
    <Image
      src={defaultAvatar}
      onError={(e) => (e.currentTarget.src = defaultAvatar)}
      width={48}
      height={48}
      alt="Profile Icon"
      title={user.profile.name}
      className="rounded-full cursor-pointer border border-primary"
    />
  );
}

export function ProfileIconLoading() {
  return <Skeleton className="rounded-full size-12 border border-primary" />;
}
