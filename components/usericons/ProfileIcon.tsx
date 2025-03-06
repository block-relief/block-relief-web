import { LocalUser } from "@/types";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";

export function ProfileIcon({ user }: { user: LocalUser }) {
  const defaultAvatar = "/avatar.png";

  return (
    <Image
      src={user.photoUrl || defaultAvatar}
      onError={(e) => (e.currentTarget.src = defaultAvatar)}
      width={48}
      height={48}
      alt="Profile Icon"
      title={user.username}
      className="rounded-full cursor-pointer border border-primary"
    />
  );
}

export function ProfileIconLoading() {
  return <Skeleton className="rounded-full size-12 border border-primary" />;
}
