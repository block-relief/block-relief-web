import {
  Campaign,
  User,
  LocationStats,
  DonationsSummary,
  Proposal,
  Feature,
  TeamMember,
  Disaster,
  NGO,
  AidRequest,
  DonationTransaction,
} from "@/types";

// ['donor', 'ngo', 'beneficiary', 'auditor', 'admin']

export const DUMMYUSER: User = {
  _id: "123",
  walletAddress: "0x1234567890abcdef1234567890abcdef12345678",
  email: "john.doe@example.com",
  roles: ["admin"],
  linkedProfile: "profile_123",
  notificationsEnabled: true,
  twoFactorEnabled: false,
  profile: {
    name: "John Doe",
    location: "New York, USA",
    phone: "+1-234-567-890",
  },
  blockchainHash:
    "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
  password: "hashed_password",
  verificationStatus: "verified",
  verifiedBy: "admin_123",
  createdAt: new Date("2025-01-01T00:00:00.000Z"),
};

export const DUMMYLOCATIONSTATS: LocationStats[] = [
  {
    country: {
      code: "US",
      name: "United States",
    },
    contributions: 123,
    campaigns: 234,
    beneficiaries: 345,
    totalDonations: 456,
  },
  {
    country: {
      code: "CA",
      name: "Canada",
    },
    contributions: 567,
    campaigns: 678,
    beneficiaries: 789,
    totalDonations: 890,
  },
  {
    country: {
      code: "GB",
      name: "United Kingdom",
    },
    contributions: 901,
    campaigns: 123,
    beneficiaries: 234,
    totalDonations: 345,
  },
  {
    country: {
      code: "AU",
      name: "Australia",
    },
    contributions: 567,
    campaigns: 678,
    beneficiaries: 789,
    totalDonations: 890,
  },
  {
    country: {
      code: "MX",
      name: "Mexico",
    },
    contributions: 901,
    campaigns: 123,
    beneficiaries: 234,
    totalDonations: 345,
  },
];

export const DUMMYCAMPAIGNS: Campaign[] = [
  {
    id: "1",
    title: "Clean Water for All",
    description:
      "Providing clean and safe drinking water to communities in need.",
    organization: "WaterAid",
    dateStarted: "2025-01-01",
    targetAmount: 10000,
    raisedAmount: 5000,
    totalContributions: 150,
    totalDonors: 100,
    totalBeneficiaries: 200,
    status: "active",
    previewImageUrl: "/demo/campaign_1.png",
    organizationLogo: "/demo/org_logo_1.png",
  },
  {
    id: "2",
    title: "Education for Every Child",
    description:
      "Ensuring access to quality education for children in underprivileged areas.",
    organization: "EduCare",
    dateStarted: "2025-02-01",
    targetAmount: 20000,
    raisedAmount: 15000,
    totalContributions: 300,
    totalDonors: 250,
    totalBeneficiaries: 500,
    status: "active",
    previewImageUrl: "/demo/campaign_2.png",
    organizationLogo: "/demo/org_logo_2.png",
  },
  {
    id: "3",
    title: "Healthcare for the Homeless",
    description:
      "Providing essential healthcare services to homeless individuals.",
    organization: "HealthFirst",
    dateStarted: "2025-03-01",
    targetAmount: 15000,
    raisedAmount: 10000,
    totalContributions: 200,
    totalDonors: 150,
    totalBeneficiaries: 300,
    status: "active",
    previewImageUrl: "/demo/campaign_3.png",
    organizationLogo: "/demo/org_logo_3.png",
  },
];

export const DUMMYTEAMMEMBERS: TeamMember[] = [
  {
    id: "ljsdkjdljada",
    name: "Stephen Azongo",
    role: "Back-end Developer",
    photoUrl: "/demo/profile_1.png",
  },
  {
    id: "sljdsldjdfoidsk",
    name: "Isaac Dzikum",
    role: "Full Stack Developer",
    photoUrl: "/demo/profile_2.png",
  },
  {
    id: "aljdlsjdoiwe",
    name: "Solomon Dzah",
    role: "Front-end Developer",
    photoUrl: "/demo/profile_3.png",
  },
  {
    id: "skjdlsjsfljdsf",
    name: "Endurance",
    role: "Designer",
    photoUrl: "/demo/profile_2.png",
  },
  {
    id: "skdsljdsjdlsdlj",
    name: "Precious",
    role: "Manager",
    photoUrl: "/demo/profile_1.png",
  },
  {
    id: "skdsljdsjdlsdlg",
    name: "Jawad ",
    role: "Security Analyst",
    photoUrl: "/demo/profile_3.png",
  },
];

export const DUMMYFEATURES: Feature[] = [
  {
    title: "Donors",
    description:
      "Find campaigns, donate (crypto/fiat), and watch impact unfold.",
    icon: "/demo/feature_1.png",
  },
  {
    title: "NGOs",
    description: "Launch proposals, manage resources, and share success.",
    icon: "/demo/feature_2.png",
  },
  {
    title: "Victims",
    description: "Share stories, receive donations, and express gratitude.",
    icon: "/demo/feature_3.png",
  },
  {
    title: "Community",
    description: "Join a community, share stories, and inspire others.",
    icon: "/demo/feature_2.png",
  },
  {
    title: "Dashboard",
    description: "Manage campaigns, view analytics, and engage with donors.",
    icon: "/demo/feature_1.png",
  },
];

export const DUMMYDONATIONSSUMMARY: DonationsSummary = {
  contributions: 1234,
  campaigns: 56,
  beneficiaries: 789,
  amount: 100000,
};

export const DUMMYDISASTERS: Disaster[] = [
  {
    _id: "disaster1",
    name: "Hurricane Dorian",
    type: "Natural",
    location: {
      city: "Nassau",
      state: "New Providence",
      country: "Bahamas",
      latitude: 25.0343,
      longitude: -77.3963,
    },
    severity: "Category 5",
    reportedBy: "user1",
    status: "Active",
    externalSource: {
      name: "NOAA",
      url: "https://www.noaa.gov",
    },
    totalEstimatedDamage: 100000000,
    totalVerifiedDamage: 80000000,
    damageReports: [
      {
        name: "Initial Damage Report",
        ipfsCID: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        uploadedAt: new Date("2019-08-25"),
      },
    ],
    createdAt: new Date("2019-08-24"),
    updatedAt: new Date("2019-09-10"),
  },
  {
    _id: "disaster2",
    name: "California Wildfires",
    type: "Natural",
    location: {
      city: "Los Angeles",
      state: "California",
      country: "USA",
      latitude: 34.0522,
      longitude: -118.2437,
    },
    severity: "Severe",
    reportedBy: "user2",
    status: "Active",
    externalSource: {
      name: "Cal Fire",
      url: "https://www.fire.ca.gov",
    },
    totalEstimatedDamage: 50000000,
    totalVerifiedDamage: 40000000,
    damageReports: [
      {
        name: "Fire Damage Report 1",
        ipfsCID: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        uploadedAt: new Date("2020-09-01"),
      },
      {
        name: "Fire Damage Report 2",
        ipfsCID: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        uploadedAt: new Date("2020-09-02"),
      },
    ],
    createdAt: new Date("2020-08-15"),
    updatedAt: new Date("2020-09-10"),
  },
  {
    _id: "disaster3",
    name: "Floods in India",
    type: "Natural",
    location: {
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      latitude: 19.076,
      longitude: 72.8777,
    },
    severity: "Extreme",
    reportedBy: "user3",
    status: "Active",
    externalSource: {
      name: "IMD",
      url: "https://www.imd.gov.in",
    },
    totalEstimatedDamage: 75000000,
    totalVerifiedDamage: 60000000,
    damageReports: [
      {
        name: "Flood Damage Report 1",
        ipfsCID: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        uploadedAt: new Date("2021-07-01"),
      },
      {
        name: "Flood Damage Report 2",
        ipfsCID: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        uploadedAt: new Date("2021-07-02"),
      },
      {
        name: "Flood Damage Report 3",
        ipfsCID: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        uploadedAt: new Date("2021-07-03"),
      },
    ],
    createdAt: new Date("2021-06-15"),
    updatedAt: new Date("2021-07-10"),
  },
];

export const DUMMYNGOS: NGO[] = [
  {
    _id: "ngo1",
    userId: "",
    registrationNumber: "REG123456",
    phone: "+1-234-567-8901",
    address: "123 Aid Street, New York, NY, USA",
    country: "USA",
    contactPerson: {
      name: "John Doe",
      phone: "+1-234-567-8901",
      email: "contact@globalaid.net",
    },
    logo: "/demo/org_logo_1.png",
    proposals: [],
    disasterZones: [],
    documents: [
      {
        name: "Registration Document",
        ipfsCID: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        uploadedAt: new Date("2020-01-01"),
      },
    ],
    createdAt: new Date("2020-01-01"),
    updatedAt: new Date("2021-01-01"),
  },
  {
    _id: "ngo2",
    userId: "",
    registrationNumber: "REG654321",
    phone: "+1-234-567-8902",
    address: "456 Child Street, Los Angeles, CA, USA",
    country: "USA",
    contactPerson: {
      name: "Jane Smith",
      phone: "+1-234-567-8902",
      email: "info@savethechildren.org",
    },
    logo: "/demo/org_logo_2.png",
    proposals: [],
    disasterZones: [],
    documents: [
      {
        name: "Registration Document",
        ipfsCID: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        uploadedAt: new Date("2019-05-15"),
      },
    ],
    createdAt: new Date("2019-05-15"),
    updatedAt: new Date("2020-05-15"),
  },
  {
    _id: "ngo3",
    userId: "",
    registrationNumber: "REG789012",
    phone: "+1-234-567-8903",
    address: "789 Justice Avenue, Washington, DC, USA",
    country: "USA",
    contactPerson: {
      name: "Alice Johnson",
      phone: "+1-234-567-8903",
      email: "support@oxfam.org",
    },
    logo: "/demo/org_logo_3.png",
    proposals: [],
    disasterZones: [],
    documents: [
      {
        name: "Registration Document",
        ipfsCID: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
        uploadedAt: new Date("2018-03-10"),
      },
    ],
    createdAt: new Date("2018-03-10"),
    updatedAt: new Date("2019-03-10"),
  },
];

export const DUMMYAIDREQUESTS: AidRequest[] = [
  {
    _id: "AidRequest1",
    beneficiary: DUMMYUSER._id,
    requestedBy: DUMMYNGOS[0]._id,
    requesterType: "NGO",
    items: [],
    description: "Food support for disaster victims",
    estimatedCost: 20000,
    evidence: [
      {
        name: "GFA Authorization",
        ipfsCID: "kdkskjsdksd",
        uploadedAt: new Date("2025-01-01"),
      },
    ],
    status: "Ongoing",
    ngo: DUMMYNGOS[0]._id,
    location: {
      latitude: 22.5,
      longitude: -15.7,
    },
    urgency: "Immediate Action",
    requestHash: "abcdefgh",
    createdBy: DUMMYUSER._id,
    lastModifiedBy: null,
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2025-01-01"),
  },
];

export const DUMMYPROPOSALS: Proposal[] = [
  {
    _id: "proposal1",
    ngo: "ngo1",
    title: "Clean Water Initiative",
    description: "Providing clean water to communities in need.",
    requestedAmount: 50000,
    status: "Ongoing",
    disaster: "disaster1",
    milestones: [
      {
        milestoneId: "milestone1",
        description: "Drill wells",
        amount: 20000,
        fundsAllocated: 20000,
        fundsReleased: 10000,
        isCompleted: false,
      },
      {
        milestoneId: "milestone2",
        description: "Install water pumps",
        amount: 30000,
        fundsAllocated: 30000,
        fundsReleased: 15000,
        isCompleted: false,
      },
    ],
    aidRequests: ["aidRequest1", "aidRequest2"],
    breakdown: "Detailed breakdown of the proposal.",
    deadline: new Date("2025-12-31"),
    fundingSource: "Donations",
    blockchainHash:
      "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2025-01-15"),
    lastModifiedBy: "user1",
    modifierModel: "User",
  },
  {
    _id: "proposal2",
    ngo: "ngo2",
    title: "Education for All",
    description:
      "Ensuring access to education for children in underprivileged areas.",
    requestedAmount: 75000,
    status: "Ongoing",
    disaster: "disaster2",
    milestones: [
      {
        milestoneId: "milestone1",
        description: "Build schools",
        amount: 50000,
        fundsAllocated: 50000,
        fundsReleased: 25000,
        isCompleted: false,
      },
      {
        milestoneId: "milestone2",
        description: "Provide school supplies",
        amount: 25000,
        fundsAllocated: 25000,
        fundsReleased: 12500,
        isCompleted: false,
      },
    ],
    aidRequests: ["aidRequest3", "aidRequest4"],
    breakdown: "Detailed breakdown of the proposal.",
    deadline: new Date("2025-12-31"),
    fundingSource: "Donations",
    blockchainHash:
      "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2025-01-15"),
    lastModifiedBy: "user2",
    modifierModel: "User",
  },
  {
    _id: "proposal3",
    ngo: "ngo3",
    title: "Healthcare for the Homeless",
    description:
      "Providing essential healthcare services to homeless individuals.",
    requestedAmount: 60000,
    status: "Ongoing",
    disaster: "disaster3",
    milestones: [
      {
        milestoneId: "milestone1",
        description: "Set up mobile clinics",
        amount: 30000,
        fundsAllocated: 30000,
        fundsReleased: 15000,
        isCompleted: false,
      },
      {
        milestoneId: "milestone2",
        description: "Provide medical supplies",
        amount: 30000,
        fundsAllocated: 30000,
        fundsReleased: 15000,
        isCompleted: false,
      },
    ],
    aidRequests: ["aidRequest5", "aidRequest6"],
    breakdown: "Detailed breakdown of the proposal.",
    deadline: new Date("2025-12-31"),
    fundingSource: "Donations",
    blockchainHash:
      "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2025-01-15"),
    lastModifiedBy: "user3",
    modifierModel: "User",
  },
];

export const DUMMYDONATIONS: DonationTransaction[] = [
  {
    donor: DUMMYUSER,
    proposal: DUMMYPROPOSALS[0],
    disaster: DUMMYDISASTERS[0],
    amount: 100,
    currency: "USD",
    ngo: DUMMYNGOS[0],
    beneficiary: DUMMYUSER,
    status: "Completed",
    transactionHash:
      "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    reference: "REF123456",
    paymentProvider: "Paystack",
    paymentStatus: "Completed",
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2025-01-02"),
  },
  {
    donor: DUMMYUSER,
    proposal: DUMMYPROPOSALS[1],
    disaster: DUMMYDISASTERS[1],
    amount: 200,
    currency: "EUR",
    ngo: DUMMYNGOS[1],
    beneficiary: DUMMYUSER,
    status: "Completed",
    transactionHash:
      "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    reference: "REF654321",
    paymentProvider: "MockCrypto",
    paymentStatus: "Completed",
    createdAt: new Date("2025-02-01"),
    updatedAt: new Date("2025-02-02"),
  },
  {
    donor: DUMMYUSER,
    proposal: DUMMYPROPOSALS[2],
    disaster: DUMMYDISASTERS[2],
    amount: 150,
    currency: "GHS",
    ngo: DUMMYNGOS[2],
    beneficiary: DUMMYUSER,
    status: "Completed",
    transactionHash:
      "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    reference: "REF789012",
    paymentProvider: "Paystack",
    paymentStatus: "Completed",
    createdAt: new Date("2025-03-01"),
    updatedAt: new Date("2025-03-02"),
  },
  {
    donor: DUMMYUSER,
    proposal: DUMMYPROPOSALS[0],
    disaster: DUMMYDISASTERS[0],
    amount: 250,
    currency: "Crypto",
    ngo: DUMMYNGOS[0],
    beneficiary: DUMMYUSER,
    status: "Completed",
    transactionHash:
      "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    reference: "REF345678",
    paymentProvider: "MockCrypto",
    paymentStatus: "Completed",
    createdAt: new Date("2025-04-01"),
    updatedAt: new Date("2025-04-02"),
  },
  {
    donor: DUMMYUSER,
    proposal: DUMMYPROPOSALS[1],
    disaster: DUMMYDISASTERS[1],
    amount: 300,
    currency: "USD",
    ngo: DUMMYNGOS[1],
    beneficiary: DUMMYUSER,
    status: "Completed",
    transactionHash:
      "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    reference: "REF901234",
    paymentProvider: "Paystack",
    paymentStatus: "Completed",
    createdAt: new Date("2025-05-01"),
    updatedAt: new Date("2025-05-02"),
  },
];
