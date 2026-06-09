import { CohortReportDemo } from "@/components/cohort-report-demo";
import { ProductShell } from "@/components/product-shell";

export default function CohortReportPage() {
  return (
    <ProductShell
      activePath="/cohort-report"
      eyebrow="Cohort / Thesis Report"
      title="See what the first operators are actually proving"
      intro="This is the thesis view across the whole cohort: packaging effort, boundary pressure, trust signals, extra-capacity patterns, and renewal evidence in one place."
    >
      <CohortReportDemo />
    </ProductShell>
  );
}
