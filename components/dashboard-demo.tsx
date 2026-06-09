"use client";

import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";
import { weeklyBlocks } from "@/lib/fractional-five-data";
import { useFractionalFiveStore } from "@/lib/fractional-five-store";

export function DashboardDemo() {
  const {
    hydrated,
    resetState,
    activeOperator,
    visibleEngagements,
    updateEngagement,
  } = useFractionalFiveStore();
  const [statusFilter, setStatusFilter] = useState<"all" | "attention">("all");
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);

  const filteredEngagements = useMemo(() => {
    const normalized = deferredSearch.trim().toLowerCase();

    return visibleEngagements.filter((engagement) => {
      if (statusFilter === "attention" && engagement.status === "On track") {
        return false;
      }

      if (!normalized) {
        return true;
      }

      return (
        engagement.client.toLowerCase().includes(normalized) ||
        engagement.focus.toLowerCase().includes(normalized)
      );
    });
  }, [deferredSearch, statusFilter, visibleEngagements]);

  const totalAllocatedDays = useMemo(
    () => filteredEngagements.reduce((sum, engagement) => sum + engagement.allocatedDays, 0),
    [filteredEngagements],
  );
  const avgBoundaryQuestions = useMemo(() => {
    if (!visibleEngagements.length) return "0.0";
    return (
      visibleEngagements.reduce((sum, engagement) => sum + engagement.boundaryQuestions, 0) /
      visibleEngagements.length
    ).toFixed(1);
  }, [visibleEngagements]);

  const pendingRequests = useMemo(
    () =>
      filteredEngagements.filter((engagement) => engagement.status === "Extra request pending").length,
    [filteredEngagements],
  );
  const totalExtraRequests = useMemo(
    () => visibleEngagements.reduce((sum, engagement) => sum + engagement.extraBlockRequests, 0),
    [visibleEngagements],
  );
  const avgOperatorClarity = useMemo(() => {
    const rated = visibleEngagements.filter((engagement) => engagement.operatorClarityRating > 0);
    if (!rated.length) return "0.0";
    return (
      rated.reduce((sum, engagement) => sum + engagement.operatorClarityRating, 0) / rated.length
    ).toFixed(1);
  }, [visibleEngagements]);
  const avgClientTrust = useMemo(() => {
    const rated = visibleEngagements.filter((engagement) => engagement.clientTrustRating > 0);
    if (!rated.length) return "0.0";
    return (
      rated.reduce((sum, engagement) => sum + engagement.clientTrustRating, 0) / rated.length
    ).toFixed(1);
  }, [visibleEngagements]);
  const renewalRate = useMemo(() => {
    if (!visibleEngagements.length) return "0%";
    const renewed = visibleEngagements.filter((engagement) => engagement.renewedAfterThreeMonths).length;
    return `${Math.round((renewed / visibleEngagements.length) * 100)}%`;
  }, [visibleEngagements]);

  const renewalsSoon = useMemo(
    () =>
      filteredEngagements.filter((engagement) =>
        ["12 Jul", "29 Aug", "18 Aug"].includes(engagement.renewal),
      ).length,
    [filteredEngagements],
  );

  const renewalQueue = useMemo(
    () =>
      visibleEngagements.filter(
        (engagement) => engagement.status !== "Completed" && engagement.status !== "Archived",
      ),
    [visibleEngagements],
  );

  const openProfileBlocks = useMemo(
    () => activeOperator.profile.blocks.filter((block) => block.available).length,
    [activeOperator.profile.blocks],
  );

  const recentAuditEvents = useMemo(
    () =>
      visibleEngagements
        .flatMap((engagement) =>
          engagement.auditTrail.slice(0, 2).map((event) => ({
            ...event,
            client: engagement.client,
          })),
        )
        .slice(0, 6),
    [visibleEngagements],
  );

  const actionQueue = [
    "Review any pending extra-capacity request before it becomes invisible labor",
    "Send the next renewal note before the block turns into auto-renewal by habit",
    "Log this week's proof summary so the next client update writes itself",
    "Check whether the current open blocks still match the real client cap",
  ];

  function cycleStatus(id: string) {
    const currentStatus = visibleEngagements.find((engagement) => engagement.id === id)?.status ?? "On track";
    const nextStatus =
      currentStatus === "On track"
        ? "Needs recap"
        : currentStatus === "Needs recap"
          ? "Extra request pending"
          : currentStatus === "Extra request pending"
            ? "Renewal due"
            : "On track";

    updateEngagement(
      id,
      (engagement) => ({ ...engagement, status: nextStatus }),
      {
        action: "Status cycled from dashboard",
        detail: `Changed ${visibleEngagements.find((engagement) => engagement.id === id)?.client ?? "engagement"} to ${nextStatus}.`,
      },
    );
  }

  function markEngagement(id: string, status: "Completed" | "Archived" | "Renewal due") {
    updateEngagement(
      id,
      (engagement) => ({ ...engagement, status }),
      {
        action: "Lifecycle status updated",
        detail: `Marked ${visibleEngagements.find((engagement) => engagement.id === id)?.client ?? "engagement"} as ${status}.`,
      },
    );
  }

  function resetDashboard() {
    resetState();
    setStatusFilter("all");
    setSearch("");
  }

  function setRating(
    id: string,
    field: "operatorClarityRating" | "clientTrustRating",
    value: number,
  ) {
    updateEngagement(
      id,
      (engagement) => ({ ...engagement, [field]: value }),
      {
        action: "Proof rating updated",
        detail: `Saved ${field === "operatorClarityRating" ? "operator clarity" : "client trust"} rating for ${visibleEngagements.find((engagement) => engagement.id === id)?.client ?? "engagement"}.`,
      },
    );
  }

  function setCount(
    id: string,
    field: "boundaryQuestions" | "extraBlockRequests",
    value: number,
  ) {
    updateEngagement(
      id,
      (engagement) => ({ ...engagement, [field]: Math.max(0, value) }),
      {
        action: "Proof count updated",
        detail: `Saved ${field === "boundaryQuestions" ? "boundary question" : "extra request"} count for ${visibleEngagements.find((engagement) => engagement.id === id)?.client ?? "engagement"}.`,
      },
    );
  }

  function toggleRenewed(id: string) {
    const engagement = visibleEngagements.find((item) => item.id === id);
    if (!engagement) return;

    updateEngagement(
      id,
      (current) => ({
        ...current,
        renewedAfterThreeMonths: !current.renewedAfterThreeMonths,
      }),
      {
        action: "Renewal proof toggled",
        detail: `${engagement.client} marked as ${engagement.renewedAfterThreeMonths ? "not renewed" : "renewed"} after three months.`,
      },
    );
  }

  return (
    <>
      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <article className="rounded-[32px] border border-line bg-[#22392d] p-6 text-white soft-shadow sm:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-white/65">Operator snapshot</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight">
            {activeOperator.profile.name}&apos;s live capacity view.
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              { label: "Visible engagements", value: String(filteredEngagements.length) },
              { label: "Allocated days this week", value: totalAllocatedDays.toFixed(1) },
              { label: "Avg. boundary questions", value: avgBoundaryQuestions },
              { label: "Extra requests logged", value: String(totalExtraRequests) },
              { label: "3-month renewal rate", value: renewalRate },
              { label: "Open profile blocks", value: String(openProfileBlocks) },
            ].map((stat) => (
              <div key={stat.label} className="rounded-[22px] border border-white/12 bg-white/8 px-4 py-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/62">{stat.label}</p>
                <p className="mt-3 text-2xl font-semibold">{stat.value}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[32px] border border-line bg-panel/95 p-6 soft-shadow sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted">This week's block view</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                Capacity is planned as blocks, not as background stress.
              </h3>
            </div>
            <span className="rounded-full border border-line bg-white px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-muted">
              Max client cap: {activeOperator.profile.maxClients}
            </span>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-5">
            {weeklyBlocks.map((item) => (
              <div key={item.day} className="rounded-[24px] border border-line bg-white p-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{item.day}</p>
                <p className="mt-3 text-sm font-semibold leading-6">{item.load}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="rounded-[32px] border border-line bg-panel/95 p-6 soft-shadow sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted">Proof model</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">The cohort evidence this operator is generating</h2>
          </div>
          <span className="rounded-full border border-line bg-white px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-muted">
            profile setup: {activeOperator.profileSetupHours.toFixed(1)}h
          </span>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {[
            { label: "Profile creation time", value: `${activeOperator.profileSetupHours.toFixed(1)}h`, note: "How hard packaging feels" },
            { label: "Boundary questions", value: avgBoundaryQuestions, note: "Where ambiguity still lives" },
            { label: "Extra block requests", value: String(totalExtraRequests), note: "Whether scope drift is explicit" },
            { label: "Operator clarity rating", value: `${avgOperatorClarity}/5`, note: "Did clients understand availability?" },
            { label: "Client trust rating", value: `${avgClientTrust}/5`, note: "Do clients know what to expect?" },
          ].map((item) => (
            <div key={item.label} className="rounded-[24px] border border-line bg-white p-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{item.label}</p>
              <p className="mt-3 text-2xl font-semibold">{item.value}</p>
              <p className="mt-2 text-sm leading-6 text-muted">{item.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[32px] border border-line bg-panel/95 p-6 soft-shadow sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted">Current engagements</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">All live blocks for the active operator</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <span className="rounded-full border border-line bg-white px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              {hydrated ? "Shared prototype state" : "Loading shared state"}
            </span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Filter by client or focus"
              className="rounded-full border border-line bg-white px-4 py-2.5 text-sm text-foreground outline-none"
            />
            <button
              type="button"
              onClick={() => setStatusFilter("all")}
              className={`rounded-full px-4 py-2.5 text-sm font-semibold ${
                statusFilter === "all"
                  ? "bg-accent text-white"
                  : "border border-line bg-white text-foreground"
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("attention")}
              className={`rounded-full px-4 py-2.5 text-sm font-semibold ${
                statusFilter === "attention"
                  ? "bg-accent text-white"
                  : "border border-line bg-white text-foreground"
              }`}
            >
              Needs attention
            </button>
            <button
              type="button"
              onClick={resetDashboard}
              className="rounded-full border border-line bg-white px-4 py-2.5 text-sm font-semibold text-foreground"
            >
              Reset dashboard
            </button>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-[26px] border border-line bg-white">
          <div className="grid grid-cols-[1fr_0.9fr_1fr_0.7fr_0.8fr] border-b border-line bg-panel px-4 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            <div>Client</div>
            <div>Block</div>
            <div>Focus</div>
            <div>Renewal</div>
            <div>Status</div>
          </div>
          {filteredEngagements.map((row) => (
            <div
              key={row.id}
              className="grid grid-cols-[1fr_0.9fr_1fr_0.7fr_0.8fr] gap-3 border-b border-line px-4 py-4 text-sm leading-6 last:border-b-0"
            >
              <div className="font-semibold">{row.client}</div>
              <div>{row.block}</div>
              <div className="text-muted">{row.focus}</div>
              <div>{row.renewal}</div>
              <div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => cycleStatus(row.id)}
                    className="rounded-full bg-panel px-3 py-1 text-xs font-semibold text-foreground hover:bg-panel-strong"
                  >
                    {row.status}
                  </button>
                  <Link
                    href={`/engagements/${row.id}`}
                    className="rounded-full border border-line bg-white px-3 py-1 text-xs font-semibold text-foreground"
                  >
                    Share
                  </Link>
                </div>
              </div>
            </div>
          ))}
          {!filteredEngagements.length ? (
            <div className="px-4 py-6 text-sm text-muted">No engagements match this filter.</div>
          ) : null}
        </div>

        <div className="mt-6 rounded-[24px] border border-line bg-white p-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">Structured onboarding</p>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <p className="max-w-2xl text-sm leading-6 text-muted">
              Start a new engagement with the dedicated onboarding flow so cadence, scope, and renewal details are set cleanly from the beginning.
            </p>
            <Link
              href="/new-engagement"
              className="rounded-full bg-accent px-4 py-3 text-sm font-semibold text-white hover:bg-accent-strong"
            >
              Start new engagement
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <article className="rounded-[32px] border border-line bg-panel/95 p-6 soft-shadow sm:p-8 lg:col-span-2">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted">Per-engagement proof points</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight">Track the signals that validate the thesis, not vanity usage</h3>
          <div className="mt-6 overflow-hidden rounded-[26px] border border-line bg-white">
            <div className="grid grid-cols-[1fr_0.8fr_0.8fr_0.8fr_0.8fr_0.8fr] border-b border-line bg-panel px-4 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              <div>Client</div>
              <div>Boundary Qs</div>
              <div>Extra requests</div>
              <div>Operator clarity</div>
              <div>Client trust</div>
              <div>3-month renewal</div>
            </div>
            {visibleEngagements.map((engagement) => (
              <div
                key={`proof-${engagement.id}`}
                className="grid grid-cols-[1fr_0.8fr_0.8fr_0.8fr_0.8fr_0.8fr] gap-3 border-b border-line px-4 py-4 text-sm leading-6 last:border-b-0"
              >
                <div className="font-semibold">{engagement.client}</div>
                <div>
                  <input
                    type="number"
                    min={0}
                    value={engagement.boundaryQuestions}
                    onChange={(event) =>
                      setCount(engagement.id, "boundaryQuestions", Number(event.target.value) || 0)
                    }
                    className="w-20 rounded-full border border-line bg-panel px-3 py-1 text-xs font-semibold text-foreground outline-none"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    min={0}
                    value={engagement.extraBlockRequests}
                    onChange={(event) =>
                      setCount(engagement.id, "extraBlockRequests", Number(event.target.value) || 0)
                    }
                    className="w-20 rounded-full border border-line bg-panel px-3 py-1 text-xs font-semibold text-foreground outline-none"
                  />
                </div>
                <div>
                  <select
                    value={engagement.operatorClarityRating}
                    onChange={(event) =>
                      setRating(engagement.id, "operatorClarityRating", Number(event.target.value))
                    }
                    className="rounded-full border border-line bg-panel px-3 py-1 text-xs font-semibold text-foreground outline-none"
                  >
                    {[0, 1, 2, 3, 4, 5].map((value) => (
                      <option key={`clarity-${engagement.id}-${value}`} value={value}>
                        {value === 0 ? "unrated" : `${value}/5`}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <select
                    value={engagement.clientTrustRating}
                    onChange={(event) =>
                      setRating(engagement.id, "clientTrustRating", Number(event.target.value))
                    }
                    className="rounded-full border border-line bg-panel px-3 py-1 text-xs font-semibold text-foreground outline-none"
                  >
                    {[0, 1, 2, 3, 4, 5].map((value) => (
                      <option key={`trust-${engagement.id}-${value}`} value={value}>
                        {value === 0 ? "unrated" : `${value}/5`}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => toggleRenewed(engagement.id)}
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      engagement.renewedAfterThreeMonths
                        ? "bg-accent text-white"
                        : "border border-line bg-white text-foreground"
                    }`}
                  >
                    {engagement.renewedAfterThreeMonths ? "renewed" : "not yet"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[32px] border border-line bg-panel/95 p-6 soft-shadow sm:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted">Renewal queue</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight">
            Handle renewals, completions, and archives deliberately
          </h3>
          <div className="mt-6 space-y-3">
            {renewalQueue.map((engagement) => (
              <div key={`renewal-${engagement.id}`} className="rounded-[22px] border border-line bg-white px-4 py-4">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{engagement.client}</p>
                    <p className="mt-1 text-sm leading-6 text-muted">
                      {engagement.block} / renews {engagement.renewal}
                    </p>
                  </div>
                  <span className="rounded-full bg-panel px-3 py-1 text-xs font-semibold text-foreground">
                    {engagement.status}
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => markEngagement(engagement.id, "Renewal due")}
                    className="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-foreground"
                  >
                    Mark renewal due
                  </button>
                  <button
                    type="button"
                    onClick={() => markEngagement(engagement.id, "Completed")}
                    className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-strong"
                  >
                    Mark completed
                  </button>
                  <button
                    type="button"
                    onClick={() => markEngagement(engagement.id, "Archived")}
                    className="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-foreground"
                  >
                    Archive
                  </button>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[32px] border border-line bg-panel/95 p-6 soft-shadow sm:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted">Action queue</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight">What needs operator attention right now</h3>
          <ul className="mt-6 space-y-3">
            {actionQueue.map((item) => (
              <li key={item} className="rounded-[22px] border border-line bg-white px-4 py-4 text-sm leading-6 text-muted">
                {item}
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-[32px] border border-line bg-panel/95 p-6 soft-shadow sm:p-8 lg:col-span-2">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted">Recent audit events</p>
          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {recentAuditEvents.map((event) => (
              <div key={event.id} className="rounded-[22px] border border-line bg-white px-4 py-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-foreground">{event.action}</p>
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                    {event.date}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-muted">{event.detail}</p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                  {event.client}
                </p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[32px] border border-line bg-[#f0e0cb] p-6 soft-shadow sm:p-8 lg:col-span-2">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted">Why this screen matters</p>
          <div className="mt-5 space-y-4 text-sm leading-7 text-muted">
            <p>
              The dashboard is not a project-management clone. It is an independence-preserving control surface for a
              single operator juggling several recurring service blocks.
            </p>
            <p>
              Multi-operator mode makes the prototype more realistic for a small collective without introducing accounts
              or permissions yet. It keeps each operator&apos;s capacity and audit trail separate.
            </p>
            <p>
              The proof layer matters because this thesis succeeds on renewal, clarity, and trust, not on abstract activity counts.
            </p>
            <p className="font-semibold text-foreground">
              If this works, one person can run a small portfolio of recurring client work with less ambiguity and less
              hidden administrative drag.
            </p>
          </div>
        </article>
      </section>
    </>
  );
}
