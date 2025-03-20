"use client";
import Link from "next/link";
import { Input } from "../ui/input";
import {
  ProfileIcon,
  NotificationsIcon,
  SettingsIcon,
} from "@/components/usericons";
import { useQueryState, parseAsString } from "nuqs";
import { useAuth } from "@/hooks/AuthContext";
import Header from "./Header";
import { Search } from "lucide-react";
import { useRef } from "react";

export default function OverviewHeader() {
  const { user, isLoading } = useAuth();
  const [, setSearch] = useQueryState<string>(
    "search",
    parseAsString.withDefault(""),
  );
  const searchRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (key: string) => {
    if (key === "Enter") {
      setSearch(searchRef.current?.value || "");
    }
  };

  // Optionally display a loading placeholder while auth state is in progress
  if (isLoading || !user) {
    return (
      <header className="w-full h-[92px] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-muted/50"></header>
    );
  }

  // Fallback header for guest users—adjust as needed
  if (!user) {
    return <Header />;
  }

  return (
    <header className="w-full h-[122px] text-primary bg-noisyGradient flex items-center justify-between px-12 py-4 border-b border-muted/50">
      {/* Left Section - Logo & search*/}
      <div className="flex w-auto gap-16 lg:gap-48 max-w-[72%] justify-between">
        <Link
          href="/"
          className="h-[50px] w-full flex items-center text-2xl leading-[24px] font-bold tracking-tight"
        >
          DERA
        </Link>

        <div className="relative h-[50px] hidden sm:block">
          <Input
            type="text"
            ref={searchRef}
            placeholder="Search campaigns, NGOs..."
            className="pr-14 bg-primary text-primary-foreground w-64 md:w-72 h-full focus-visible:ring-0 placeholder:text-[14px] placeholder:leading-[14px] placeholder:font-plusJakartaSans"
            onKeyDown={(e) => handleKeyDown(e.key)}
          />
          <div
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer"
            onClick={() => handleKeyDown("Enter")}
          >
            <Search className="size-[30px]" />
          </div>
        </div>
      </div>
      {/* Right Section - Navigation Icons */}
      <nav className="flex items-center gap-4 sm:gap-6">
        <Link
          href="/notifications"
          className="p-2 hover:text-primary transition-colors"
          aria-label="View notifications"
        >
          <NotificationsIcon user={user} />
        </Link>
        <Link
          href="/settings"
          className="p-2 hover:text-primary transition-colors"
          aria-label="View settings"
        >
          <SettingsIcon user={user} />
        </Link>
        <Link
          href="/profile"
          className="p-2 hover:text-primary transition-colors"
          aria-label="View profile"
        >
          <ProfileIcon user={user} />
        </Link>
      </nav>
    </header>
  );
}
