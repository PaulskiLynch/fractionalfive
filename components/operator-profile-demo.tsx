"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useFractionalFiveStore } from "@/lib/fractional-five-store";

export function OperatorProfileDemo() {
  const {
    state,
    setState,
    hydrated,
    resetState,
    activeOperator,
    updateOperatorProfile,
  } = useFractionalFiveStore();
  const { selectedBlockId } = state;
  const profile = activeOperator.profile;
  const [draftInclusion, setDraftInclusion] = useState("");
  const [draftExclusion, setDraftExclusion] = useState("");

  const selectedBlock = useMemo(
    () => profile.blocks.find((block) => block.id === selectedBlockId) ?? profile.blocks[0],
    [profile.blocks, selectedBlockId],
  );

  const proofTiles = [
    { label: "Max concurrent clients", value: profile.maxClients },
    { label: "Response window", value: profile.responseWindow },
    { label: "Delegation policy", value: profile.delegationPolicy },
    { label: "Rate framing", value: profile.rateFraming },
  ];

  function updateBlockAvailability(blockId: string) {
    setState((current) => {
      const nextOperators = current.operators.map((operator) => {
        if (operator.id !== current.selectedOperatorId) {
          return operator;
        }

        const nextBlocks = operator.profile.blocks.map((block) =>
          block.id === blockId ? { ...block, available: !block.available } : block,
        );
        const openCount = nextBlocks.filter((block) => block.available).length;

        return {
          ...operator,
          profile: {
            ...operator.profile,
            blocks: nextBlocks,
            currentAvailability:
              openCount === 0 ? "No blocks open" : `${openCount} block${openCount === 1 ? "" : "s"} open`,
          },
        };
      });
      const activeProfile =
        nextOperators.find((operator) => operator.id === current.selectedOperatorId)?.profile ?? profile;

      return {
        ...current,
        operators: nextOperators,
        selectedBlockId:
          activeProfile.blocks.find((block) => block.id === current.selectedBlockId)?.id ??
          activeProfile.blocks[0]?.id ??
          current.selectedBlockId,
      };
    });
  }

  function addListItem(kind: "inclusions" | "exclusions") {
    if (kind === "inclusions") {
      const value = draftInclusion.trim();
      if (!value) return;
      updateOperatorProfile((currentProfile) => ({
        ...currentProfile,
        inclusions: [...currentProfile.inclusions, value],
      }));
      setDraftInclusion("");
      return;
    }

    const value = draftExclusion.trim();
    if (!value) return;
    updateOperatorProfile((currentProfile) => ({
      ...currentProfile,
      exclusions: [...currentProfile.exclusions, value],
    }));
    setDraftExclusion("");
  }

  return (
    <>
      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-[32px] border border-line bg-panel/95 p-6 soft-shadow sm:p-8">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <span className="rounded-full border border-line bg-white px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              {hydrated ? "Shared prototype state" : "Loading shared state"}
            </span>
            <button
              type="button"
              onClick={() => {
                resetState();
                setDraftInclusion("");
                setDraftExclusion("");
              }}
              className="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-foreground hover:-translate-y-0.5"
            >
              Reset profile
            </button>
          </div>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-3">
              <div className="inline-flex rounded-full border border-accent/20 bg-accent/10 px-4 py-2 font-mono text-xs uppercase tracking-[0.22em] text-accent">
                {profile.name} / {profile.role}
              </div>
              <div>
                <h2 className="text-3xl font-semibold tracking-tight">{profile.tagline}</h2>
                <p className="mt-3 max-w-2xl text-base leading-7 text-muted">{profile.bio}</p>
              </div>
            </div>

            <div className="rounded-[24px] border border-line bg-white p-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Current availability</p>
              <p className="mt-2 text-2xl font-semibold">{profile.currentAvailability}</p>
              <p className="mt-2 text-sm leading-6 text-muted">Next start window: {profile.nextStartWindow}</p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {proofTiles.map((tile) => (
              <div key={tile.label} className="rounded-[24px] border border-line bg-white p-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{tile.label}</p>
                <p className="mt-3 text-base font-semibold">{tile.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[24px] border border-line bg-white p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Edit profile copy</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="text-sm text-muted">
                <span className="mb-2 block font-semibold text-foreground">Tagline</span>
                <input
                  value={profile.tagline}
                  onChange={(event) =>
                    updateOperatorProfile((currentProfile) => ({
                      ...currentProfile,
                      tagline: event.target.value,
                    }))
                  }
                  className="w-full rounded-2xl border border-line bg-panel px-4 py-3 text-sm text-foreground outline-none"
                />
              </label>
              <label className="text-sm text-muted">
                <span className="mb-2 block font-semibold text-foreground">Current availability</span>
                <input
                  value={profile.currentAvailability}
                  onChange={(event) =>
                    updateOperatorProfile((currentProfile) => ({
                      ...currentProfile,
                      currentAvailability: event.target.value,
                    }))
                  }
                  className="w-full rounded-2xl border border-line bg-panel px-4 py-3 text-sm text-foreground outline-none"
                />
              </label>
              <label className="text-sm text-muted sm:col-span-2">
                <span className="mb-2 block font-semibold text-foreground">Bio</span>
                <textarea
                  value={profile.bio}
                  onChange={(event) =>
                    updateOperatorProfile((currentProfile) => ({
                      ...currentProfile,
                      bio: event.target.value,
                    }))
                  }
                  rows={4}
                  className="w-full rounded-2xl border border-line bg-panel px-4 py-3 text-sm text-foreground outline-none"
                />
              </label>
            </div>
          </div>

          <div className="mt-8 rounded-[24px] border border-line bg-white p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Structured onboarding</p>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
              <p className="max-w-2xl text-sm leading-6 text-muted">
                Use the selected block to start a real onboarding flow with client, focus, renewal date, and scope fields.
              </p>
              <Link
                href={`/new-engagement?block=${selectedBlock?.id ?? ""}`}
                className="rounded-full bg-accent px-4 py-3 text-sm font-semibold text-white hover:bg-accent-strong"
              >
                Start new engagement
              </Link>
            </div>
          </div>
        </article>

        <aside className="rounded-[32px] border border-line bg-[#22392d] p-6 text-white soft-shadow sm:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-white/65">Live offer preview</p>
          <h3 className="mt-4 text-2xl font-semibold tracking-tight">Choose a block and watch the commercial framing update.</h3>
          <div className="mt-6 space-y-3">
            {profile.blocks.map((block) => {
              const isActive = block.id === selectedBlockId;

              return (
                <div
                  key={block.id}
                  className={`rounded-[22px] border px-4 py-4 ${
                    isActive
                      ? "border-white/35 bg-white/14"
                      : "border-white/12 bg-white/6"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setState((current) => ({ ...current, selectedBlockId: block.id }))
                    }
                    className="w-full text-left"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold">{block.label}</p>
                      <span className="rounded-full bg-white/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-white/72">
                        {block.available ? "open" : "waitlist"}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-white/74">{block.detail}</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => updateBlockAvailability(block.id)}
                    className="mt-4 rounded-full border border-white/16 px-3 py-2 text-xs font-semibold text-white/86 hover:bg-white/10"
                  >
                    Mark as {block.available ? "full" : "open"}
                  </button>
                </div>
              );
            })}
          </div>
          {selectedBlock ? (
            <div className="mt-6 rounded-[24px] border border-white/12 bg-white/8 p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/62">Selected rate framing</p>
              <p className="mt-3 text-2xl font-semibold">{selectedBlock.monthlyRate}</p>
              <p className="mt-3 text-sm leading-6 text-white/74">
                This makes the offer concrete before a sales call and gives the client a clean way to compare capacity options.
              </p>
            </div>
          ) : null}
        </aside>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <article className="rounded-[32px] border border-line bg-panel/95 p-6 soft-shadow sm:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted">Available blocks</p>
          <div className="mt-6 space-y-4">
            {profile.blocks.map((item) => (
              <div key={item.id} className="rounded-[24px] border border-line bg-white p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-xl font-semibold">{item.label}</h3>
                  <span className="rounded-full bg-panel px-3 py-1 font-mono text-xs uppercase tracking-[0.18em] text-muted">
                    {item.available ? "recurring capacity" : "currently full"}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-muted">{item.detail}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[32px] border border-line bg-panel/95 p-6 soft-shadow sm:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted">Scope boundaries</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[24px] border border-line bg-white p-5">
              <h3 className="text-lg font-semibold">Included</h3>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-muted">
                {profile.inclusions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="mt-4 flex gap-2">
                <input
                  value={draftInclusion}
                  onChange={(event) => setDraftInclusion(event.target.value)}
                  placeholder="Add inclusion"
                  className="flex-1 rounded-2xl border border-line bg-panel px-4 py-3 text-sm text-foreground outline-none"
                />
                <button
                  type="button"
                  onClick={() => addListItem("inclusions")}
                  className="rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent-strong"
                >
                  Add
                </button>
              </div>
            </div>
            <div className="rounded-[24px] border border-line bg-white p-5">
              <h3 className="text-lg font-semibold">Not included</h3>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-muted">
                {profile.exclusions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="mt-4 flex gap-2">
                <input
                  value={draftExclusion}
                  onChange={(event) => setDraftExclusion(event.target.value)}
                  placeholder="Add exclusion"
                  className="flex-1 rounded-2xl border border-line bg-panel px-4 py-3 text-sm text-foreground outline-none"
                />
                <button
                  type="button"
                  onClick={() => addListItem("exclusions")}
                  className="rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent-strong"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </article>
      </section>
    </>
  );
}
