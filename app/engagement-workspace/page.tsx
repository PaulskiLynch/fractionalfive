import Link from "next/link";
import { EngagementWorkspaceDemo } from "@/components/engagement-workspace-demo";
import { ProductShell } from "@/components/product-shell";

export default function EngagementWorkspacePage() {
  return (
    <ProductShell
      activePath="/engagement-workspace"
      eyebrow="Tool 02 / Client Engagement Workspace"
      title="One page where both sides can see the work, scope, and next move"
      intro="The workspace turns a fuzzy fractional engagement into a shared operating surface. It gives clients confidence without status-chasing and gives operators a boundary tool when new asks appear."
      actions={
        <Link
          href="/dashboard"
          className="rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:-translate-y-0.5 hover:bg-accent-strong"
        >
          Next: dashboard
        </Link>
      }
    >
      <EngagementWorkspaceDemo />
    </ProductShell>
  );
}
