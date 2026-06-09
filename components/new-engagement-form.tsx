"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useFractionalFiveStore } from "@/lib/fractional-five-store";

export function NewEngagementForm({ initialBlockId }: { initialBlockId?: string }) {
  const router = useRouter();
  const {
    state,
    hydrated,
    resetState,
    activeOperator,
    createEngagement,
  } = useFractionalFiveStore();
  const profile = activeOperator.profile;

  const resolvedInitialBlockId =
    initialBlockId && profile.blocks.some((block) => block.id === initialBlockId)
      ? initialBlockId
      : state.selectedBlockId;

  const [clientName, setClientName] = useState("");
  const [focus, setFocus] = useState("");
  const [renewalDate, setRenewalDate] = useState("");
  const [scopeIncluded, setScopeIncluded] = useState(profile.inclusions.slice(0, 3).join(", "));
  const [scopeExcluded, setScopeExcluded] = useState(profile.exclusions.slice(0, 3).join(", "));
  const [selectedBlockId, setSelectedBlockId] = useState(resolvedInitialBlockId);

  useEffect(() => {
    setScopeIncluded(profile.inclusions.slice(0, 3).join(", "));
    setScopeExcluded(profile.exclusions.slice(0, 3).join(", "));
    setSelectedBlockId(resolvedInitialBlockId);
  }, [profile.exclusions, profile.inclusions, resolvedInitialBlockId]);

  const selectedBlock = useMemo(
    () => profile.blocks.find((block) => block.id === selectedBlockId) ?? profile.blocks[0],
    [profile.blocks, selectedBlockId],
  );

  function handleCreateEngagement() {
    if (!selectedBlock || !clientName.trim() || !focus.trim()) return;

    const engagementId = `engagement-${Date.now()}`;
    const allocatedDays =
      selectedBlock.label === "2 days / week" ? 2 : selectedBlock.label === "1 day / week" ? 1 : 0.5;

    createEngagement({
      id: engagementId,
      operatorId: activeOperator.id,
      client: clientName.trim(),
      block: selectedBlock.label,
      focus: focus.trim(),
      renewal: renewalDate || "TBD",
      status: "On track",
      allocatedDays,
      title: `${selectedBlock.label} engagement for ${clientName.trim()}`,
      summary: `${profile.tagline}. Created through the structured onboarding flow.`,
      renewalDate: renewalDate || "TBD",
      cadence: [
        `Primary cadence: ${selectedBlock.label}`,
        "Weekly delivery summary",
        "Monthly renewal and scope review",
      ],
      scopeIncluded: scopeIncluded.trim() || "Defined during kickoff",
      scopeExcluded: scopeExcluded.trim() || "Anything outside the agreed block",
      blockDefinition: [
        { label: "Cadence", value: selectedBlock.label },
        { label: "Response expectation", value: profile.responseWindow },
        { label: "Operator model", value: "Independent B2B service provider" },
        { label: "Extra capacity", value: "Requested separately and approved explicitly" },
      ],
      workLog: [],
      requestTitle: "No extra request yet",
      requestSize: "TBD",
      requestImpact: "TBD",
      requestStatus: "pending",
      proofHistory: ["Engagement created from onboarding flow"],
      boundaryQuestions: 0,
      extraBlockRequests: 0,
      operatorClarityRating: 0,
      clientTrustRating: 0,
      renewedAfterThreeMonths: false,
      auditTrail: [
        {
          id: `audit-${engagementId}`,
          date: "Today",
          actor: profile.name,
          action: "Engagement created",
          detail: `Created ${selectedBlock.label} engagement for ${clientName.trim()} through the onboarding flow.`,
        },
      ],
    });

    router.push("/engagement-workspace");
  }

  return (
    <section className="rounded-[32px] border border-line bg-panel/95 p-6 soft-shadow sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="rounded-full border border-line bg-white px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          {hydrated ? "Shared prototype state" : "Loading shared state"}
        </span>
        <button
          type="button"
          onClick={() => {
            resetState();
            setClientName("");
            setFocus("");
            setRenewalDate("");
            setScopeIncluded(profile.inclusions.slice(0, 3).join(", "));
            setScopeExcluded(profile.exclusions.slice(0, 3).join(", "));
            setSelectedBlockId(resolvedInitialBlockId);
          }}
          className="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-foreground hover:-translate-y-0.5"
        >
          Reset onboarding
        </button>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted">Structured setup</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">Turn one visible capacity block into a live engagement.</h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
              This is the cleaner onboarding path: choose the block, define the client and focus, set the renewal date,
              and carry the engagement straight into the workspace.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm text-muted">
              <span className="mb-2 block font-semibold text-foreground">Client name</span>
              <input
                value={clientName}
                onChange={(event) => setClientName(event.target.value)}
                className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm text-foreground outline-none"
              />
            </label>
            <label className="text-sm text-muted">
              <span className="mb-2 block font-semibold text-foreground">Primary focus</span>
              <input
                value={focus}
                onChange={(event) => setFocus(event.target.value)}
                className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm text-foreground outline-none"
              />
            </label>
            <label className="text-sm text-muted">
              <span className="mb-2 block font-semibold text-foreground">Capacity block</span>
              <select
                value={selectedBlockId}
                onChange={(event) => setSelectedBlockId(event.target.value)}
                className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm text-foreground outline-none"
              >
                {profile.blocks.map((block) => (
                  <option key={block.id} value={block.id}>
                    {block.label} / {block.available ? "open" : "full"}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm text-muted">
              <span className="mb-2 block font-semibold text-foreground">Renewal date</span>
              <input
                value={renewalDate}
                onChange={(event) => setRenewalDate(event.target.value)}
                placeholder="e.g. 30 Sep"
                className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm text-foreground outline-none"
              />
            </label>
            <label className="text-sm text-muted sm:col-span-2">
              <span className="mb-2 block font-semibold text-foreground">Scope included</span>
              <textarea
                value={scopeIncluded}
                onChange={(event) => setScopeIncluded(event.target.value)}
                rows={3}
                className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm text-foreground outline-none"
              />
            </label>
            <label className="text-sm text-muted sm:col-span-2">
              <span className="mb-2 block font-semibold text-foreground">Scope excluded</span>
              <textarea
                value={scopeExcluded}
                onChange={(event) => setScopeExcluded(event.target.value)}
                rows={3}
                className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm text-foreground outline-none"
              />
            </label>
          </div>
        </div>

        <aside className="rounded-[28px] border border-line bg-[#22392d] p-6 text-white">
          <p className="font-mono text-xs uppercase tracking-[0.26em] text-white/65">Preview</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight">
            {clientName.trim() || "New client"} / {selectedBlock?.label ?? "No block selected"}
          </h3>
          <div className="mt-5 space-y-3">
            <div className="rounded-[22px] border border-white/12 bg-white/8 px-4 py-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/62">Focus</p>
              <p className="mt-2 text-sm leading-6 text-white/82">{focus || "Set a clear operating focus for the engagement."}</p>
            </div>
            <div className="rounded-[22px] border border-white/12 bg-white/8 px-4 py-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/62">Rate framing</p>
              <p className="mt-2 text-sm font-semibold">{selectedBlock?.monthlyRate ?? "TBD"}</p>
            </div>
            <div className="rounded-[22px] border border-white/12 bg-white/8 px-4 py-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/62">Renewal</p>
              <p className="mt-2 text-sm font-semibold">{renewalDate || "TBD"}</p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleCreateEngagement}
              disabled={!selectedBlock || !selectedBlock.available || !clientName.trim() || !focus.trim()}
              className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#22392d] hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Create and open workspace
            </button>
            <Link
              href="/operator-profile"
              className="rounded-full border border-white/16 px-5 py-3 text-sm font-semibold text-white/86 hover:bg-white/10"
            >
              Back to profile
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
}
