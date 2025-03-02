import Link from "next/link";
import PageGradient from "../custom/HeroGradient";

export default function Header({ button }: { button?: "login" | "signup" }) {
  return (
    <header className="fixed inset-0 flex justify-between items-center h-[92px] w-full px-12 py-6 z-50">
      <PageGradient />
      <div className="text-primary text-xl font-semibold">DERA</div>
      {button === "signup" ? (
        <Link href="/signup">
          <span className="text-primary border border-primary px-4 py-2 rounded">
            Sign Up
          </span>
        </Link>
      ) : button === "login" ? (
        <Link href="/login">
          <span className="text-primary border border-primary px-4 py-2 rounded">
            Log in
          </span>
        </Link>
      ) : (
        <></>
      )}
    </header>
  );
}
