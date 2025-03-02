"use client";
import { TeamMembers } from "@/api/dummy";
import SectionHeader from "@/components/custom/SectionHeader";
import { useState } from "react";
import {
  SectionCarousel,
  SectionCarouselContent,
  SectionCarouselNext,
  SectionCarouselPrevious,
} from "../custom/SectionCarousel";
import TeamMemberCard from "../custom/TeamMemberCard";

const fHeader = {
  title: "Who’s behind this solution",
  subtitle: "Meet The Team",
  description:
    "A dynamic crew of tech innovators and humanitarian heroes from Africa, proudly rooted in Ghana and Ethiopia, driven by passion, innovation, and a commitment to making a difference.",
};

export default function TeamSection() {
  const [startIdx, setStartIdx] = useState(0);

  const handleNext = () =>
    setStartIdx((prev) => Math.min(prev + 1, TeamMembers.length - 1));
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
          {TeamMembers.slice(startIdx).map((member, idx) => (
            <TeamMemberCard key={idx} member={member} />
          ))}
        </SectionCarouselContent>
        <SectionCarouselNext
          onClick={handleNext}
          invisible={startIdx >= TeamMembers.length - 1}
        />
      </SectionCarousel>
    </div>
  );
}
