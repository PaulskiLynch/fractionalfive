export type CapacityBlock = {
  id: string;
  label: string;
  detail: string;
  monthlyRate: string;
  available: boolean;
};

export type AuditEvent = {
  id: string;
  date: string;
  actor: string;
  action: string;
  detail: string;
};

export type OperatorProfile = {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  currentAvailability: string;
  nextStartWindow: string;
  maxClients: string;
  responseWindow: string;
  delegationPolicy: string;
  rateFraming: string;
  inclusions: string[];
  exclusions: string[];
  blocks: CapacityBlock[];
};

export type OperatorRecord = {
  id: string;
  profile: OperatorProfile;
  profileSetupHours: number;
};

export type WorkLogEntry = {
  id: string;
  date: string;
  hours: string;
  done: string;
  next: string;
};

export type ExtraRequest = {
  title: string;
  reason: string;
  size: string;
  impact: string;
  decision: string;
  status: "pending" | "approved" | "declined";
};

export type EngagementWorkspace = {
  client: string;
  title: string;
  summary: string;
  status: string;
  renewalDate: string;
  cadence: string[];
  scopeIncluded: string;
  scopeExcluded: string;
  blockDefinition: Array<{ label: string; value: string }>;
  workLog: WorkLogEntry[];
  proofHistory: string[];
  extraRequest: ExtraRequest;
};

export type DashboardEngagement = {
  id: string;
  operatorId: string;
  client: string;
  block: string;
  focus: string;
  renewal: string;
  status: "On track" | "Needs recap" | "Extra request pending" | "Renewal due" | "Completed" | "Archived";
  allocatedDays: number;
  title: string;
  summary: string;
  renewalDate: string;
  cadence: string[];
  scopeIncluded: string;
  scopeExcluded: string;
  blockDefinition: Array<{ label: string; value: string }>;
  workLog: WorkLogEntry[];
  requestTitle: string;
  requestSize: string;
  requestImpact: string;
  requestStatus: "pending" | "approved" | "declined";
  proofHistory: string[];
  auditTrail: AuditEvent[];
  boundaryQuestions: number;
  extraBlockRequests: number;
  operatorClarityRating: number;
  clientTrustRating: number;
  renewedAfterThreeMonths: boolean;
};

const martaProfile: OperatorProfile = {
  name: "Marta Kozlowska",
  role: "Independent operator",
  tagline: "Technical SEO for Shopify brands scaling past basics",
  bio: "I help founder-led ecommerce teams clean up technical debt, prioritize what actually affects revenue, and keep SEO moving without hiring a full in-house specialist.",
  currentAvailability: "2 blocks open",
  nextStartWindow: "July 2026",
  maxClients: "4 active blocks",
  responseWindow: "Within 1 business day",
  delegationPolicy: "Specialist substitute with notice",
  rateFraming: "Per block, not per seat",
  inclusions: [
    "Technical SEO audits for Shopify stores",
    "Quarterly crawl and indexation review",
    "Priority backlog with implementation notes",
    "Loom walkthrough after each delivery block",
  ],
  exclusions: [
    "Full-site migrations",
    "Copywriting or net-new content production",
    "Weekend emergency response",
    "Daily standups inside the client team",
  ],
  blocks: [
    {
      id: "small",
      label: "4h / month",
      detail: "Async advisor lane for small recurring audits",
      monthlyRate: "2,000 PLN / month",
      available: true,
    },
    {
      id: "medium",
      label: "1 day / week",
      detail: "Ongoing execution oversight with weekly review",
      monthlyRate: "6,000 PLN / day block",
      available: true,
    },
    {
      id: "large",
      label: "2 days / week",
      detail: "Deeper embedded support without becoming internal staff",
      monthlyRate: "11,000 PLN / block",
      available: false,
    },
  ],
};

const piotrProfile: OperatorProfile = {
  name: "Piotr Zielinski",
  role: "Independent operator",
  tagline: "Lifecycle automation and retention systems for DTC brands",
  bio: "I help ecommerce teams build calmer retention systems with clear flow ownership, QA rituals, and reporting that founders can actually use.",
  currentAvailability: "1 block open",
  nextStartWindow: "August 2026",
  maxClients: "3 active blocks",
  responseWindow: "Within 1 business day",
  delegationPolicy: "No subcontracting without written approval",
  rateFraming: "Per retained delivery block",
  inclusions: [
    "Lifecycle flow design and QA",
    "Weekly implementation reviews",
    "Experiment notes with expected retention impact",
    "Monthly recap and next-priority recommendation",
  ],
  exclusions: [
    "Daily campaign sending",
    "Creative production",
    "Weekend launch coverage",
    "Customer support workflows",
  ],
  blocks: [
    {
      id: "small",
      label: "4h / month",
      detail: "Lightweight QA and strategy support for one operator-owned channel",
      monthlyRate: "2,400 PLN / month",
      available: false,
    },
    {
      id: "medium",
      label: "1 day / week",
      detail: "Recurring build, QA, and reporting lane for one retention priority",
      monthlyRate: "6,800 PLN / day block",
      available: true,
    },
    {
      id: "large",
      label: "2 days / week",
      detail: "Embedded lifecycle support without becoming part of the internal org chart",
      monthlyRate: "12,500 PLN / block",
      available: false,
    },
  ],
};

export const operatorProfiles: OperatorRecord[] = [
  { id: "marta-kozlowska", profile: martaProfile, profileSetupHours: 1.8 },
  { id: "piotr-zielinski", profile: piotrProfile, profileSetupHours: 2.4 },
];

export const operatorProfile: OperatorProfile = operatorProfiles[0].profile;

export const engagementWorkspace: EngagementWorkspace = {
  client: "Glow Botanica",
  title: "1 day per week for 3 months, renewable",
  summary: "Structured support for technical SEO on a Shopify store. The client gets a fixed cadence, visible work, and a clear way to request more than the current block covers.",
  status: "Week 4 of 12",
  renewalDate: "29 Aug",
  cadence: [
    "Every Tuesday: technical audit and prioritization",
    "Every Thursday: async review and handoff notes",
    "End of month: recap, proof links, and renewal decision",
  ],
  scopeIncluded: "Crawl health review, backlog prioritization, implementation QA, and async recommendations for the ecommerce team.",
  scopeExcluded: "Migration planning, daily Slack availability, engineering implementation, or unrelated growth strategy work.",
  blockDefinition: [
    { label: "Cadence", value: "Every Tuesday delivery block" },
    { label: "Response expectation", value: "Async replies within 1 business day" },
    { label: "Operator model", value: "Independent B2B service provider" },
    { label: "Extra capacity", value: "Requested separately and approved explicitly" },
  ],
  workLog: [
    {
      id: "1",
      date: "Tue 09 Jun",
      hours: "3.0h",
      done: "Ran crawl and grouped indexation issues by revenue impact.",
      next: "Share priority fixes with dev lead.",
    },
    {
      id: "2",
      date: "Thu 11 Jun",
      hours: "2.0h",
      done: "Reviewed faceted navigation patch and annotated remaining risk.",
      next: "Validate rollout after deployment.",
    },
    {
      id: "3",
      date: "Tue 16 Jun",
      hours: "2.5h",
      done: "Recorded Loom summary and refreshed the implementation backlog.",
      next: "Confirm whether collection templates need follow-up block.",
    },
  ],
  proofHistory: [
    "Resolved duplicate collection pages blocking crawl budget",
    "Shipped internal-link cleanup on three priority templates",
    "Established an SEO backlog with owner and due date per fix",
  ],
  extraRequest: {
    title: "Client wants collection-template QA before launch",
    reason: "This work sits outside the agreed Tuesday block and needs a separate yes/no decision.",
    size: "4 extra hours",
    impact: "Pre-launch QA and issue memo",
    decision: "Approve as separate block",
    status: "pending",
  },
};

export const dashboardEngagements: DashboardEngagement[] = [
  {
    id: "glow-botanica",
    operatorId: "marta-kozlowska",
    client: "Glow Botanica",
    block: "1 day / week",
    focus: "Technical SEO",
    renewal: "29 Aug",
    status: "Renewal due",
    allocatedDays: 1,
    title: engagementWorkspace.title,
    summary: engagementWorkspace.summary,
    renewalDate: engagementWorkspace.renewalDate,
    cadence: engagementWorkspace.cadence,
    scopeIncluded: engagementWorkspace.scopeIncluded,
    scopeExcluded: engagementWorkspace.scopeExcluded,
    blockDefinition: engagementWorkspace.blockDefinition,
    workLog: engagementWorkspace.workLog,
    requestTitle: engagementWorkspace.extraRequest.title,
    requestSize: engagementWorkspace.extraRequest.size,
    requestImpact: engagementWorkspace.extraRequest.impact,
    requestStatus: engagementWorkspace.extraRequest.status,
    proofHistory: engagementWorkspace.proofHistory,
    auditTrail: [
      {
        id: "glow-audit-1",
        date: "Mon 08 Jun",
        actor: "Marta Kozlowska",
        action: "Engagement renewed",
        detail: "Confirmed the next monthly block and kept the Tuesday delivery cadence unchanged.",
      },
      {
        id: "glow-audit-2",
        date: "Thu 18 Jun",
        actor: "Marta Kozlowska",
        action: "Client update prepared",
        detail: "Summarized QA notes, next actions, and the upcoming renewal recommendation for the client recap.",
      },
    ],
    boundaryQuestions: 1,
    extraBlockRequests: 1,
    operatorClarityRating: 5,
    clientTrustRating: 4,
    renewedAfterThreeMonths: true,
  },
  {
    id: "northline-finance",
    operatorId: "marta-kozlowska",
    client: "Northline Finance",
    block: "4h / month",
    focus: "Analytics QA",
    renewal: "12 Jul",
    status: "Needs recap",
    allocatedDays: 0.5,
    title: "4h per month for analytics QA oversight",
    summary: "A lightweight recurring analytics review block for an internal operator who needs fast QA, not a full retained analyst.",
    renewalDate: "12 Jul",
    cadence: [
      "First Monday: analytics QA review",
      "Mid-month: issue clarification async",
      "Month end: short findings note",
    ],
    scopeIncluded: "Tracking QA, dashboard review, issue annotation, and recommendation notes.",
    scopeExcluded: "Tag manager implementation, BI rebuilds, and daily reporting support.",
    blockDefinition: [
      { label: "Cadence", value: "4 hours across the month" },
      { label: "Response expectation", value: "Within 2 business days" },
      { label: "Operator model", value: "Independent B2B service provider" },
      { label: "Extra capacity", value: "Raised as a separate monthly add-on" },
    ],
    workLog: [
      {
        id: "northline-log-1",
        date: "Mon 02 Jun",
        hours: "1.5h",
        done: "Validated event naming mismatches in GA4.",
        next: "Confirm fix owner on finance dashboard tags.",
      },
    ],
    requestTitle: "One-off reporting audit before board pack",
    requestSize: "2 extra hours",
    requestImpact: "Board-facing metric confidence",
    requestStatus: "declined",
    proofHistory: ["Cleaned lead-source naming across paid and CRM views"],
    auditTrail: [
      {
        id: "northline-audit-1",
        date: "Tue 10 Jun",
        actor: "Marta Kozlowska",
        action: "Scope reminder sent",
        detail: "Reconfirmed that board-pack reporting support sits outside the base monthly QA block.",
      },
    ],
    boundaryQuestions: 3,
    extraBlockRequests: 1,
    operatorClarityRating: 3,
    clientTrustRating: 4,
    renewedAfterThreeMonths: false,
  },
  {
    id: "roast-republic",
    operatorId: "piotr-zielinski",
    client: "Roast Republic",
    block: "2 days / week",
    focus: "Lifecycle automation",
    renewal: "02 Sep",
    status: "Extra request pending",
    allocatedDays: 2,
    title: "2 days per week for lifecycle automation support",
    summary: "Hands-on recurring support for email, flows, and implementation QA without hiring a full-time retention operator.",
    renewalDate: "02 Sep",
    cadence: [
      "Tuesday: build and QA flow updates",
      "Thursday: reporting readout and next sprint planning",
      "Monthly: retention experiment recap",
    ],
    scopeIncluded: "Flow design, QA, segmentation review, and implementation notes.",
    scopeExcluded: "Daily campaign management, creative production, and customer support operations.",
    blockDefinition: [
      { label: "Cadence", value: "Two dedicated days every week" },
      { label: "Response expectation", value: "Within 1 business day" },
      { label: "Operator model", value: "Independent B2B service provider" },
      { label: "Extra capacity", value: "Requested and approved outside block" },
    ],
    workLog: [
      {
        id: "roast-log-1",
        date: "Wed 04 Jun",
        hours: "4.0h",
        done: "Built win-back flow draft and QA checklist.",
        next: "Await brand signoff before launch.",
      },
    ],
    requestTitle: "Add a launch-week QA sprint",
    requestSize: "1 extra day",
    requestImpact: "Reduces launch-week automation risk",
    requestStatus: "pending",
    proofHistory: ["Launched post-purchase branch logic for subscription customers"],
    auditTrail: [
      {
        id: "roast-audit-1",
        date: "Wed 04 Jun",
        actor: "Piotr Zielinski",
        action: "Launch sprint requested",
        detail: "Client asked for one extra day of QA coverage ahead of the subscription relaunch.",
      },
    ],
    boundaryQuestions: 2,
    extraBlockRequests: 2,
    operatorClarityRating: 4,
    clientTrustRating: 4,
    renewedAfterThreeMonths: false,
  },
  {
    id: "pine-studio",
    operatorId: "piotr-zielinski",
    client: "Pine Studio",
    block: "1 day / week",
    focus: "Retention operations",
    renewal: "18 Aug",
    status: "On track",
    allocatedDays: 1,
    title: "1 day per week for retention operations support",
    summary: "Recurring retention support for a small DTC team that needs clear QA, weekly decision support, and measured rollout notes.",
    renewalDate: "18 Aug",
    cadence: [
      "Monday: flow review and QA",
      "Wednesday: implementation notes and owner handoff",
      "Month end: retention KPI recap",
    ],
    scopeIncluded: "Flow QA, segmentation checks, reporting notes, and prioritization support.",
    scopeExcluded: "Creative copywriting, campaign sends, and support inbox operations.",
    blockDefinition: [
      { label: "Cadence", value: "One dedicated day every week" },
      { label: "Response expectation", value: "Within 1 business day" },
      { label: "Operator model", value: "Independent B2B service provider" },
      { label: "Extra capacity", value: "Raised as a separate add-on block" },
    ],
    workLog: [
      {
        id: "pine-log-1",
        date: "Mon 08 Jun",
        hours: "3.5h",
        done: "Reviewed churn-prevention flow handoff and annotated the testing queue.",
        next: "Confirm owner for incentive logic update.",
      },
    ],
    requestTitle: "No extra request yet",
    requestSize: "TBD",
    requestImpact: "TBD",
    requestStatus: "pending",
    proofHistory: ["Documented a weekly QA ritual for retention launches"],
    auditTrail: [
      {
        id: "pine-audit-1",
        date: "Mon 08 Jun",
        actor: "Piotr Zielinski",
        action: "Weekly recap logged",
        detail: "Captured the first QA handoff and next action for the churn-prevention flow.",
      },
    ],
    boundaryQuestions: 1,
    extraBlockRequests: 0,
    operatorClarityRating: 5,
    clientTrustRating: 5,
    renewedAfterThreeMonths: true,
  },
];

export const weeklyBlocks = [
  { day: "Mon", load: "Northline / analytics check-in" },
  { day: "Tue", load: "Glow Botanica / audit block" },
  { day: "Wed", load: "Roast Republic / flow build" },
  { day: "Thu", load: "Roast Republic / QA and handoff" },
  { day: "Fri", load: "Admin, invoices, renewal notes" },
];
