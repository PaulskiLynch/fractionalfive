"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  buildCohortFindings,
  buildCohortReport,
} from "@/lib/cohort-report";
import { useFractionalFiveStore } from "@/lib/fractional-five-store";

export function CohortPrintView() {
  const { state } = useFractionalFiveStore();
  const report = useMemo(
    () => buildCohortReport(state.operators, state.engagements),
    [state.engagements, state.operators],
  );
  const findings = useMemo(() => buildCohortFindings(report), [report]);

  function printReport() {
    window.print();
  }

  return (
    <main className="min-h-screen px-5 py-8 sm:px-8 lg:px-12 print:px-0 print:py-0">
      <div className="mx-auto max-w-5xl space-y-6 print:max-w-none print:space-y-4">
        <section className="rounded-[30px] border border-line bg-panel/95 p-6 soft-shadow print:rounded-none print:border-none print:bg-white print:p-0 print:shadow-none">
          <div className="flex flex-wrap items-start justify-between gap-4 print:block">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted">FourHops / printable cohort report</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight">Structured fractional delivery cohort summary</h1>
              <p className="mt-3 max-w-3xl text-base leading-7 text-muted">
                A printable view of the current cohort proof: packaging effort, trust signals, scope pressure, and renewal evidence.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 print:hidden">
              <button
                type="button"
                onClick={printReport}
                className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white hover:bg-accent-strong"
              >
                Print report
              </button>
              <Link
                href="/cohort-report"
                className="rounded-full border border-line bg-white px-5 py-3 text-sm font-semibold text-foreground"
              >
                Back to report
              </Link>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3 print:break-inside-avoid-page">
          {[
            { label: "Operators", value: String(report.operators) },
            { label: "Engagements", value: String(report.engagements) },
            { label: "3-month renewal rate", value: `${Math.round(report.renewalRate)}%` },
            { label: "Avg. setup time", value: `${report.avgProfileSetup.toFixed(1)}h` },
            { label: "Avg. clarity", value: `${report.avgClarity.toFixed(1)}/5` },
            { label: "Avg. client trust", value: `${report.avgTrust.toFixed(1)}/5` },
          ].map((item) => (
            <div key={item.label} className="rounded-[24px] border border-line bg-white p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{item.label}</p>
              <p className="mt-3 text-2xl font-semibold">{item.value}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] print:break-before-page">
          <article className="rounded-[24px] border border-line bg-white p-5 print:break-inside-avoid-page">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted">Findings</p>
            <div className="mt-4 space-y-3">
              {findings.map((item) => (
                <div key={item} className="rounded-[18px] border border-line bg-panel px-4 py-4 text-sm leading-6 text-muted">
                  {item}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[24px] border border-line bg-white p-5 print:break-inside-avoid-page">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted">Focus mix</p>
            <div className="mt-4 space-y-3">
              {report.focusBreakdown.map(([focus, count]) => (
                <div key={focus} className="flex items-center justify-between rounded-[18px] border border-line bg-panel px-4 py-4 text-sm">
                  <span className="font-semibold">{focus}</span>
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted">{count}</span>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="rounded-[24px] border border-line bg-white p-5 print:break-before-page">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted">Operator breakdown</p>
          <div className="mt-4 overflow-hidden rounded-[20px] border border-line">
            <div className="grid grid-cols-[1fr_0.7fr_0.7fr_0.7fr_0.7fr] border-b border-line bg-panel px-4 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              <div>Operator</div>
              <div>Active</div>
              <div>Setup</div>
              <div>Boundary</div>
              <div>Renewal</div>
            </div>
            {report.operatorRows.map((row) => (
              <div
                key={row.id}
                className="grid grid-cols-[1fr_0.7fr_0.7fr_0.7fr_0.7fr] gap-3 border-b border-line px-4 py-4 text-sm leading-6 last:border-b-0"
              >
                <div>
                  <p className="font-semibold">{row.name}</p>
                  <p className="text-muted">{row.role}</p>
                </div>
                <div>{row.activeBlocks}</div>
                <div>{row.setupHours.toFixed(1)}h</div>
                <div>{row.avgBoundaryQuestions.toFixed(1)}</div>
                <div>{Math.round(row.renewalRate)}%</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
