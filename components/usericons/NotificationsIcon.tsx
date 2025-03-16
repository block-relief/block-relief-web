import { User } from "@/types";
import { Skeleton } from "../ui/skeleton";
import { Bell } from "lucide-react";

export function NotificationsIcon({}: { user: User }) {
  // will handle if it should be belldot or bell based on user notifications
  return (
    <div className="relative">
      <Bell className="size-8" />
      <div className="absolute bottom-[50%] left-[50%]">
        <div className="flex items-center justify-center min-w-[2rem] min-h-[2rem] aspect-square px-1 text-xs font-bold text-primary bg-accent-1 rounded-full">
          99+
        </div>
      </div>
    </div>
  );
}

export function NotificationsIconLoading() {
  return <Skeleton className="rounded-full size-6 border border-primary" />;
}
