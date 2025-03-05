"use client";
import Link from "next/link";
import PageGradient from "../custom/HeroGradient";
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

export default function OverviewHeader() {
  const { user, isLoading } = useAuth();
  const [, setSearch] = useQueryState<string>(
    "search",
    parseAsString.withDefault(""),
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearch(e.currentTarget.value);
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
    <header className="relative w-full h-[122px] flex items-center justify-between px-12 py-4 border-b border-muted/50">
      {/* Left Section - Logo & search*/}
      <div className="flex w-auto gap-16 lg:gap-48 max-w-[72%] justify-between">
        <Link
          href="/"
          className="h-[50px] w-full flex items-center text-2xl leading-[24px] font-bold tracking-tight text-primary"
        >
          DERA
        </Link>

        <div className="relative h-[50px] hidden sm:block">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Search className="size-[30px]" />
          </div>
          <Input
            type="text"
            placeholder="Search campaigns, NGOs..."
            className="pl-14 bg-emerald-50 w-64 md:w-72 h-full focus-visible:ring-0 placeholder:text-[14px] placeholder:leading-[14px] placeholder:font-plusJakartaSans"
            onKeyDown={handleKeyDown}
          />
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
      <PageGradient />
    </header>
  );
}
