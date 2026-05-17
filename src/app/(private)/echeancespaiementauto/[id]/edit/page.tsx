import { GenericEditPage } from "@/components/erp/generic/GenericEditPage";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({
  params,
}: PageProps) {
  const resolvedParams =
    await params;

  return (
    <GenericEditPage
      moduleKey="echeancespaiementauto"
      id={resolvedParams.id}
    />
  );
}
