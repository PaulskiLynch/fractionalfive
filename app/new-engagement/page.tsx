import { NewEngagementForm } from "@/components/new-engagement-form";
import { ProductShell } from "@/components/product-shell";

export default async function NewEngagementPage({
  searchParams,
}: {
  searchParams: Promise<{ block?: string }>;
}) {
  const params = await searchParams;

  return (
    <ProductShell
      activePath="/new-engagement"
      eyebrow="Onboarding / New Engagement"
      title="Create a new engagement from structured operator capacity"
      intro="This onboarding step turns a visible operator block into a live client engagement with scope, renewal timing, and workspace-ready defaults."
    >
      <NewEngagementForm initialBlockId={params.block} />
    </ProductShell>
  );
}
