import * as React from "react";
import { cn } from "@/lib/utils";

interface TeamMemberProps extends React.HTMLAttributes<HTMLDivElement> {
  id: number;
  fullName: string;
  photo_url: string;
  role: string;
}

const TeamMember = React.forwardRef<HTMLDivElement, TeamMemberProps>(
  ({ id, fullName, photo_url, role, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col items-center text-center p-4", className)}
        {...props}
      >
        <img
          src={photo_url}
          alt={fullName}
          className="w-16 h-16 rounded-full object-cover"
        />
        <h3 className="mt-2 text-lg font-medium">{fullName}</h3>
        <p className="text-sm text-muted-foreground">{role}</p>
      </div>
    );
  }
);

TeamMember.displayName = "TeamMember";

export default TeamMember;
