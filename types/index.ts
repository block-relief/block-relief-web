export type DonationsSummary = {
  contributions: number;
  campaigns: number;
  beneficiaries: number;
  amount: number;
};

export enum TokenStatus {
  Expired = "Expired",
  Invalid = "Invalid",
  Active = "Active",
}

export type TeamMember = {
  id: string;
  name: string;
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

export type PaginatedData<T> = {
  data: T[];
  page: number;
  limit: number;
  totalItems: number;
};

export type User = {
  _id: string;
  walletAddress: string;
  email: string;
  roles: string[];
  linkedProfile: string | null;
  notificationsEnabled: boolean;
  twoFactorEnabled: boolean;
  profile: {
    name: string;
    location: string;
    phone: string;
  };
  blockchainHash: string;
  password: string;
  verificationStatus: string;
  verifiedBy: string | User | null;
  createdAt: Date;
};

export type NGO = {
  _id: string;
  userId: string | User;
  registrationNumber: string;
  phone: string;
  address: string;
  country: string;
  contactPerson: {
    name: string;
    phone: string;
    email: string;
  };
  logo: string;
  proposals: string[] | Proposal[];
  disasterZones: string[] | Disaster[];
  documents: {
    name: string;
    ipfsCID: string;
    uploadedAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
};

export type Disaster = {
  _id: string;
  name: string;
  type: string;
  location: {
    city: string;
    state: string;
    country: string;
    latitude: number;
    longitude: number;
  };
  severity: string;
  reportedBy: string | User;
  status: string;
  externalSource: {
    name: string;
    url: string;
  };
  totalEstimatedDamage: number;
  totalVerifiedDamage: number;
  damageReports: {
    name: string;
    ipfsCID: string;
    uploadedAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
};

export type AidRequest = {
  _id: string;
  beneficiary: string | User;
  requestedBy: string | User | NGO;
  requesterType: string;
  items: {
    type: string;
    quantity: number;
  }[];
  description: string;
  estimatedCost: number;
  evidence: {
    name: string;
    ipfsCID: string;
    uploadedAt: Date;
  }[];
  status: string;
  ngo: string | NGO;
  location: {
    latitude: number;
    longitude: number;
  };
  urgency: string;
  requestHash: string;
  createdBy: string | User;
  lastModifiedBy: string | User | null;
  createdAt: Date;
  updatedAt: Date | null;
};

export type Proposal = {
  _id: string;
  ngo: string | NGO;
  title: string;
  description: string;
  requestedAmount: number;
  status: string;
  disaster: string | Disaster;
  milestones: {
    milestoneId: string;
    description: string;
    amount: number;
    fundsAllocated: number;
    fundsReleased: number;
    isCompleted: boolean;
  }[];
  aidRequests: string[] | AidRequest[];
  breakdown: string;
  deadline: Date;
  fundingSource: string;
  blockchainHash: string;
  createdAt: Date;
  updatedAt: Date | null;
  lastModifiedBy: string | User;
  modifierModel: string;
};

export type Feature = {
  title: string;
  description: string;
  icon: string;
};
