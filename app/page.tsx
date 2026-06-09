const hypotheses = [
  "Operators can package their time into blocks clients immediately understand.",
  "Clients can trust delivery without asking whether work is really happening.",
  "Scope creep can be surfaced through explicit extra-capacity requests.",
  "Independent operators can stay clearly B2B rather than drifting into employment patterns.",
  "Clients will renew block-based engagements after the first three months.",
];

const tools = [
  {
    title: "Operator Capacity Profile",
    eyebrow: "Tool 01",
    description:
      "A public-facing page that explains exactly what the operator sells, what cadence is available, and where the boundaries are.",
    bullets: [
      "Specific service definition, not a vague discipline label",
      "Available block sizes like 4h/month or 1 day/week",
      "Response-time expectations, inclusions, exclusions, and rate",
    ],
  },
  {
    title: "Client Engagement Workspace",
    eyebrow: "Tool 02",
    description:
      "One shared source of truth for each engagement so both sides can see the block definition, the cadence, and the work trail.",
    bullets: [
      "Block size, cadence, duration, and written scope",
      "Date-by-date work log with next actions",
      "Extra block request flow instead of invisible scope drift",
    ],
  },
  {
    title: "Operator Dashboard",
    eyebrow: "Tool 03",
    description:
      "A control surface for operators running multiple recurring client blocks at once without becoming an agency.",
    bullets: [
      "Allocated blocks across all clients this week",
      "Pending extra capacity requests and renewals",
      "Completed logs and upcoming delivery moments",
    ],
  },
];

const metrics = [
  "Time to create a clear capacity profile",
  "Boundary questions per engagement",
  "Extra block requests per client",
  "Operator rating: client understood my availability",
  "Client rating: I know what to expect each week",
  "Three-month renewal rate",
  "Operator retention after 3 months",
];

const principles = [
  {
    title: "Not a marketplace",
    copy:
      "The first version is for operators who already have clients. FourHops succeeds here by making recurring expertise legible, not by doing search or matching.",
  },
  {
    title: "Not employment theater",
    copy:
      "Operators keep control of schedule, tools, and client mix. The system should reinforce real B2B service delivery rather than mimic an internal team seat.",
  },
  {
    title: "Proof over promises",
    copy:
      "Clients do not need hourly surveillance. They need scope boundaries, visible cadence, completed work, and the next action in plain sight.",
  },
];

const cohort = [
  "SEO x2",
  "Paid media x2",
  "Analytics x1",
  "Marketing automation x1",
  "Fractional finance x1",
  "HR or recruitment ops x1",
  "Web maintenance x1",
  "Legal or contract ops x1",
];

export default function Home() {
  return (
    <main className="min-h-screen text-foreground">
      <section className="px-5 pb-8 pt-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl rounded-[36px] border border-line/80 bg-panel/90 p-6 soft-shadow sm:p-8 lg:p-10">
          <div className="flex flex-col gap-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
                  FractionalFive / code name
                </p>
                <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                  FourHops for structured fractional delivery
                </h1>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="/new-engagement"
                  className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:-translate-y-0.5 hover:bg-accent-strong"
                >
                  Start onboarding flow
                </a>
                <a
                  href="/operator-profile"
                  className="rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-foreground hover:-translate-y-0.5"
                >
                  Open product screens
                </a>
                <a
                  href="/dashboard"
                  className="rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-foreground hover:-translate-y-0.5"
                >
                  View operator console
                </a>
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-6">
                <div className="inline-flex rounded-full border border-accent/20 bg-accent/8 px-4 py-2 font-mono text-xs uppercase tracking-[0.28em] text-accent">
                  Not a marketplace. A service delivery layer.
                </div>
                <div className="max-w-4xl space-y-5">
                  <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                    Sell recurring expertise without becoming an agency, an employee, or a gig worker.
                  </h2>
                  <p className="max-w-3xl text-lg leading-8 text-muted sm:text-xl">
                    FractionalFive is the new build for the FourHops thesis: help independent B2B professionals package
                    capacity into clear blocks, run each engagement from one workspace, and make trust visible without
                    micromanagement. The prototype now also supports simple auth-free operator switching for a tiny collective model,
                    while staying focused on operators who already have clients instead of trying to generate demand.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-[24px] border border-line bg-white p-4">
                    <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted">Question 01</p>
                    <p className="mt-3 text-base font-semibold leading-6">
                      How do I sell structured expertise repeatedly?
                    </p>
                  </div>
                  <div className="rounded-[24px] border border-line bg-white p-4">
                    <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted">Question 02</p>
                    <p className="mt-3 text-base font-semibold leading-6">
                      How does the client know what they are allowed to ask for?
                    </p>
                  </div>
                  <div className="rounded-[24px] border border-line bg-white p-4">
                    <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted">Question 03</p>
                    <p className="mt-3 text-base font-semibold leading-6">
                      How do we prove delivery without turning it into surveillance?
                    </p>
                  </div>
                </div>
              </div>

              <aside className="grid-pattern overflow-hidden rounded-[32px] border border-line bg-[#f3eadb] p-5 sm:p-6">
                <div className="rounded-[28px] border border-line bg-panel p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.26em] text-muted">Capacity Profile</p>
                      <p className="mt-2 text-xl font-semibold">Technical SEO for Shopify stores</p>
                    </div>
                    <span className="rounded-full bg-accent/10 px-3 py-1 font-mono text-xs uppercase tracking-[0.18em] text-accent">
                      2 blocks open
                    </span>
                  </div>

                  <div className="mt-5 grid gap-3">
                    <div className="rounded-2xl border border-line bg-white p-4">
                      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">Available blocks</p>
                      <p className="mt-2 text-sm font-semibold">4h/month, 1 day/week, 2 days/week</p>
                    </div>
                    <div className="rounded-2xl border border-line bg-white p-4">
                      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">Included</p>
                      <p className="mt-2 text-sm leading-6 text-muted">
                        Audits, backlog prioritization, implementation QA, async Loom summaries.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-line bg-white p-4">
                      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">Not included</p>
                      <p className="mt-2 text-sm leading-6 text-muted">
                        Net-new content production, emergency weekend response, full-site migrations.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-line bg-white p-4">
                      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">Engagement workspace</p>
                      <ul className="mt-3 space-y-2 text-sm text-muted">
                        <li>Tue: audit review</li>
                        <li>Thu: implementation notes</li>
                        <li>Next action: validate faceted navigation fix</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-6 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 md:grid-cols-3">
            {principles.map((principle) => (
              <article
                key={principle.title}
                className="rounded-[28px] border border-line bg-panel/90 p-6 soft-shadow"
              >
                <h3 className="text-xl font-semibold">{principle.title}</h3>
                <p className="mt-3 text-base leading-7 text-muted">{principle.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="tools" className="px-5 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted">The MVP</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Three tools. No discovery. No matching. No payment complexity yet.
            </h2>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {tools.map((tool) => (
              <article
                key={tool.title}
                className="rounded-[30px] border border-line bg-panel/95 p-6 soft-shadow"
              >
                <p className="font-mono text-xs uppercase tracking-[0.26em] text-accent">{tool.eyebrow}</p>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight">{tool.title}</h3>
                <p className="mt-4 text-base leading-7 text-muted">{tool.description}</p>
                <ul className="mt-6 space-y-3">
                  {tool.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="rounded-2xl border border-line bg-white px-4 py-3 text-sm leading-6 text-muted"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <LinkCard href="/new-engagement" label="Start new engagement" />
            <LinkCard href="/operator-profile" label="Open operator profile" />
            <LinkCard href="/engagement-workspace" label="Open engagement workspace" />
            <LinkCard href="/dashboard" label="Open dashboard" />
          </div>
        </div>
      </section>

      <section className="px-5 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-[32px] border border-line bg-[#22392d] p-6 text-white soft-shadow sm:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-white/65">What you are proving</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">The first five hypotheses</h2>
            <ol className="mt-6 space-y-3">
              {hypotheses.map((hypothesis, index) => (
                <li
                  key={hypothesis}
                  className="rounded-[22px] border border-white/12 bg-white/6 px-4 py-4 text-sm leading-6 text-white/82"
                >
                  <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 font-mono text-xs">
                    0{index + 1}
                  </span>
                  {hypothesis}
                </li>
              ))}
            </ol>
          </article>

          <article className="rounded-[32px] border border-line bg-panel/95 p-6 soft-shadow sm:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted">The proof model</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">Success is not GMV. It is clarity, trust, and renewal.</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {metrics.map((metric) => (
                <div key={metric} className="rounded-[22px] border border-line bg-white p-4">
                  <p className="text-sm font-semibold leading-6">{metric}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section id="cohort" className="px-5 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl rounded-[34px] border border-line bg-panel/90 p-6 soft-shadow sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted">The first cohort</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Start with ten operators who already know how to invoice and already have clients.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-muted">
                The initial market is not everyone. It is self-employed professionals who are already doing recurring
                B2B work, already know how to invoice, and are willing to restructure one engagement into a clear block model.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {cohort.map((role) => (
                  <span
                    key={role}
                    className="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-foreground"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[30px] border border-line bg-white p-5">
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted">90-day shape</p>
              <div className="mt-5 space-y-4">
                <div className="rounded-2xl bg-panel px-4 py-4">
                  <p className="text-sm font-semibold">Month 1 / Setup</p>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    Legal review, Google Sheet plus Calendar plus Slack workspace, first five operators onboarded with one client each.
                  </p>
                </div>
                <div className="rounded-2xl bg-panel px-4 py-4">
                  <p className="text-sm font-semibold">Month 2 / Live engagements</p>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    Active blocks running, feedback collection, extra-capacity requests introduced, second cohort added.
                  </p>
                </div>
                <div className="rounded-2xl bg-panel px-4 py-4">
                  <p className="text-sm font-semibold">Month 3 / Observation</p>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    Twenty-ish live blocks, renewal data, operating standards, and an honest decision on whether the
                    model deserves to scale.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[32px] border border-line bg-panel/95 p-6 soft-shadow sm:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted">Poland framing</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">The legal posture matters as much as the product.</h2>
            <p className="mt-4 text-base leading-8 text-muted">
              The product language should reinforce genuine self-employment: operator schedule control, operator-owned
              tools, no exclusivity, explicit service boundaries, and support for Polish-first delivery norms. The point
              is to structure B2B delivery well, not to disguise employment badly.
            </p>
          </article>

          <article className="rounded-[32px] border border-line bg-[#f0e0cb] p-6 soft-shadow sm:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted">What not to build yet</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                "Search or discovery",
                "Automated matching",
                "Payments or escrow",
                "Public operator directory",
                "Mobile apps",
                "Apply to become an operator flow",
                "Rating and review systems",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-line/80 bg-white/70 px-4 py-4 text-sm font-semibold">
                  {item}
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}

function LinkCard({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="rounded-full border border-line bg-white px-5 py-3 text-sm font-semibold text-foreground hover:-translate-y-0.5"
    >
      {label}
    </a>
  );
}
