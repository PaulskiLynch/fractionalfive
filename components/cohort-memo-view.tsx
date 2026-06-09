"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  buildCohortFindings,
  buildCohortReport,
  buildInvestorMemo,
} from "@/lib/cohort-report";
import { useFractionalFiveStore } from "@/lib/fractional-five-store";

export function CohortMemoView() {
  const { state } = useFractionalFiveStore();
  const [copied, setCopied] = useState(false);
  const report = useMemo(
    () => buildCohortReport(state.operators, state.engagements),
    [state.engagements, state.operators],
  );
  const findings = useMemo(() => buildCohortFindings(report), [report]);
  const memo = useMemo(() => buildInvestorMemo(report, findings), [findings, report]);

  async function copyMemo() {
    await navigator.clipboard.writeText(memo);
    setCopied(true);
  }

  return (
    <main className="min-h-screen px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl space-y-6">
        <section className="rounded-[30px] border border-line bg-panel/95 p-6 soft-shadow sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted">Investor or operator memo</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight">A sendable narrative generated from live cohort data</h1>
              <p className="mt-3 max-w-3xl text-base leading-7 text-muted">
                This turns the current proof layer into a concise memo you can use for fundraising, partner updates, or operator recruiting.
              </p>
            </div>
            <button
              type="button"
              onClick={copyMemo}
              className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white hover:bg-accent-strong"
            >
              {copied ? "Copied memo" : "Copy memo"}
            </button>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/cohort-report"
              className="rounded-full border border-line bg-white px-4 py-2.5 text-sm font-semibold text-foreground"
            >
              Back to report
            </Link>
            <Link
              href="/cohort-report/print"
              className="rounded-full border border-line bg-white px-4 py-2.5 text-sm font-semibold text-foreground"
            >
              Open printable view
            </Link>
          </div>
        </section>

        <section className="rounded-[30px] border border-line bg-white p-6 soft-shadow sm:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted">Memo draft</p>
          <textarea
            readOnly
            value={memo}
            rows={22}
            className="mt-5 w-full rounded-[24px] border border-line bg-panel px-4 py-4 font-mono text-xs leading-6 text-foreground outline-none"
          />
        </section>

        <section className="rounded-[30px] border border-line bg-[#f0e0cb] p-6 soft-shadow sm:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted">Use case</p>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {[
              "Send to a potential investor as a concise traction memo.",
              "Use with operators to show what this model is actually trying to prove.",
              "Keep as a weekly founder readout while the first cohort is still small.",
            ].map((item) => (
              <div key={item} className="rounded-[22px] border border-line bg-white px-4 py-4 text-sm leading-6 text-muted">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <article className="rounded-[24px] border border-line bg-panel/95 p-5 soft-shadow">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Renewal</p>
            <p className="mt-3 text-3xl font-semibold">{Math.round(report.renewalRate)}%</p>
            <p className="mt-2 text-sm leading-6 text-muted">Current 3-month renewal rate across the cohort.</p>
          </article>
          <article className="rounded-[24px] border border-line bg-panel/95 p-5 soft-shadow">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Clarity</p>
            <p className="mt-3 text-3xl font-semibold">{report.avgClarity.toFixed(1)}/5</p>
            <p className="mt-2 text-sm leading-6 text-muted">Average operator clarity signal from live engagements.</p>
          </article>
          <article className="rounded-[24px] border border-line bg-panel/95 p-5 soft-shadow">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Trust</p>
            <p className="mt-3 text-3xl font-semibold">{report.avgTrust.toFixed(1)}/5</p>
            <p className="mt-2 text-sm leading-6 text-muted">Average client trust signal from the proof layer.</p>
          </article>
        </section>
      </div>
    </main>
  );
}
