export type LocalUser = {
  id: string;
  username: string;
  photoUrl: string | null;
  role: "admin" | "NGO" | "donor" | "victim";
};

export type DonationsSummary = {
  contributions: number;
  campaigns: number;
  beneficiaries: number;
  totalDonations: number;
};

export type TeamMember = {
  id: string;
  name: string;
  email: string;
  photoUrl: string;
  role: string;
};

export type Country = {
  code: string;
  name: string;
};

export type LocationStats = {
  country: Country;
  contributions: number;
  campaigns: number;
  beneficiaries: number;
  totalDonations: number;
};

export type Campaign = {
  id: string;
  title: string;
  description: string;
  organization: string;
  dateStarted: string;
  targetAmount: number;
  raisedAmount: number;
  totalContributions: number;
  totalDonors: number;
  totalBeneficiaries: number;
  status: "active" | "completed" | "abandoned";
  previewImageUrl: string;
  organizationLogo?: string;
};
