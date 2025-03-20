import React from "react";

interface ProgressProps {
  value: number;
  className?: string;
}

export const Progress: React.FC<ProgressProps> = ({ value, className }) => {
  return (
    <div
      className={`relative w-full h-4 bg-accent-1 rounded-full overflow-hidden ${className}`}
    >
      <div
        className="absolute top-0 left-0 h-full bg-accent-2 transition-all duration-300 ease-in-out"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
};
