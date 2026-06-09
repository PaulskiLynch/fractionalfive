"use client";

import Link from "next/link";
import { useMemo } from "react";
import { buildClientUpdate } from "@/lib/engagement-updates";
import { useFractionalFiveStore } from "@/lib/fractional-five-store";

export function EngagementShareView({ engagementId }: { engagementId: string }) {
  const { state } = useFractionalFiveStore();

  const engagement = useMemo(
    () => state.engagements.find((item) => item.id === engagementId),
    [engagementId, state.engagements],
  );

  if (!engagement) {
    return (
      <main className="min-h-screen px-5 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl rounded-[30px] border border-line bg-panel/95 p-8 soft-shadow">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted">Client view</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">Engagement not found</h1>
          <p className="mt-3 text-base leading-7 text-muted">
            This share view could not find a matching engagement in the current prototype state.
          </p>
          <Link
            href="/dashboard"
            className="mt-6 inline-flex rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white hover:bg-accent-strong"
          >
            Back to dashboard
          </Link>
        </div>
      </main>
    );
  }

  const totalHours = engagement.workLog
    .reduce((sum, entry) => sum + Number.parseFloat(entry.hours), 0)
    .toFixed(1);
  const clientUpdate = buildClientUpdate(engagement);

  return (
    <main className="min-h-screen px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl space-y-6">
        <section className="rounded-[34px] border border-line bg-panel/95 p-6 soft-shadow sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted">Client engagement view</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight">{engagement.client}</h1>
              <p className="mt-3 max-w-3xl text-base leading-7 text-muted">{engagement.summary}</p>
            </div>
            <div className="rounded-[24px] border border-line bg-white p-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">Current status</p>
              <p className="mt-2 text-lg font-semibold">{engagement.status}</p>
              <p className="mt-2 text-sm leading-6 text-muted">Renewal date: {engagement.renewalDate}</p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-[30px] border border-line bg-panel/95 p-6 soft-shadow sm:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted">Block definition</p>
            <div className="mt-5 grid gap-3">
              {engagement.blockDefinition.map((item) => (
                <div key={item.label} className="rounded-[22px] border border-line bg-white px-4 py-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{item.label}</p>
                  <p className="mt-2 text-sm font-semibold leading-6">{item.value}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[30px] border border-line bg-panel/95 p-6 soft-shadow sm:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted">Scope</p>
            <div className="mt-5 grid gap-4">
              <div className="rounded-[22px] border border-line bg-white px-4 py-4">
                <h2 className="text-lg font-semibold">Included</h2>
                <p className="mt-3 text-sm leading-6 text-muted">{engagement.scopeIncluded}</p>
              </div>
              <div className="rounded-[22px] border border-line bg-white px-4 py-4">
                <h2 className="text-lg font-semibold">Not included</h2>
                <p className="mt-3 text-sm leading-6 text-muted">{engagement.scopeExcluded}</p>
              </div>
            </div>
          </article>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-[30px] border border-line bg-panel/95 p-6 soft-shadow sm:p-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted">Work log</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight">What has been completed so far</h2>
              </div>
              <span className="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-foreground">
                {totalHours}h logged
              </span>
            </div>

            <div className="mt-6 overflow-hidden rounded-[24px] border border-line bg-white">
              <div className="grid grid-cols-[0.8fr_0.5fr_1.4fr_1.2fr] border-b border-line bg-panel px-4 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                <div>Date</div>
                <div>Hours</div>
                <div>Completed</div>
                <div>Next action</div>
              </div>
              {engagement.workLog.map((row) => (
                <div
                  key={row.id}
                  className="grid grid-cols-[0.8fr_0.5fr_1.4fr_1.2fr] gap-3 border-b border-line px-4 py-4 text-sm leading-6 last:border-b-0"
                >
                  <div className="font-semibold">{row.date}</div>
                  <div>{row.hours}</div>
                  <div className="text-muted">{row.done}</div>
                  <div className="text-muted">{row.next}</div>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[30px] border border-line bg-[#22392d] p-6 text-white soft-shadow sm:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-white/65">Cadence and proofs</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">A simple client-facing source of truth</h2>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-white/82">
              {engagement.cadence.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-6 space-y-3">
              {engagement.proofHistory.map((item) => (
                <div key={item} className="rounded-[20px] border border-white/12 bg-white/8 px-4 py-4 text-sm leading-6 text-white/78">
                  {item}
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="rounded-[30px] border border-line bg-panel/95 p-6 soft-shadow sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted">Prepared update</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">The client-ready recap generated from live delivery data</h2>
            </div>
            <span className="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-foreground">
              Export-ready
            </span>
          </div>
          <textarea
            readOnly
            value={clientUpdate}
            rows={16}
            className="mt-5 w-full rounded-[24px] border border-line bg-white px-4 py-4 font-mono text-xs leading-6 text-foreground outline-none"
          />
        </section>
      </div>
    </main>
  );
}
