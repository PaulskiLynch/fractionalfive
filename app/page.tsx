const navItems = [
  { label: "For operators", href: "#operators" },
  { label: "For clients", href: "#clients" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "/cohort-report" },
  { label: "About", href: "#about" },
];

const trustPoints = [
  {
    title: "You stay independent",
    copy: "You run your business your way.",
    icon: "calendar",
  },
  {
    title: "Clear boundaries",
    copy: "Define scope and protect your time.",
    icon: "shield",
  },
  {
    title: "Proof of delivery",
    copy: "Simple work logs build trust and confidence.",
    icon: "check",
  },
  {
    title: "B2B by design",
    copy: "Built for Poland's professional culture.",
    icon: "briefcase",
  },
];

const sideCards = [
  {
    title: "For operators",
    accent: "text-[#4b45db]",
    icon: "person",
    bullets: [
      "Create your capacity profile",
      "Allocate your time your way",
      "Deliver with confidence",
      "Get paid for the value you create",
    ],
    copy:
      "Package your time into clear blocks, set boundaries, and prove your delivery across all your clients.",
    link: "See how it works for operators",
    background: "bg-[#f7f4ff]",
  },
  {
    title: "For clients",
    accent: "text-[#178c65]",
    icon: "briefcase",
    bullets: [
      "Know exactly what you're getting",
      "Track progress and outputs",
      "Request extra capacity when needed",
      "Renew with confidence",
    ],
    copy:
      "Buy fractional expertise with clear scope, cadence, and proof of delivery. No micromanagement.",
    link: "See how it works for clients",
    background: "bg-[#effaf6]",
  },
];

const steps = [
  {
    number: "1",
    title: "Create your profile",
    copy: "Define your services, block sizes, availability, and boundaries.",
    icon: "profile",
  },
  {
    number: "2",
    title: "Set up engagements",
    copy: "Agree on scope, cadence, and deliverables, with your client.",
    icon: "calendar",
  },
  {
    number: "3",
    title: "Deliver, log, and renew",
    copy: "Log your work, manage boundaries, and renew what works.",
    icon: "check",
  },
];

const toolCards = [
  {
    title: "Capacity profiles",
    copy: "Show what you do, how you work, and the blocks you offer. Clear for clients. True to you.",
    icon: "person",
  },
  {
    title: "Engagement workspaces",
    copy: "A single place for scope, cadence, deliverables, and communication. No more scattered docs.",
    icon: "folder",
  },
  {
    title: "Work logs & proof",
    copy: "Lightweight logs show what was done and what's next. Trust without timesheets.",
    icon: "list",
  },
  {
    title: "Boundary & requests",
    copy: "Keep scope protected and request extra blocks when work goes beyond the plan.",
    icon: "shield",
  },
];

const bottomStats = [
  { value: "10+", label: "Operators in our pilot programme" },
  { value: "20+", label: "Active engagements in progress" },
  { value: "All 10", label: "Operators renewed after 3 months" },
];

const weekCards = [
  { day: "Mon", date: "10", company: "Acme Sp. z o.o.", title: "SEO Audit", meta: "1 day", color: "bg-[#f6f6ff]" },
  { day: "Tue", date: "11", company: "BrightLab", title: "Content Strategy", meta: "1 day", color: "bg-[#fff6e8]" },
  { day: "Thu", date: "13", company: "PeakFlow", title: "SEO Roadmap", meta: "1 day", color: "bg-[#f2ecff]" },
  { day: "Fri", date: "14", company: "DataFin", title: "Analytics Review", meta: "1/2 day", color: "bg-[#eaf8f3]" },
];

const workLog = [
  ["6 May", "Technical audit", "7h"],
  ["8 May", "Indexation review", "6h"],
  ["13 May", "Fix prioritization", "6h"],
];

export default function Home() {
  return (
    <main className="min-h-screen text-foreground">
      <section className="px-4 pb-10 pt-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1200px] rounded-[34px] border border-line/70 bg-white/82 p-4 soft-shadow backdrop-blur sm:p-6 lg:p-8">
          <header className="flex flex-col gap-5 border-b border-line/70 pb-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#4b45db] text-white">
                  <LogoMark />
                </div>
                <div className="text-[34px] font-semibold tracking-tight text-[#0f1c57]">FourHops</div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <nav className="hidden items-center gap-8 lg:flex">
                  {navItems.map((item) => (
                    <a key={item.label} href={item.href} className="text-sm font-semibold text-[#222e67]">
                      {item.label}
                    </a>
                  ))}
                </nav>
                <button className="rounded-xl border border-line bg-white px-4 py-2 text-sm font-semibold text-[#19245c]">
                  PL
                </button>
                <a
                  href="/cohort-report"
                  className="rounded-xl border border-line bg-white px-4 py-2 text-sm font-semibold text-[#19245c]"
                >
                  Log in
                </a>
                <a
                  href="/new-engagement"
                  className="rounded-xl bg-[#4b45db] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(75,69,219,0.24)]"
                >
                  Join the pilot
                </a>
              </div>
            </div>
          </header>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
            <div className="space-y-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#f1d9d7] bg-[#fff5f4] px-4 py-2 text-sm font-semibold text-[#223065]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ee5950]" />
                Built in Poland. For independent professionals.
              </div>

              <div className="max-w-2xl">
                <h1 className="text-5xl font-semibold leading-[0.96] tracking-tight text-[#121d5b] sm:text-6xl">
                  Structure your expertise.
                  <br />
                  Deliver with <span className="text-[#4b45db]">clarity.</span>
                </h1>
                <p className="mt-6 max-w-xl text-xl leading-9 text-[#48536f]">
                  FourHops helps self-employed professionals sell recurring service blocks without becoming an agency,
                  an employee, or a gig worker.
                </p>
              </div>

              <div className="max-w-xl rounded-[28px] border border-[#ebe8ff] bg-[#f8f6ff] p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#4b45db] shadow-sm">
                    <ShieldCheckIcon />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-[#182563]">Not a marketplace. Not an agency.</p>
                    <p className="mt-2 text-sm leading-7 text-[#566178]">
                      Just tools and structure for independent professionals who already have clients.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="/new-engagement"
                  className="inline-flex items-center gap-3 rounded-2xl bg-[#4b45db] px-7 py-4 text-base font-semibold text-white shadow-[0_16px_32px_rgba(75,69,219,0.25)]"
                >
                  Join the pilot
                  <ArrowRight />
                </a>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center gap-3 rounded-2xl border border-line bg-white px-7 py-4 text-base font-semibold text-[#17245d]"
                >
                  Learn more
                  <ArrowRight />
                </a>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {trustPoints.map((item) => (
                  <div key={item.title} className="rounded-[24px] border border-line/70 bg-[#fcfbff] p-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f4f1ff] text-[#4b45db]">
                      <SmallIcon kind={item.icon} />
                    </div>
                    <p className="mt-4 text-base font-semibold text-[#17245d]">{item.title}</p>
                    <p className="mt-2 text-sm leading-6 text-[#65718b]">{item.copy}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative rounded-[34px] border border-line/70 bg-[#fcfbff] p-4 shadow-[0_28px_60px_rgba(29,40,80,0.08)] sm:p-5">
              <div className="grid gap-4 lg:grid-cols-[0.35fr_0.65fr]">
                <div className="rounded-[28px] border border-line/70 bg-white p-4">
                  <div className="flex items-center gap-3 border-b border-line/60 pb-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#4b45db] text-white">
                      <LogoMark />
                    </div>
                    <div className="text-lg font-semibold text-[#17245d]">FourHops</div>
                  </div>
                  <div className="mt-4 space-y-2">
                    {["Dashboard", "Active engagements", "Profile"].map((item, index) => (
                      <div
                        key={item}
                        className={`flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold ${
                          index === 0 ? "bg-[#f3f1ff] text-[#4b45db]" : "text-[#57627c]"
                        }`}
                      >
                        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white">
                          <SmallIcon kind={index === 0 ? "home" : index === 1 ? "folder" : "person"} />
                        </span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-[28px] border border-line/70 bg-white p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-xl font-semibold text-[#17245d]">This week</p>
                    </div>
                    <div className="mt-5 grid gap-3 sm:grid-cols-4">
                      {weekCards.map((item) => (
                        <div key={`${item.day}-${item.company}`} className="space-y-3">
                          <div>
                            <p className="text-sm font-semibold text-[#1d275e]">{item.day}</p>
                            <p className="text-xs text-[#687389]">{item.date}</p>
                          </div>
                          <div className={`rounded-[22px] p-3 ${item.color}`}>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6d7292]">
                              {item.company}
                            </p>
                            <p className="mt-2 text-sm font-semibold text-[#1a255a]">{item.title}</p>
                            <p className="mt-3 text-sm text-[#566178]">{item.meta}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-[0.56fr_0.44fr]">
                    <div className="rounded-[28px] border border-line/70 bg-white p-5">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#efeafe] text-sm font-semibold text-[#4b45db]">
                          AC
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-[#17245d]">Acme Sp. z o.o.</p>
                          <p className="text-sm text-[#687389]">SEO Operator</p>
                          <p className="mt-1 text-sm font-semibold text-[#4b45db]">1 day / week • 3 months</p>
                        </div>
                      </div>

                      <div className="mt-5">
                        <p className="text-sm font-semibold text-[#17245d]">This week&apos;s focus</p>
                        <ul className="mt-3 space-y-2 text-sm text-[#5e6983]">
                          {["Technical audit delivered", "Indexation issues list", "Prioritized fixes"].map((item) => (
                            <li key={item} className="flex items-center gap-2">
                              <span className="h-2.5 w-2.5 rounded-full bg-[#16a36f]" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-6">
                        <div className="h-2.5 rounded-full bg-[#efecfb]">
                          <div className="h-2.5 w-[42%] rounded-full bg-[#4b45db]" />
                        </div>
                        <div className="mt-3 flex items-center justify-between text-sm">
                          <span className="font-semibold text-[#182563]">1 day completed</span>
                          <a href="/engagement-workspace" className="font-semibold text-[#4b45db]">
                            View engagement
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="rounded-[28px] border border-line/70 bg-white p-5">
                        <div className="flex items-center justify-between">
                          <p className="text-base font-semibold text-[#17245d]">Work log (latest)</p>
                        </div>
                        <div className="mt-4 space-y-3">
                          {workLog.map(([date, task, hours]) => (
                            <div key={`${date}-${task}`} className="flex items-center justify-between gap-3 text-sm">
                              <span className="font-semibold text-[#57627c]">{date}</span>
                              <span className="flex-1 text-[#17245d]">{task}</span>
                              <span className="text-[#57627c]">{hours}</span>
                            </div>
                          ))}
                        </div>
                        <a href="/engagement-workspace" className="mt-4 inline-flex text-sm font-semibold text-[#4b45db]">
                          View full log
                        </a>
                      </div>

                      <div className="rounded-[28px] border border-line/70 bg-white p-5">
                        <p className="text-base font-semibold text-[#17245d]">Extra block request</p>
                        <p className="mt-3 text-sm leading-6 text-[#5f6981]">
                          Client requested additional capacity for this week.
                        </p>
                        <div className="mt-4 flex items-center justify-between rounded-2xl bg-[#f7f4ff] px-4 py-3">
                          <span className="text-sm font-semibold text-[#17245d]">Review request</span>
                          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#4b45db] text-xs font-semibold text-white">
                            1
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-right font-mono text-lg italic text-[#4b45db] sm:mr-6">
                Your time.
                <br />
                Structured.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="text-center text-[38px] font-semibold tracking-tight text-[#17245d]">
            Two sides. One simple system.
          </h2>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {sideCards.map((card) => (
              <article
                id={card.title === "For operators" ? "operators" : "clients"}
                key={card.title}
                className={`rounded-[30px] border border-line/60 p-7 ${card.background} scroll-mt-24`}
              >
                <div className="flex items-center gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-white ${card.accent}`}>
                    <SmallIcon kind={card.icon} />
                  </div>
                  <h3 className={`text-3xl font-semibold tracking-tight ${card.accent}`}>{card.title}</h3>
                </div>
                <p className="mt-4 max-w-lg text-base leading-7 text-[#566178]">{card.copy}</p>
                <ul className="mt-5 space-y-3 text-sm text-[#1f295e]">
                  {card.bullets.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full border border-current/20 bg-white/80 text-current">
                        <CheckMini />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href={card.title === "For operators" ? "/operator-profile" : "/engagement-workspace"}
                  className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold ${card.accent}`}
                >
                  {card.link}
                  <ArrowRight />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-24 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="text-center text-[38px] font-semibold tracking-tight text-[#17245d]">How FourHops works</h2>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.number} className="relative rounded-[28px] border border-line/70 bg-white p-6">
                <div className="flex items-center gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4b45db] text-sm font-semibold text-white">
                    {step.number}
                  </span>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f5f2ff] text-[#4b45db]">
                    <SmallIcon kind={step.icon} />
                  </span>
                </div>
                <h3 className="mt-5 text-2xl font-semibold tracking-tight text-[#17245d]">{step.title}</h3>
                <p className="mt-3 text-base leading-7 text-[#566178]">{step.copy}</p>
                {index < steps.length - 1 ? (
                  <span className="absolute right-5 top-8 hidden text-2xl text-[#c7c3ee] lg:block">→</span>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="text-center text-[38px] font-semibold tracking-tight text-[#17245d]">
            Simple tools for structured fractional work.
          </h2>
          <div className="mt-8 grid gap-4 lg:grid-cols-4">
            {toolCards.map((card) => (
              <article key={card.title} className="rounded-[28px] border border-line/70 bg-white p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f4f1ff] text-[#4b45db]">
                  <SmallIcon kind={card.icon} />
                </div>
                <h3 className="mt-4 text-xl font-semibold tracking-tight text-[#17245d]">{card.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#59647d]">{card.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-24 px-4 pb-10 pt-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1200px] rounded-[34px] border border-line/70 bg-[#f8f7ff] p-6 soft-shadow sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.18fr_0.82fr]">
            <div className="rounded-[30px] border border-line/70 bg-white p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f1efff] text-[#4b45db]">
                  <HeartIcon />
                </div>
                <div>
                  <h3 className="text-[34px] font-semibold leading-tight tracking-tight text-[#17245d]">
                    Built for Poland&apos;s
                    <br />
                    independent professionals.
                  </h3>
                  <p className="mt-3 max-w-xl text-base leading-7 text-[#566178]">
                    We understand B2B contracts, invoices, ZUS, VAT, and the freedom of self-employment.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {["B2B contracts", "Invoices & VAT", "ZUS", "PL language support"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-line/70 bg-[#fbf9ff] px-4 py-2 text-sm font-semibold text-[#26315f]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {bottomStats.map((item) => (
                <div key={item.value} className="rounded-[30px] border border-line/70 bg-white p-6 text-center">
                  <p className="text-4xl font-semibold tracking-tight text-[#17245d]">{item.value}</p>
                  <p className="mt-3 text-sm leading-6 text-[#5c6781]">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-[24px] border border-line/70 bg-white px-5 py-4 text-center text-sm leading-6 text-[#59647d]">
            FourHops provides tools for independent B2B collaboration. It is not an employment platform. Operators
            and clients determine their own relationship.
          </div>
        </div>
      </section>

      <footer className="border-t border-line/70 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-4 text-sm text-[#59647d] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <span>© 2026 FourHops Sp. z o.o.</span>
            <span>Built in Poznań, Poland</span>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <a href="/cohort-report/print" className="font-semibold text-[#1c285e]">
              Print report
            </a>
            <a href="/cohort-report/memo" className="font-semibold text-[#1c285e]">
              Memo
            </a>
            <a href="/cohort-report" className="font-semibold text-[#1c285e]">
              Legal
            </a>
            <a href="/new-engagement" className="font-semibold text-[#1c285e]">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

function ArrowRight() {
  return <span aria-hidden="true">→</span>;
}

function CheckMini() {
  return (
    <svg width="12" height="12" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 10.5L8.2 14.7L16 6.9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LogoMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7.2 4.8C7.2 3.80589 6.39411 3 5.4 3C4.40589 3 3.6 3.80589 3.6 4.8C3.6 5.79411 4.40589 6.6 5.4 6.6H7.2V4.8Z"
        fill="currentColor"
      />
      <path
        d="M10.8 9.6C10.8 7.61177 9.18823 6 7.2 6H5.4C4.40589 6 3.6 6.80589 3.6 7.8C3.6 8.79411 4.40589 9.6 5.4 9.6H10.8Z"
        fill="currentColor"
      />
      <path
        d="M10.8 9.6H14.4V19.2C14.4 20.1941 15.2059 21 16.2 21C17.1941 21 18 20.1941 18 19.2V12H20.4C21.3941 12 22.2 11.1941 22.2 10.2C22.2 9.20589 21.3941 8.4 20.4 8.4H18V6.6C18 5.60589 17.1941 4.8 16.2 4.8C15.2059 4.8 14.4 5.60589 14.4 6.6V9.6H10.8Z"
        fill="currentColor"
      />
      <path
        d="M10.8 9.6V16.8C10.8 18.7882 9.18823 20.4 7.2 20.4C5.21177 20.4 3.6 18.7882 3.6 16.8C3.6 14.8118 5.21177 13.2 7.2 13.2H10.8V9.6Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3L18.5 5.4V11.2C18.5 15.7 15.7 19.8 12 21C8.3 19.8 5.5 15.7 5.5 11.2V5.4L12 3Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8.8 11.9L11 14.1L15.4 9.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 20.2C11.7 20.2 11.4 20.1 11.2 19.8L5.4 13.9C3.1 11.6 3.1 7.8 5.4 5.5C7.1 3.8 9.8 3.6 11.7 5.1L12 5.4L12.3 5.1C14.2 3.6 16.9 3.8 18.6 5.5C20.9 7.8 20.9 11.6 18.6 13.9L12.8 19.8C12.6 20.1 12.3 20.2 12 20.2Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function SmallIcon({ kind }: { kind: string }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": true,
  } as const;

  switch (kind) {
    case "calendar":
      return (
        <svg {...common}>
          <path d="M7 3V6M17 3V6M4 9H20M5 5H19C19.5523 5 20 5.44772 20 6V19C20 19.5523 19.5523 20 19 20H5C4.44772 20 4 19.5523 4 19V6C4 5.44772 4.44772 5 5 5Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3L18 5.2V10.8C18 14.8 15.5 18.3 12 19.5C8.5 18.3 6 14.8 6 10.8V5.2L12 3Z" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
          <path d="M8.6 12.3L10.9 14.6L15.6 9.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "briefcase":
      return (
        <svg {...common}>
          <path d="M9 6.5V5.8C9 4.80589 9.80589 4 10.8 4H13.2C14.1941 4 15 4.80589 15 5.8V6.5M4.5 8H19.5V17.2C19.5 18.1941 18.6941 19 17.7 19H6.3C5.30589 19 4.5 18.1941 4.5 17.2V8Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M4.5 11.5H19.5" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );
    case "person":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.8" />
          <path d="M6 19C6.6 16.2 8.8 14.6 12 14.6C15.2 14.6 17.4 16.2 18 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "home":
      return (
        <svg {...common}>
          <path d="M5 10.5L12 5L19 10.5V18C19 18.5523 18.5523 19 18 19H14V14H10V19H6C5.44772 19 5 18.5523 5 18V10.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      );
    case "folder":
      return (
        <svg {...common}>
          <path d="M4 7.5C4 6.67157 4.67157 6 5.5 6H9L10.5 7.5H18.5C19.3284 7.5 20 8.17157 20 9V17.5C20 18.3284 19.3284 19 18.5 19H5.5C4.67157 19 4 18.3284 4 17.5V7.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      );
    case "profile":
      return (
        <svg {...common}>
          <rect x="4" y="5" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="9" cy="10" r="2" stroke="currentColor" strokeWidth="1.6" />
          <path d="M7 15C7.4 13.9 8.2 13.2 9.4 13.2C10.6 13.2 11.4 13.9 11.8 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M14 9H17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M14 12H17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "list":
      return (
        <svg {...common}>
          <path d="M9 7H18M9 12H18M9 17H18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="5.5" cy="7" r="1" fill="currentColor" />
          <circle cx="5.5" cy="12" r="1" fill="currentColor" />
          <circle cx="5.5" cy="17" r="1" fill="currentColor" />
        </svg>
      );
    default:
      return null;
  }
}
