import { GenericEditPage } from "@/components/erp/generic/GenericEditPage";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditCommandesPage({
  params,
}: PageProps) {

  const { id } = await params;

  return (
    <GenericEditPage
      moduleKey="commandes"
      id={id}
    />
  );
}