"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  buildCohortCsvText,
  buildCohortExportText,
  buildCohortFindings,
  buildCohortReport,
} from "@/lib/cohort-report";
import { useFractionalFiveStore } from "@/lib/fractional-five-store";

export function CohortReportDemo() {
  const { state, hydrated, resetState } = useFractionalFiveStore();
  const [copied, setCopied] = useState(false);

  const report = useMemo(
    () => buildCohortReport(state.operators, state.engagements),
    [state.engagements, state.operators],
  );
  const findings = useMemo(() => buildCohortFindings(report), [report]);
  const exportText = useMemo(() => buildCohortExportText(report, findings), [findings, report]);
  const csvText = useMemo(
    () => buildCohortCsvText(report, state.operators, state.engagements),
    [report, state.engagements, state.operators],
  );

  async function copyReport() {
    await navigator.clipboard.writeText(exportText);
    setCopied(true);
  }

  function downloadCsv() {
    const blob = new Blob([csvText], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "fourhops-cohort-report.csv";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <article className="rounded-[32px] border border-line bg-[#22392d] p-6 text-white soft-shadow sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-white/65">Cohort snapshot</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight">What the first operators are actually proving</h2>
            </div>
            <span className="rounded-full border border-white/12 bg-white/8 px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-white/72">
              {hydrated ? "Shared prototype state" : "Loading shared state"}
            </span>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {[
              { label: "Operators", value: String(report.operators) },
              { label: "Engagements", value: String(report.engagements) },
              { label: "Active blocks", value: String(report.activeBlocks) },
              { label: "Avg. setup time", value: `${report.avgProfileSetup.toFixed(1)}h` },
              { label: "Avg. clarity", value: `${report.avgClarity.toFixed(1)}/5` },
              { label: "3-month renewal", value: `${Math.round(report.renewalRate)}%` },
            ].map((item) => (
              <div key={item.label} className="rounded-[22px] border border-white/12 bg-white/8 px-4 py-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/62">{item.label}</p>
                <p className="mt-3 text-2xl font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[32px] border border-line bg-panel/95 p-6 soft-shadow sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted">Export-ready summary</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">A concise readout for the thesis, operator updates, or investor conversations</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={copyReport}
                className="rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent-strong"
              >
                {copied ? "Copied report" : "Copy report"}
              </button>
              <button
                type="button"
                onClick={downloadCsv}
                className="rounded-full border border-line bg-white px-4 py-2.5 text-sm font-semibold text-foreground"
              >
                Download CSV
              </button>
              <Link
                href="/cohort-report/print"
                className="rounded-full border border-line bg-white px-4 py-2.5 text-sm font-semibold text-foreground"
              >
                Printable view
              </Link>
              <Link
                href="/cohort-report/memo"
                className="rounded-full border border-line bg-white px-4 py-2.5 text-sm font-semibold text-foreground"
              >
                Memo view
              </Link>
              <button
                type="button"
                onClick={resetState}
                className="rounded-full border border-line bg-white px-4 py-2.5 text-sm font-semibold text-foreground"
              >
                Reset cohort
              </button>
            </div>
          </div>
          <textarea
            readOnly
            value={exportText}
            rows={18}
            className="mt-5 w-full rounded-[24px] border border-line bg-white px-4 py-4 font-mono text-xs leading-6 text-foreground outline-none"
          />
        </article>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <article className="rounded-[32px] border border-line bg-panel/95 p-6 soft-shadow sm:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted">Auto findings</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight">A live 90-day-style memo generated from the current cohort</h3>
          <div className="mt-6 space-y-3">
            {findings.map((item) => (
              <div key={item} className="rounded-[22px] border border-line bg-white px-4 py-4 text-sm leading-6 text-muted">
                {item}
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[32px] border border-line bg-[#f0e0cb] p-6 soft-shadow sm:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted">Focus breakdown</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight">Which operator blocks are actually in the cohort</h3>
          <div className="mt-6 space-y-3">
            {report.focusBreakdown.map(([focus, count]) => (
              <div key={focus} className="rounded-[22px] border border-line bg-white px-4 py-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-foreground">{focus}</p>
                  <span className="rounded-full bg-panel px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                    {count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <article className="rounded-[32px] border border-line bg-panel/95 p-6 soft-shadow sm:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted">Core proof metrics</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              {
                label: "Boundary questions",
                value: report.avgBoundaryQuestions.toFixed(1),
                note: "Average ambiguity per engagement",
              },
              {
                label: "Extra block requests",
                value: report.avgExtraRequests.toFixed(1),
                note: "How often scope becomes an explicit add-on",
              },
              {
                label: "Operator clarity",
                value: `${report.avgClarity.toFixed(1)}/5`,
                note: "Did clients understand availability?",
              },
              {
                label: "Client trust",
                value: `${report.avgTrust.toFixed(1)}/5`,
                note: "Did the work feel visible without micromanagement?",
              },
            ].map((item) => (
              <div key={item.label} className="rounded-[24px] border border-line bg-white p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{item.label}</p>
                <p className="mt-3 text-2xl font-semibold">{item.value}</p>
                <p className="mt-2 text-sm leading-6 text-muted">{item.note}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[32px] border border-line bg-panel/95 p-6 soft-shadow sm:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted">Decision read</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight">How the current data wants to be interpreted</h3>
          <div className="mt-6 space-y-3">
            <div className="rounded-[22px] border border-line bg-white px-4 py-4 text-sm leading-6 text-muted">
              {report.renewalRate >= 50
                ? "Renewal strength is already good enough to justify deeper operator recruitment and stronger operating standards."
                : "Renewal evidence is still too early or too mixed, so the next product loop should focus on why some blocks do not repeat."}
            </div>
            <div className="rounded-[22px] border border-line bg-white px-4 py-4 text-sm leading-6 text-muted">
              {report.avgBoundaryQuestions <= 1.5
                ? "The current block and scope framing looks relatively understandable to clients."
                : "Clients are still asking enough scope questions that the profile and workspace language likely need simplification."}
            </div>
            <div className="rounded-[22px] border border-line bg-white px-4 py-4 text-sm leading-6 text-muted">
              {report.avgTrust >= 4
                ? "The proof layer is doing its job: trust appears to be getting built through visibility instead of surveillance."
                : "Trust is not yet consistently strong, which suggests the work log and client recap flow may need to become more automatic or more concrete."}
            </div>
          </div>
        </article>
      </section>

      <section className="rounded-[32px] border border-line bg-panel/95 p-6 soft-shadow sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted">Operator breakdown</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight">See who is finding the model easiest to package and renew</h3>
          </div>
          <span className="rounded-full border border-line bg-white px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-muted">
            cohort-wide view
          </span>
        </div>

        <div className="mt-6 overflow-hidden rounded-[26px] border border-line bg-white">
          <div className="grid grid-cols-[1fr_0.8fr_0.8fr_0.8fr_0.8fr] border-b border-line bg-panel px-4 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            <div>Operator</div>
            <div>Active blocks</div>
            <div>Setup time</div>
            <div>Avg. boundary Qs</div>
            <div>Renewal rate</div>
          </div>
          {report.operatorRows.map((row) => (
            <div
              key={row.id}
              className="grid grid-cols-[1fr_0.8fr_0.8fr_0.8fr_0.8fr] gap-3 border-b border-line px-4 py-4 text-sm leading-6 last:border-b-0"
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
    </>
  );
}
