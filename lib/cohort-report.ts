import type { DashboardEngagement, OperatorRecord } from "@/lib/fractional-five-data";

export type CohortOperatorRow = {
  id: string;
  name: string;
  role: string;
  activeBlocks: number;
  setupHours: number;
  avgBoundaryQuestions: number;
  avgClarity: number;
  renewalRate: number;
};

export type CohortReport = {
  operators: number;
  engagements: number;
  activeBlocks: number;
  renewedCount: number;
  avgProfileSetup: number;
  avgBoundaryQuestions: number;
  avgExtraRequests: number;
  avgClarity: number;
  avgTrust: number;
  renewalRate: number;
  operatorRows: CohortOperatorRow[];
  focusBreakdown: Array<[string, number]>;
};

function average(values: number[]) {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function toCsvCell(value: string | number | boolean) {
  const text = String(value).replaceAll('"', '""');
  return `"${text}"`;
}

export function buildCohortReport(operators: OperatorRecord[], engagements: DashboardEngagement[]): CohortReport {
  const ratedClarity = engagements.filter((engagement) => engagement.operatorClarityRating > 0);
  const ratedTrust = engagements.filter((engagement) => engagement.clientTrustRating > 0);
  const renewed = engagements.filter((engagement) => engagement.renewedAfterThreeMonths);
  const active = engagements.filter(
    (engagement) => engagement.status !== "Completed" && engagement.status !== "Archived",
  );
  const avgProfileSetup = average(operators.map((operator) => operator.profileSetupHours));
  const avgBoundaryQuestions = average(engagements.map((engagement) => engagement.boundaryQuestions));
  const avgExtraRequests = average(engagements.map((engagement) => engagement.extraBlockRequests));
  const avgClarity = average(ratedClarity.map((engagement) => engagement.operatorClarityRating));
  const avgTrust = average(ratedTrust.map((engagement) => engagement.clientTrustRating));
  const renewalRate = engagements.length ? (renewed.length / engagements.length) * 100 : 0;

  const operatorRows = operators.map((operator) => {
    const operatorEngagements = engagements.filter((engagement) => engagement.operatorId === operator.id);
    const operatorRenewed = operatorEngagements.filter((engagement) => engagement.renewedAfterThreeMonths);

    return {
      id: operator.id,
      name: operator.profile.name,
      role: operator.profile.role,
      activeBlocks: operatorEngagements.filter(
        (engagement) => engagement.status !== "Completed" && engagement.status !== "Archived",
      ).length,
      setupHours: operator.profileSetupHours,
      avgBoundaryQuestions: average(
        operatorEngagements.map((engagement) => engagement.boundaryQuestions),
      ),
      avgClarity: average(
        operatorEngagements
          .filter((engagement) => engagement.operatorClarityRating > 0)
          .map((engagement) => engagement.operatorClarityRating),
      ),
      renewalRate: operatorEngagements.length
        ? (operatorRenewed.length / operatorEngagements.length) * 100
        : 0,
    };
  });

  const focusBreakdown = Object.entries(
    engagements.reduce<Record<string, number>>((accumulator, engagement) => {
      accumulator[engagement.focus] = (accumulator[engagement.focus] ?? 0) + 1;
      return accumulator;
    }, {}),
  ).sort((left, right) => right[1] - left[1]);

  return {
    operators: operators.length,
    engagements: engagements.length,
    activeBlocks: active.length,
    renewedCount: renewed.length,
    avgProfileSetup,
    avgBoundaryQuestions,
    avgExtraRequests,
    avgClarity,
    avgTrust,
    renewalRate,
    operatorRows,
    focusBreakdown,
  };
}

export function buildCohortFindings(report: CohortReport) {
  const setupRead =
    report.avgProfileSetup <= 2
      ? "Packaging a profile is staying lightweight, which is a good sign for operator adoption."
      : "Profile setup is still a little heavy, which suggests the packaging step may need more scaffolding.";
  const boundaryRead =
    report.avgBoundaryQuestions <= 1.5
      ? "Boundary questions are fairly low, which suggests the block framing is doing real clarity work."
      : "Boundary questions are still elevated, which means scope language is not yet carrying enough weight.";
  const scopeRead =
    report.avgExtraRequests >= 1
      ? "Extra block requests are showing up often enough to validate the need for an explicit boundary tool."
      : "Extra block requests are still rare, so we should keep watching whether scope drift is being surfaced or just avoided.";
  const trustRead =
    report.avgTrust >= 4
      ? "Client trust is strong, which supports the thesis that visible work logs can replace micromanagement."
      : "Client trust is not consistently strong yet, so the proof layer may need to feel clearer or more automatic.";
  const renewalRead =
    report.renewalRate >= 50
      ? "Renewal performance is promising enough to argue that recurring block delivery could become a durable business."
      : "Renewal performance is still early or weak, so the next learning cycle should focus on where delivery or packaging breaks down.";

  return [
    `This cohort currently covers ${report.operators} operators and ${report.engagements} engagements, with ${report.activeBlocks} blocks still active.`,
    setupRead,
    boundaryRead,
    scopeRead,
    trustRead,
    renewalRead,
  ];
}

export function buildCohortExportText(report: CohortReport, findings: string[]) {
  return [
    "FourHops cohort report",
    "",
    `Operators in cohort: ${report.operators}`,
    `Total engagements: ${report.engagements}`,
    `Active blocks: ${report.activeBlocks}`,
    `Renewed after three months: ${report.renewedCount}`,
    `Average profile setup time: ${report.avgProfileSetup.toFixed(1)}h`,
    `Average boundary questions per engagement: ${report.avgBoundaryQuestions.toFixed(1)}`,
    `Average extra block requests per engagement: ${report.avgExtraRequests.toFixed(1)}`,
    `Average operator clarity rating: ${report.avgClarity.toFixed(1)}/5`,
    `Average client trust rating: ${report.avgTrust.toFixed(1)}/5`,
    `3-month renewal rate: ${Math.round(report.renewalRate)}%`,
    "",
    "Auto findings",
    ...findings.map((item) => `- ${item}`),
    "",
    "Operator breakdown",
    ...report.operatorRows.map(
      (row) =>
        `- ${row.name}: ${row.activeBlocks} active blocks, ${row.setupHours.toFixed(1)}h setup, ${row.avgBoundaryQuestions.toFixed(1)} boundary questions avg, ${row.avgClarity.toFixed(1)}/5 clarity, ${Math.round(row.renewalRate)}% renewal rate`,
    ),
    "",
    "Focus mix",
    ...report.focusBreakdown.map(([focus, count]) => `- ${focus}: ${count}`),
  ].join("\n");
}

export function buildCohortCsvText(
  report: CohortReport,
  operators: OperatorRecord[],
  engagements: DashboardEngagement[],
) {
  const summaryRows = [
    ["section", "metric", "value"],
    ["summary", "operators", report.operators],
    ["summary", "engagements", report.engagements],
    ["summary", "active_blocks", report.activeBlocks],
    ["summary", "renewed_after_three_months", report.renewedCount],
    ["summary", "avg_profile_setup_hours", report.avgProfileSetup.toFixed(1)],
    ["summary", "avg_boundary_questions", report.avgBoundaryQuestions.toFixed(1)],
    ["summary", "avg_extra_block_requests", report.avgExtraRequests.toFixed(1)],
    ["summary", "avg_operator_clarity", report.avgClarity.toFixed(1)],
    ["summary", "avg_client_trust", report.avgTrust.toFixed(1)],
    ["summary", "renewal_rate_percent", Math.round(report.renewalRate)],
  ];

  const operatorRows = [
    ["section", "operator", "role", "active_blocks", "setup_hours", "avg_boundary_questions", "avg_clarity", "renewal_rate_percent"],
    ...report.operatorRows.map((row) => [
      "operator",
      row.name,
      row.role,
      row.activeBlocks,
      row.setupHours.toFixed(1),
      row.avgBoundaryQuestions.toFixed(1),
      row.avgClarity.toFixed(1),
      Math.round(row.renewalRate),
    ]),
  ];

  const engagementRows = [
    [
      "section",
      "operator",
      "client",
      "focus",
      "status",
      "boundary_questions",
      "extra_block_requests",
      "operator_clarity",
      "client_trust",
      "renewed_after_three_months",
    ],
    ...engagements.map((engagement) => {
      const operator = operators.find((item) => item.id === engagement.operatorId);
      return [
        "engagement",
        operator?.profile.name ?? engagement.operatorId,
        engagement.client,
        engagement.focus,
        engagement.status,
        engagement.boundaryQuestions,
        engagement.extraBlockRequests,
        engagement.operatorClarityRating,
        engagement.clientTrustRating,
        engagement.renewedAfterThreeMonths,
      ];
    }),
  ];

  return [...summaryRows, [], ...operatorRows, [], ...engagementRows]
    .map((row) => row.map((cell) => toCsvCell(cell)).join(","))
    .join("\n");
}

export function buildInvestorMemo(report: CohortReport, findings: string[]) {
  const strongestOperator = [...report.operatorRows].sort((left, right) => right.renewalRate - left.renewalRate)[0];
  return [
    "FourHops / FractionalFive memo",
    "",
    "What we tested",
    `We used a structured fractional delivery model across ${report.operators} operators and ${report.engagements} engagements to test whether independent B2B professionals can package recurring expertise into understandable blocks.`,
    "",
    "What the data says",
    `Average profile setup time is ${report.avgProfileSetup.toFixed(1)} hours.`,
    `Average boundary questions per engagement are ${report.avgBoundaryQuestions.toFixed(1)}.`,
    `Average extra block requests per engagement are ${report.avgExtraRequests.toFixed(1)}.`,
    `Operator clarity averages ${report.avgClarity.toFixed(1)}/5 and client trust averages ${report.avgTrust.toFixed(1)}/5.`,
    `The current 3-month renewal rate is ${Math.round(report.renewalRate)}%.`,
    "",
    "Key readings",
    ...findings.map((item) => `- ${item}`),
    "",
    "Where the model looks strongest",
    strongestOperator
      ? `${strongestOperator.name} currently shows the strongest packaging-to-renewal shape, with ${strongestOperator.activeBlocks} active blocks and a ${Math.round(strongestOperator.renewalRate)}% renewal rate.`
      : "The cohort is still too early to identify a strongest operator pattern.",
    "",
    "What to do next",
    report.renewalRate >= 50
      ? "Keep recruiting operators with similar profiles, and codify the operating standards behind the strongest renewals."
      : "Tighten the profile and workspace language around scope and delivery proof before expanding the cohort further.",
  ].join("\n");
}
