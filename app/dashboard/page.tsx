import { DashboardDemo } from "@/components/dashboard-demo";
import { ProductShell } from "@/components/product-shell";

export default function DashboardPage() {
  return (
    <ProductShell
      activePath="/dashboard"
      eyebrow="Tool 03 / Operator Dashboard"
      title="Run multiple client blocks without turning yourself into an agency"
      intro="The dashboard is the operator's control layer: every current engagement, this week's allocated blocks, extra-capacity decisions, completed work logs, and renewals approaching."
    >
      <DashboardDemo />
    </ProductShell>
  );
}
