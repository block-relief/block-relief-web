import LoginForm from "@/components/forms/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <div className="h-full flex flex-col items-start justify-center gap-3 ml-12 mt-6">
        <p className="text-[56px] leading-[65px] font-normal font-alata w-[453px]">
          Welcome Back
        </p>
        <p className="text-base font-plusJakartaSans w-[462px] ml-1">
          Login to your account, and continue to make impact
        </p>
        <Link
          href="./signup"
          className="text-base font-plusJakartaSans font-semibold px-8 py-2 border rounded-lg mt-4"
        >
          Sign Up instead
        </Link>
      </div>
      <div className="h-full lg:col-span-2 flex items-center justify-center mx-12 p-8">
        <LoginForm />
      </div>
    </>
  );
}
