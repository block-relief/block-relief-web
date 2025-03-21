import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed inset-0  bg-noisyGradient flex justify-between items-center h-[92px] w-full px-12 py-6 z-50">
      <Link href="/">
        <div className="text-primary text-xl font-semibold">DERA</div>
      </Link>
      <Link href="/overview">
        {/* Intentionally set to overview. Will redirect to login if needed and back to overview */}
        <span className="text-primary border border-primary px-4 py-2 rounded">
          Get started
        </span>
      </Link>
    </header>
  );
}
