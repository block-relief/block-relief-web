import * as React from "react";

interface TeamMemberProps {
  id: number;
  fullName: string;
  photo_url: string;
  role: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ id, fullName, photo_url, role }) => {
  return (
    <div className="flex flex-col items-center text-center p-4">
      <img src={photo_url} alt={fullName} className="w-16 h-16 rounded-full object-cover" />
      <h3 className="mt-2 text-lg font-medium">{fullName}</h3>
      <p className="text-sm text-muted-foreground">{role}</p>
    </div>
  );
};

export default TeamMember;
