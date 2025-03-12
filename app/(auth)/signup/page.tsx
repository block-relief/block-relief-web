import SignupForm from "@/components/forms/SignupForm";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <>
      <div className="h-full min-h-[480px] flex flex-col items-start justify-center gap-3 ml-12 mt-6">
        <p className="text-[56px] leading-[65px] font-normal font-alata w-[453px]">
          Get Started
        </p>
        <p className="text-base font-plusJakartaSans w-[462px] ml-1">
          Sign up to an account and start making impact .
        </p>
        <Link
          href="./login"
          className="text-base font-plusJakartaSans font-semibold px-8 py-2 border rounded-lg mt-4"
        >
          Log In instead
        </Link>
      </div>
      <div className="h-full lg:col-span-2 flex items-center justify-center mx-12 p-8">
        <SignupForm />
      </div>
    </>
  );
}
