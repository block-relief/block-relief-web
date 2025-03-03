"use client";
import Link from "next/link";
import PageGradient from "../custom/HeroGradient";
import { ProfileIcon, ProfileIconLoading } from "../custom/ProfileIcon";
import useUser from "@/hooks/useUser";

export default function Header() {
  const { user, isLoading } = useUser();
  return (
    <header className="fixed inset-0 flex justify-between items-center h-[92px] w-full px-12 py-6 z-50">
      <PageGradient />
      <Link href="/">
        <div className="text-primary text-xl font-semibold">DERA</div>
      </Link>
      {isLoading ? (
        <ProfileIconLoading />
      ) : !!user ? (
        <Link href="/login">
          <ProfileIcon user={user} />
        </Link>
      ) : (
        <Link href="/dashboard">
          {/* Intentionally set to dashboard. Will redirect to login if needed and back to dashboard */}
          <span className="text-primary border border-primary px-4 py-2 rounded">
            Log in
          </span>
        </Link>
      )}
    </header>
  );
}
