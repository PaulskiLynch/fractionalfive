import Link from "next/link";
import type { ReactNode } from "react";
import { OperatorSwitcher } from "@/components/operator-switcher";

type NavItem = {
  href: string;
  label: string;
};

const navItems: NavItem[] = [
  { href: "/operator-profile", label: "Operator Profile" },
  { href: "/new-engagement", label: "New Engagement" },
  { href: "/engagement-workspace", label: "Engagement Workspace" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/cohort-report", label: "Cohort Report" },
];

export function ProductShell({
  activePath,
  eyebrow,
  title,
  intro,
  actions,
  children,
}: {
  activePath: string;
  eyebrow: string;
  title: string;
  intro: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen px-5 py-5 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-[30px] border border-line bg-panel/95 p-5 soft-shadow sm:p-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted">
                  FractionalFive / prototype
                </p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                  {title}
                </h1>
                <p className="mt-3 max-w-3xl text-base leading-7 text-muted">{intro}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <OperatorSwitcher />
                <Link
                  href="/"
                  className="rounded-full border border-line bg-white px-4 py-2.5 text-sm font-semibold text-foreground hover:-translate-y-0.5"
                >
                  Overview
                </Link>
                {actions}
              </div>
            </div>

            <nav className="flex flex-wrap gap-3">
              {navItems.map((item) => {
                const isActive = item.href === activePath;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-full px-4 py-2.5 text-sm font-semibold ${
                      isActive
                        ? "bg-accent text-white"
                        : "border border-line bg-white text-foreground hover:-translate-y-0.5"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </header>

        {children}
      </div>
    </main>
  );
}
