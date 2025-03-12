import { LocalUser } from "@/types";
import { Skeleton } from "../ui/skeleton";
import { Settings } from "lucide-react";

export function SettingsIcon({}: { user: LocalUser }) {
  // will handle if it should be dotted or not based on user settings
  return <Settings className="size-8" />;
}

export function SettingsIconLoading() {
  return <Skeleton className="rounded-full size-8 border border-primary" />;
}
