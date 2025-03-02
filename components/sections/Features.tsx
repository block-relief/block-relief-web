"use client";
import { Features } from "@/api/dummy";
import FeatureCard from "@/components/custom/Feature";
import SectionHeader from "@/components/custom/SectionHeader";
import { useState } from "react";
import {
  SectionCarousel,
  SectionCarouselContent,
  SectionCarouselNext,
  SectionCarouselPrevious,
} from "../custom/SectionCarousel";

const fHeader = {
  title: "Learn how our platform works",
  subtitle: "How Dera Works",
  description:
    "Revolutionizing disaster aid with secure, real-time, and transparent coordination—connecting donors, NGOs, victims, auditors, and admins in one powerful network through our role based platform.",
};

export default function FeaturesSection() {
  const [startIdx, setStartIdx] = useState(0);

  const handleNext = () =>
    setStartIdx((prev) => Math.min(prev + 1, Features.length - 1));
  const handlePrevious = () => setStartIdx((prev) => Math.max(prev - 1, 0));

  return (
    <div className="w-full flex flex-col lg:flex-row h-auto lg:h-[484px] px-12 py-[72px]">
      <SectionHeader
        title={fHeader.title}
        subtitle={fHeader.subtitle}
        description={fHeader.description}
      />
      <SectionCarousel>
        <SectionCarouselPrevious
          invisible={startIdx <= 0}
          onClick={handlePrevious}
        />
        <SectionCarouselContent>
          {Features.slice(startIdx).map((feature, idx) => (
            <FeatureCard key={idx} feature={feature} />
          ))}
        </SectionCarouselContent>
        <SectionCarouselNext
          onClick={handleNext}
          invisible={startIdx >= Features.length - 1}
        />
      </SectionCarousel>
    </div>
  );
}
