"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { buildClientUpdate } from "@/lib/engagement-updates";
import { engagementWorkspace } from "@/lib/fractional-five-data";
import { useFractionalFiveStore } from "@/lib/fractional-five-store";

type SettingsDraft = {
  title: string;
  renewalDate: string;
  summary: string;
  scopeIncluded: string;
  scopeExcluded: string;
  cadence: string[];
};

type RequestDraft = {
  title: string;
  size: string;
  impact: string;
};

type ProofDraft = {
  boundaryQuestions: number;
  extraBlockRequests: number;
  operatorClarityRating: number;
  clientTrustRating: number;
  renewedAfterThreeMonths: boolean;
};

export function EngagementWorkspaceDemo() {
  const {
    state,
    setState,
    hydrated,
    resetState,
    activeOperator,
    visibleEngagements,
    updateEngagement,
  } = useFractionalFiveStore();
  const [draftHours, setDraftHours] = useState("1.0");
  const [draftDone, setDraftDone] = useState("");
  const [draftNext, setDraftNext] = useState("");
  const [copied, setCopied] = useState(false);

  const activeEngagement =
    visibleEngagements.find((engagement) => engagement.id === state.selectedEngagementId) ??
    visibleEngagements[0];

  const [settingsDraft, setSettingsDraft] = useState<SettingsDraft>({
    title: activeEngagement?.title ?? "",
    renewalDate: activeEngagement?.renewalDate ?? "",
    summary: activeEngagement?.summary ?? "",
    scopeIncluded: activeEngagement?.scopeIncluded ?? "",
    scopeExcluded: activeEngagement?.scopeExcluded ?? "",
    cadence: activeEngagement?.cadence ?? [],
  });
  const [requestDraft, setRequestDraft] = useState<RequestDraft>({
    title: activeEngagement?.requestTitle ?? engagementWorkspace.extraRequest.title,
    size: activeEngagement?.requestSize ?? engagementWorkspace.extraRequest.size,
    impact: activeEngagement?.requestImpact ?? engagementWorkspace.extraRequest.impact,
  });
  const [proofDraft, setProofDraft] = useState<ProofDraft>({
    boundaryQuestions: activeEngagement?.boundaryQuestions ?? 0,
    extraBlockRequests: activeEngagement?.extraBlockRequests ?? 0,
    operatorClarityRating: activeEngagement?.operatorClarityRating ?? 0,
    clientTrustRating: activeEngagement?.clientTrustRating ?? 0,
    renewedAfterThreeMonths: activeEngagement?.renewedAfterThreeMonths ?? false,
  });

  useEffect(() => {
    if (!activeEngagement) {
      return;
    }

    setSettingsDraft({
      title: activeEngagement.title,
      renewalDate: activeEngagement.renewalDate,
      summary: activeEngagement.summary,
      scopeIncluded: activeEngagement.scopeIncluded,
      scopeExcluded: activeEngagement.scopeExcluded,
      cadence: activeEngagement.cadence,
    });
    setRequestDraft({
      title: activeEngagement.requestTitle,
      size: activeEngagement.requestSize,
      impact: activeEngagement.requestImpact,
    });
    setProofDraft({
      boundaryQuestions: activeEngagement.boundaryQuestions,
      extraBlockRequests: activeEngagement.extraBlockRequests,
      operatorClarityRating: activeEngagement.operatorClarityRating,
      clientTrustRating: activeEngagement.clientTrustRating,
      renewedAfterThreeMonths: activeEngagement.renewedAfterThreeMonths,
    });
    setCopied(false);
  }, [activeEngagement]);

  const logEntries = activeEngagement?.workLog ?? [];
  const requestStatus = activeEngagement?.requestStatus ?? "pending";

  const totalHours = useMemo(
    () => logEntries.reduce((sum, entry) => sum + Number.parseFloat(entry.hours), 0).toFixed(1),
    [logEntries],
  );

  const clientUpdate = useMemo(
    () => (activeEngagement ? buildClientUpdate(activeEngagement) : ""),
    [activeEngagement],
  );

  function saveSettings() {
    if (!activeEngagement) return;

    updateEngagement(
      activeEngagement.id,
      (engagement) => ({
        ...engagement,
        title: settingsDraft.title,
        renewalDate: settingsDraft.renewalDate,
        renewal: settingsDraft.renewalDate,
        summary: settingsDraft.summary,
        scopeIncluded: settingsDraft.scopeIncluded,
        scopeExcluded: settingsDraft.scopeExcluded,
        cadence: settingsDraft.cadence,
      }),
      {
        action: "Operating contract updated",
        detail: `Saved title, renewal date, scope, and cadence updates for ${activeEngagement.client}.`,
      },
    );
  }

  function saveRequestDraft() {
    if (!activeEngagement) return;

    updateEngagement(
      activeEngagement.id,
      (engagement) => ({
        ...engagement,
        requestTitle: requestDraft.title,
        requestSize: requestDraft.size,
        requestImpact: requestDraft.impact,
      }),
      {
        action: "Extra request draft updated",
        detail: `Updated the extra-capacity request draft for ${activeEngagement.client}.`,
      },
    );
  }

  function saveProofDraft() {
    if (!activeEngagement) return;

    updateEngagement(
      activeEngagement.id,
      (engagement) => ({
        ...engagement,
        boundaryQuestions: proofDraft.boundaryQuestions,
        extraBlockRequests: proofDraft.extraBlockRequests,
        operatorClarityRating: proofDraft.operatorClarityRating,
        clientTrustRating: proofDraft.clientTrustRating,
        renewedAfterThreeMonths: proofDraft.renewedAfterThreeMonths,
      }),
      {
        action: "Proof metrics updated",
        detail: `Saved boundary, request, trust, and renewal proof metrics for ${activeEngagement.client}.`,
      },
    );
  }

  function addProofLog() {
    if (!activeEngagement) return;

    updateEngagement(
      activeEngagement.id,
      (engagement) => ({
        ...engagement,
        workLog: [
          {
            id: `log-${engagement.workLog.length + 1}`,
            date: "Thu 18 Jun",
            hours: "1.5h",
            done: "Captured rollout QA notes and linked the final issue memo.",
            next: "Prepare month-end recap and renewal recommendation.",
          },
          ...engagement.workLog,
        ],
      }),
      {
        action: "Proof log added",
        detail: `Added a structured proof log entry for ${activeEngagement.client}.`,
      },
    );
  }

  function addCustomLog() {
    if (!activeEngagement || !draftDone.trim() || !draftNext.trim()) return;

    updateEngagement(
      activeEngagement.id,
      (engagement) => ({
        ...engagement,
        workLog: [
          {
            id: `manual-${engagement.workLog.length + 1}`,
            date: "Today",
            hours: draftHours,
            done: draftDone.trim(),
            next: draftNext.trim(),
          },
          ...engagement.workLog,
        ],
      }),
      {
        action: "Work log recorded",
        detail: `Logged ${draftHours}h for ${activeEngagement.client} with a new next action.`,
      },
    );
    setDraftDone("");
    setDraftNext("");
    setDraftHours("1.0");
  }

  function setRequestStatus(nextStatus: "approved" | "declined" | "pending") {
    if (!activeEngagement) return;

    const statusMap = {
      approved: "On track",
      declined: "Needs recap",
      pending: "Extra request pending",
    } as const;

    const actionMap = {
      approved: "Extra request approved",
      declined: "Extra request declined",
      pending: "Extra request reset",
    } as const;

    updateEngagement(
      activeEngagement.id,
      (engagement) => ({
        ...engagement,
        requestStatus: nextStatus,
        status: statusMap[nextStatus],
      }),
      {
        action: actionMap[nextStatus],
        detail: `Set the extra request for ${activeEngagement.client} to ${nextStatus}.`,
      },
    );
  }

  async function copyClientUpdate() {
    if (!clientUpdate) return;

    await navigator.clipboard.writeText(clientUpdate);
    setCopied(true);
  }

  if (!activeEngagement) {
    return (
      <section className="rounded-[32px] border border-line bg-panel/95 p-6 soft-shadow sm:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted">Workspace</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight">No engagements for this operator yet</h2>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
          Switch operators or create a new engagement to start logging work, tracking decisions, and generating client updates.
        </p>
        <Link
          href="/new-engagement"
          className="mt-6 inline-flex rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white hover:bg-accent-strong"
        >
          Start new engagement
        </Link>
      </section>
    );
  }

  return (
    <>
      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <article className="rounded-[32px] border border-line bg-panel/95 p-6 soft-shadow sm:p-8">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <span className="rounded-full border border-line bg-white px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              {hydrated ? "Shared prototype state" : "Loading shared state"}
            </span>
            <button
              type="button"
              onClick={() => {
                resetState();
                setDraftDone("");
                setDraftNext("");
                setDraftHours("1.0");
              }}
              className="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-foreground hover:-translate-y-0.5"
            >
              Reset workspace
            </button>
          </div>

          <div className="mb-5 flex flex-wrap gap-3">
            {visibleEngagements.map((engagement) => (
              <button
                key={engagement.id}
                type="button"
                onClick={() =>
                  setState((current) => ({ ...current, selectedEngagementId: engagement.id }))
                }
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  engagement.id === activeEngagement.id
                    ? "bg-accent text-white"
                    : "border border-line bg-white text-foreground"
                }`}
              >
                {engagement.client}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted">
                Operator / {activeOperator.profile.name}
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">{activeEngagement.title}</h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-muted">{activeEngagement.summary}</p>
            </div>

            <div className="rounded-[24px] border border-line bg-white p-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Current status</p>
              <p className="mt-2 text-xl font-semibold">{activeEngagement.status}</p>
              <p className="mt-2 text-sm leading-6 text-muted">
                Renewal check scheduled for {activeEngagement.renewalDate}
              </p>
              <Link
                href={`/engagements/${activeEngagement.id}`}
                className="mt-4 inline-flex rounded-full border border-line bg-panel px-4 py-2 text-sm font-semibold text-foreground"
              >
                Open client view
              </Link>
            </div>
          </div>
        </article>

        <aside className="rounded-[32px] border border-line bg-[#f0e0cb] p-6 soft-shadow sm:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted">Block definition</p>
          <div className="mt-5 grid gap-3">
            {activeEngagement.blockDefinition.map((item) => (
              <div key={item.label} className="rounded-[22px] border border-line bg-white px-4 py-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{item.label}</p>
                <p className="mt-2 text-sm font-semibold leading-6">{item.value}</p>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="rounded-[32px] border border-line bg-panel/95 p-6 soft-shadow sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted">Engagement settings</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight">Save contract changes as deliberate auditable moments</h3>
          </div>
          <button
            type="button"
            onClick={saveSettings}
            className="rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent-strong"
          >
            Save settings
          </button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="text-sm text-muted">
            <span className="mb-2 block font-semibold text-foreground">Engagement title</span>
            <input
              value={settingsDraft.title}
              onChange={(event) =>
                setSettingsDraft((current) => ({ ...current, title: event.target.value }))
              }
              className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm text-foreground outline-none"
            />
          </label>
          <label className="text-sm text-muted">
            <span className="mb-2 block font-semibold text-foreground">Renewal date</span>
            <input
              value={settingsDraft.renewalDate}
              onChange={(event) =>
                setSettingsDraft((current) => ({ ...current, renewalDate: event.target.value }))
              }
              className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm text-foreground outline-none"
            />
          </label>
          <label className="text-sm text-muted sm:col-span-2">
            <span className="mb-2 block font-semibold text-foreground">Summary</span>
            <textarea
              value={settingsDraft.summary}
              onChange={(event) =>
                setSettingsDraft((current) => ({ ...current, summary: event.target.value }))
              }
              rows={3}
              className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm text-foreground outline-none"
            />
          </label>
          <label className="text-sm text-muted">
            <span className="mb-2 block font-semibold text-foreground">Scope included</span>
            <textarea
              value={settingsDraft.scopeIncluded}
              onChange={(event) =>
                setSettingsDraft((current) => ({ ...current, scopeIncluded: event.target.value }))
              }
              rows={4}
              className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm text-foreground outline-none"
            />
          </label>
          <label className="text-sm text-muted">
            <span className="mb-2 block font-semibold text-foreground">Scope excluded</span>
            <textarea
              value={settingsDraft.scopeExcluded}
              onChange={(event) =>
                setSettingsDraft((current) => ({ ...current, scopeExcluded: event.target.value }))
              }
              rows={4}
              className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm text-foreground outline-none"
            />
          </label>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {settingsDraft.cadence.map((cadenceItem, index) => (
            <label key={`${activeEngagement.id}-cadence-${index}`} className="text-sm text-muted">
              <span className="mb-2 block font-semibold text-foreground">Cadence {index + 1}</span>
              <input
                value={cadenceItem}
                onChange={(event) =>
                  setSettingsDraft((current) => ({
                    ...current,
                    cadence: current.cadence.map((item, itemIndex) =>
                      itemIndex === index ? event.target.value : item,
                    ),
                  }))
                }
                className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm text-foreground outline-none"
              />
            </label>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <article className="rounded-[32px] border border-line bg-panel/95 p-6 soft-shadow sm:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted">Client update export</p>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <p className="max-w-2xl text-sm leading-6 text-muted">
              Generate a client-ready update from the live engagement state instead of rewriting the same recap every week.
            </p>
            <button
              type="button"
              onClick={copyClientUpdate}
              className="rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent-strong"
            >
              {copied ? "Copied update" : "Copy update"}
            </button>
          </div>
          <textarea
            readOnly
            value={clientUpdate}
            rows={18}
            className="mt-5 w-full rounded-[24px] border border-line bg-white px-4 py-4 font-mono text-xs leading-6 text-foreground outline-none"
          />
        </article>

        <article className="rounded-[32px] border border-line bg-panel/95 p-6 soft-shadow sm:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted">Audit timeline</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight">See which decisions changed the engagement</h3>
          <div className="mt-6 space-y-3">
            {activeEngagement.auditTrail.map((event) => (
              <div key={event.id} className="rounded-[22px] border border-line bg-white px-4 py-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-foreground">{event.action}</p>
                  <span className="rounded-full bg-panel px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                    {event.date}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-muted">{event.detail}</p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                  {event.actor}
                </p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="rounded-[32px] border border-line bg-panel/95 p-6 soft-shadow sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted">Proof tracker</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight">Capture the evidence behind clarity, trust, and renewal</h3>
          </div>
          <button
            type="button"
            onClick={saveProofDraft}
            className="rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent-strong"
          >
            Save proof metrics
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <label className="text-sm text-muted">
            <span className="mb-2 block font-semibold text-foreground">Boundary questions</span>
            <input
              type="number"
              min={0}
              value={proofDraft.boundaryQuestions}
              onChange={(event) =>
                setProofDraft((current) => ({
                  ...current,
                  boundaryQuestions: Math.max(0, Number(event.target.value) || 0),
                }))
              }
              className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm text-foreground outline-none"
            />
          </label>
          <label className="text-sm text-muted">
            <span className="mb-2 block font-semibold text-foreground">Extra block requests</span>
            <input
              type="number"
              min={0}
              value={proofDraft.extraBlockRequests}
              onChange={(event) =>
                setProofDraft((current) => ({
                  ...current,
                  extraBlockRequests: Math.max(0, Number(event.target.value) || 0),
                }))
              }
              className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm text-foreground outline-none"
            />
          </label>
          <label className="text-sm text-muted">
            <span className="mb-2 block font-semibold text-foreground">Operator clarity</span>
            <select
              value={proofDraft.operatorClarityRating}
              onChange={(event) =>
                setProofDraft((current) => ({
                  ...current,
                  operatorClarityRating: Number(event.target.value),
                }))
              }
              className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm text-foreground outline-none"
            >
              {[0, 1, 2, 3, 4, 5].map((value) => (
                <option key={`workspace-clarity-${value}`} value={value}>
                  {value === 0 ? "Unrated" : `${value}/5`}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm text-muted">
            <span className="mb-2 block font-semibold text-foreground">Client trust</span>
            <select
              value={proofDraft.clientTrustRating}
              onChange={(event) =>
                setProofDraft((current) => ({
                  ...current,
                  clientTrustRating: Number(event.target.value),
                }))
              }
              className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm text-foreground outline-none"
            >
              {[0, 1, 2, 3, 4, 5].map((value) => (
                <option key={`workspace-trust-${value}`} value={value}>
                  {value === 0 ? "Unrated" : `${value}/5`}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm text-muted">
            <span className="mb-2 block font-semibold text-foreground">3-month renewal</span>
            <select
              value={proofDraft.renewedAfterThreeMonths ? "yes" : "no"}
              onChange={(event) =>
                setProofDraft((current) => ({
                  ...current,
                  renewedAfterThreeMonths: event.target.value === "yes",
                }))
              }
              className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm text-foreground outline-none"
            >
              <option value="no">Not yet</option>
              <option value="yes">Renewed</option>
            </select>
          </label>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <article className="rounded-[32px] border border-line bg-panel/95 p-6 soft-shadow sm:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted">Scope of work</p>
          <div className="mt-6 grid gap-4">
            <div className="rounded-[24px] border border-line bg-white p-5">
              <h3 className="text-lg font-semibold">This block includes</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{activeEngagement.scopeIncluded}</p>
            </div>
            <div className="rounded-[24px] border border-line bg-white p-5">
              <h3 className="text-lg font-semibold">This block does not include</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{activeEngagement.scopeExcluded}</p>
            </div>
          </div>

          <div className="mt-6 rounded-[24px] border border-line bg-[#22392d] p-5 text-white">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/65">Weekly cadence</p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-white/82">
              {activeEngagement.cadence.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </article>

        <article className="rounded-[32px] border border-line bg-panel/95 p-6 soft-shadow sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted">Work log</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">Visible delivery, not hidden labor</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-foreground">
                {totalHours}h logged
              </span>
              <button
                type="button"
                onClick={addProofLog}
                className="rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent-strong"
              >
                Add proof log
              </button>
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-[24px] border border-line bg-white">
            <div className="grid grid-cols-[0.9fr_0.6fr_1.3fr_1.2fr] border-b border-line bg-panel px-4 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              <div>Date</div>
              <div>Hours</div>
              <div>What was done</div>
              <div>Next action</div>
            </div>
            {logEntries.map((row) => (
              <div
                key={row.id}
                className="grid grid-cols-[0.9fr_0.6fr_1.3fr_1.2fr] gap-3 border-b border-line px-4 py-4 text-sm leading-6 last:border-b-0"
              >
                <div className="font-semibold">{row.date}</div>
                <div>{row.hours}</div>
                <div className="text-muted">{row.done}</div>
                <div className="text-muted">{row.next}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-[24px] border border-line bg-white p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">Add work log entry</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <label className="text-sm text-muted">
                <span className="mb-2 block font-semibold text-foreground">Hours</span>
                <input
                  value={draftHours}
                  onChange={(event) => setDraftHours(event.target.value)}
                  className="w-full rounded-2xl border border-line bg-panel px-4 py-3 text-sm text-foreground outline-none"
                />
              </label>
              <label className="text-sm text-muted sm:col-span-2">
                <span className="mb-2 block font-semibold text-foreground">What was done</span>
                <input
                  value={draftDone}
                  onChange={(event) => setDraftDone(event.target.value)}
                  className="w-full rounded-2xl border border-line bg-panel px-4 py-3 text-sm text-foreground outline-none"
                />
              </label>
              <label className="text-sm text-muted sm:col-span-2">
                <span className="mb-2 block font-semibold text-foreground">Next action</span>
                <input
                  value={draftNext}
                  onChange={(event) => setDraftNext(event.target.value)}
                  className="w-full rounded-2xl border border-line bg-panel px-4 py-3 text-sm text-foreground outline-none"
                />
              </label>
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={addCustomLog}
                  className="w-full rounded-full bg-accent px-4 py-3 text-sm font-semibold text-white hover:bg-accent-strong"
                >
                  Save log entry
                </button>
              </div>
            </div>
          </div>
        </article>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <article className="rounded-[32px] border border-line bg-panel/95 p-6 soft-shadow sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted">Extra block request</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">Keep scope drift visible and negotiable</h3>
            </div>
            <button
              type="button"
              onClick={saveRequestDraft}
              className="rounded-full border border-line bg-white px-4 py-2.5 text-sm font-semibold text-foreground hover:-translate-y-0.5"
            >
              Save request draft
            </button>
          </div>
          <div className="mt-5 rounded-[24px] border border-line bg-white p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold">{requestDraft.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{engagementWorkspace.extraRequest.reason}</p>
              </div>
              <span className="rounded-full bg-panel px-3 py-1 font-mono text-xs uppercase tracking-[0.18em] text-muted">
                {requestStatus}
              </span>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-panel px-4 py-4 text-sm">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">Requested add-on</p>
                <p className="mt-2 font-semibold">{requestDraft.size}</p>
              </div>
              <div className="rounded-2xl bg-panel px-4 py-4 text-sm">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">Impact</p>
                <p className="mt-2 font-semibold">{requestDraft.impact}</p>
              </div>
              <div className="rounded-2xl bg-panel px-4 py-4 text-sm">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">Decision</p>
                <p className="mt-2 font-semibold">{engagementWorkspace.extraRequest.decision}</p>
              </div>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <label className="text-sm text-muted">
                <span className="mb-2 block font-semibold text-foreground">Request title</span>
                <input
                  value={requestDraft.title}
                  onChange={(event) =>
                    setRequestDraft((current) => ({ ...current, title: event.target.value }))
                  }
                  className="w-full rounded-2xl border border-line bg-panel px-4 py-3 text-sm text-foreground outline-none"
                />
              </label>
              <label className="text-sm text-muted">
                <span className="mb-2 block font-semibold text-foreground">Requested size</span>
                <input
                  value={requestDraft.size}
                  onChange={(event) =>
                    setRequestDraft((current) => ({ ...current, size: event.target.value }))
                  }
                  className="w-full rounded-2xl border border-line bg-panel px-4 py-3 text-sm text-foreground outline-none"
                />
              </label>
              <label className="text-sm text-muted">
                <span className="mb-2 block font-semibold text-foreground">Impact</span>
                <input
                  value={requestDraft.impact}
                  onChange={(event) =>
                    setRequestDraft((current) => ({ ...current, impact: event.target.value }))
                  }
                  className="w-full rounded-2xl border border-line bg-panel px-4 py-3 text-sm text-foreground outline-none"
                />
              </label>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setRequestStatus("approved")}
                className="rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent-strong"
              >
                Approve request
              </button>
              <button
                type="button"
                onClick={() => setRequestStatus("declined")}
                className="rounded-full border border-line bg-white px-4 py-2.5 text-sm font-semibold text-foreground hover:-translate-y-0.5"
              >
                Decline request
              </button>
              <button
                type="button"
                onClick={() => setRequestStatus("pending")}
                className="rounded-full border border-line bg-white px-4 py-2.5 text-sm font-semibold text-foreground hover:-translate-y-0.5"
              >
                Reset to pending
              </button>
            </div>
          </div>
        </article>

        <article className="rounded-[32px] border border-line bg-panel/95 p-6 soft-shadow sm:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted">Proof history</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight">Show outcomes and context in one place</h3>
          <ul className="mt-6 space-y-3">
            {activeEngagement.proofHistory.map((item) => (
              <li key={item} className="rounded-[22px] border border-line bg-white px-4 py-4 text-sm leading-6 text-muted">
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-5 rounded-[22px] border border-line bg-white px-4 py-4 text-sm leading-6 text-muted">
            <span className="font-semibold text-foreground">Live request draft:</span> {requestDraft.title}
          </div>
        </article>
      </section>
    </>
  );
}
