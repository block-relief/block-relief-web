import FeaturesSection from "@/components/sections/Features";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import TeamSection from "@/components/sections/Team";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <Header />
      <main className="">
        {/* Hero Section */}
        <div className="w-full bg-noisyGradient h-auto min-h-[645px] grid grid-cols-1 lg:grid-cols-2 px-12 pt-[92px] text-primary">
          <div className="mt-[69px] w-full h-full">
            <p className="text-[56px] leading-[65px] font-normal font-alata w-[453px]">
              Empowering Relief to Empower Lives
            </p>
            <p className="mt-6 ml-[5px] text-base font-plusJakartaSans w-[462px]">
              DERA is a Rapid. Transparent. Blockchain-powered disaster response
              platform
            </p>
            <div className="ml-3 mt-10 flex gap-5 items-center">
              <Link href="/overview/donate">
                <span className="text-base font-plusJakartaSans font-semibold px-8 py-4 border rounded">
                  Donate Today
                </span>
              </Link>
              <div className="flex items-center gap-3 w-[206px] px-2.5 py-2">
                <MoveRight className="" />
                <Link href="/overview">
                  <span className="text-base font-plusJakartaSans font-semibold">
                    Get Involved
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="relative h-full w-full flex justify-end">
            <Image
              src="/hero.png"
              alt="Hero"
              width={710}
              height={523}
              className="object-cover object-left"
            />
          </div>
        </div>
        {/* Features Section */}

        <FeaturesSection />

        {/* Team Section */}

        <TeamSection />
      </main>
      <Footer />
    </div>
  );
}
