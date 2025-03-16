"use client";
import SectionHeader from "@/components/custom/SectionHeader";
import { useState } from "react";
import {
  SectionCarousel,
  SectionCarouselContent,
  SectionCarouselNext,
  SectionCarouselPrevious,
} from "../custom/SectionCarousel";
import TeamMemberCard from "../custom/TeamMemberCard";
import useApiQuery from "@/hooks/useApiQuery";
import { features, teamMembers } from "@/api/dummy";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FeatureCard from "../custom/Feature";

const tHeader = {
  title: "Who’s behind this solution",
  subtitle: "Meet The Team",
  description:
    "A dynamic crew of tech innovators and humanitarian heroes from Africa, proudly rooted in Ghana and Ethiopia, driven by passion, innovation, and a commitment to making a difference.",
};

const fHeader = {
  title: "Learn how our platform works",
  subtitle: "How Dera Works",
  description:
    "Revolutionizing disaster aid with secure, real-time, and transparent coordination—connecting donors, NGOs, victims, auditors, and admins in one powerful network through our role based platform.",
};

const TeamSection = () => {
  const { result } = useApiQuery({
    queryKey: ["teamMembers"],
    queryFn: () => teamMembers(),
    retry: 2,
    enabled: true,
  });
  const [startIdx, setStartIdx] = useState(0);

  const handleNext = () => {
    if (result) setStartIdx((prev) => Math.min(prev + 1, result.length - 1));
  };
  const handlePrevious = () => {
    if (result) setStartIdx((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="w-full flex flex-col lg:flex-row h-auto lg:h-[484px] px-12 py-[72px]">
      <SectionHeader
        title={tHeader.title}
        subtitle={tHeader.subtitle}
        description={tHeader.description}
      />
      <SectionCarousel>
        <SectionCarouselPrevious
          invisible={startIdx <= 0}
          onClick={handlePrevious}
        />
        <SectionCarouselContent>
          {result &&
            result
              .slice(startIdx)
              .map((member, idx) => (
                <TeamMemberCard key={idx} member={member} />
              ))}
        </SectionCarouselContent>
        <SectionCarouselNext
          onClick={handleNext}
          invisible={!result || startIdx >= result.length - 1}
        />
      </SectionCarousel>
    </div>
  );
};

const FeaturesSection = () => {
  const { result } = useApiQuery({
    queryKey: ["features"],
    queryFn: () => features(),
    retry: 2,
    enabled: true,
  });
  const [startIdx, setStartIdx] = useState(0);

  const handleNext = () => {
    if (result) setStartIdx((prev) => Math.min(prev + 1, result.length - 1));
  };
  const handlePrevious = () => {
    if (result) setStartIdx((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="w-full flex flex-col lg:flex-row h-auto lg:h-[484px] px-12 py-[72px]">
      <SectionHeader
        title={fHeader.title}
        subtitle={fHeader.subtitle}
        description={fHeader.description}
      />
      <SectionCarousel>
        <SectionCarouselPrevious
          invisible={!result || startIdx <= 0}
          onClick={handlePrevious}
        />
        <SectionCarouselContent>
          {result &&
            result
              .slice(startIdx)
              .map((feature, idx) => (
                <FeatureCard key={idx} feature={feature} />
              ))}
        </SectionCarouselContent>
        <SectionCarouselNext
          onClick={handleNext}
          invisible={!result || startIdx >= result.length - 1}
        />
      </SectionCarousel>
    </div>
  );
};

export default function HomeSections() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/* Features Section */}

        <FeaturesSection />

        {/* Team Section */}

        <TeamSection />
      </QueryClientProvider>
    </>
  );
}
