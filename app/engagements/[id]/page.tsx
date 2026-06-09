import { EngagementShareView } from "@/components/engagement-share-view";

export default async function EngagementSharePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <EngagementShareView engagementId={id} />;
}
