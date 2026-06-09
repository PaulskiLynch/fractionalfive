import Link from "next/link";
import { OperatorProfileDemo } from "@/components/operator-profile-demo";
import { ProductShell } from "@/components/product-shell";

export default function OperatorProfilePage() {
  return (
    <ProductShell
      activePath="/operator-profile"
      eyebrow="Tool 01 / Operator Capacity Profile"
      title="Operator profile that sells clarity before the first call"
      intro="This page packages one independent operator into a client-readable offer: what they do, how much capacity exists, what is in scope, what is not, and what kind of cadence the client should expect."
      actions={
        <Link
          href="/engagement-workspace"
          className="rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:-translate-y-0.5 hover:bg-accent-strong"
        >
          Next: workspace
        </Link>
      }
    >
      <OperatorProfileDemo />
    </ProductShell>
  );
}
