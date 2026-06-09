import type { DashboardEngagement } from "@/lib/fractional-five-data";

export function buildClientUpdate(engagement: DashboardEngagement) {
  const recentLog = engagement.workLog[0];
  const completedItems = engagement.proofHistory.slice(0, 3).map((item) => `- ${item}`).join("\n");
  const cadence = engagement.cadence.slice(0, 3).map((item) => `- ${item}`).join("\n");
  const nextActions = engagement.workLog
    .slice(0, 2)
    .map((entry) => `- ${entry.next}`)
    .join("\n");

  return [
    `Subject: ${engagement.client} weekly update`,
    "",
    `Hi ${engagement.client} team,`,
    "",
    `Here is the current update for your ${engagement.block} ${engagement.focus.toLowerCase()} block.`,
    "",
    `Status: ${engagement.status}`,
    `Renewal date: ${engagement.renewalDate}`,
    "",
    "What moved forward",
    completedItems || "- Engagement setup is complete and delivery is underway.",
    "",
    "Most recent work log",
    recentLog ? `- ${recentLog.date}: ${recentLog.done}` : "- No work log entries yet.",
    "",
    "Next actions",
    nextActions || "- Confirm the next delivery milestone during the upcoming cadence slot.",
    "",
    "Cadence reminder",
    cadence,
    "",
    `Extra request status: ${engagement.requestStatus}`,
    engagement.requestTitle !== "No extra request yet"
      ? `Current extra request: ${engagement.requestTitle} (${engagement.requestSize})`
      : "Current extra request: none",
    "",
    "Thanks,",
    "FractionalFive operator",
  ].join("\n");
}
