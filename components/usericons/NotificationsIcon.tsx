import { LocalUser } from "@/types";
import { Skeleton } from "../ui/skeleton";
import { Bell, Badge } from "lucide-react";

export function NotificationsIcon({}: { user: LocalUser }) {
  // will handle if it should be belldot or bell based on user notifications
  return (
    <div className="relative">
      <Bell className="h-5 w-5" />
      <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] rounded-full bg-emerald-500 text-white">
        1
      </Badge>
    </div>
  );
}

export function NotificationsIconLoading() {
  return <Skeleton className="rounded-full size-6 border border-primary" />;
}
