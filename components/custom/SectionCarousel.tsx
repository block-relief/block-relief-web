import { ChevronLeft, ChevronRight } from "lucide-react";
import { MouseEvent } from "react";

export type SectionCarouselNavProps = {
  invisible: boolean;
  onClick: (e: MouseEvent) => void;
};

export const SectionCarouselNext = ({
  invisible,
  onClick,
}: SectionCarouselNavProps) => {
  return (
    <div className="w-14 flex items-center flex-grow-0 flex-shrink-0">
      {!invisible && (
        <div
          className="w-14 h-14 bg-accent-2 rounded-full flex items-center justify-center cursor-pointer"
          onClick={onClick}
        >
          <ChevronRight className="w-8 h-8" strokeWidth={0.5} />
        </div>
      )}
    </div>
  );
};

export const SectionCarouselPrevious = ({
  invisible,
  onClick,
}: SectionCarouselNavProps) => {
  return (
    <div className="w-14 flex items-center flex-grow-0 flex-shrink-0">
      {!invisible && (
        <div
          className="w-14 h-14 bg-accent-2 rounded-full flex items-center justify-center cursor-pointer"
          onClick={onClick}
        >
          <ChevronLeft className="w-8 h-8" strokeWidth={0.5} />
        </div>
      )}
    </div>
  );
};

export function SectionCarousel({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function SectionCarouselContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-0 w-full lg:h-auto h-[340px] relative overflow-hidden">
      {children}
    </div>
  );
}
