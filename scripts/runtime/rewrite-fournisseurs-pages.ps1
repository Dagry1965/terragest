$ErrorActionPreference = "Stop"

$root = "C:\Users\Admin\terragest"

function Write-File($path, $content) {
  [System.IO.File]::WriteAllText(
    $path,
    $content,
    [System.Text.UTF8Encoding]::new($false)
  )
  Write-Host "OK:" $path
}

$list = @'
import { GenericListPage } from "@/components/erp/generic/GenericListPage";
import { coreERPModules } from "@/runtime/modules/definitions/coreModules";
import type { ERPModule } from "@/runtime/modules/ERPModule";

export default function FournisseursPage() {
  const erpModule = coreERPModules.find(
    (item) => item.metadata.key === "fournisseurs"
  ) as ERPModule | undefined;

  if (!erpModule) {
    throw new Error("Module fournisseurs introuvable");
  }

  return <GenericListPage module={erpModule} />;
}
'@

$create = @'
import { GenericCreatePage } from "@/components/erp/generic/GenericCreatePage";
import { coreERPModules } from "@/runtime/modules/definitions/coreModules";
import type { ERPModule } from "@/runtime/modules/ERPModule";

export default function CreateFournisseursPage() {
  const erpModule = coreERPModules.find(
    (item) => item.metadata.key === "fournisseurs"
  ) as ERPModule | undefined;

  if (!erpModule) {
    throw new Error("Module fournisseurs introuvable");
  }

  return <GenericCreatePage module={erpModule} />;
}
'@

$detail = @'
import { GenericDetailPage } from "@/components/erp/generic/GenericDetailPage";
import { coreERPModules } from "@/runtime/modules/definitions/coreModules";
import type { ERPModule } from "@/runtime/modules/ERPModule";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function FournisseursDetailPage({ params }: Props) {
  const { id } = await params;

  const erpModule = coreERPModules.find(
    (item) => item.metadata.key === "fournisseurs"
  ) as ERPModule | undefined;

  if (!erpModule) {
    throw new Error("Module fournisseurs introuvable");
  }

  return <GenericDetailPage module={erpModule} id={id} />;
}
'@

$edit = @'
import { GenericEditPage } from "@/components/erp/generic/GenericEditPage";
import { coreERPModules } from "@/runtime/modules/definitions/coreModules";
import type { ERPModule } from "@/runtime/modules/ERPModule";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditFournisseursPage({ params }: Props) {
  const { id } = await params;

  const erpModule = coreERPModules.find(
    (item) => item.metadata.key === "fournisseurs"
  ) as ERPModule | undefined;

  if (!erpModule) {
    throw new Error("Module fournisseurs introuvable");
  }

  return <GenericEditPage module={erpModule} id={id} />;
}
'@

Write-File "$root\src\app\(private)\fournisseurs\page.tsx" $list
Write-File "$root\src\app\(private)\fournisseurs\nouveau\page.tsx" $create
Write-File "$root\src\app\(private)\fournisseurs\[id]\page.tsx" $detail
Write-File "$root\src\app\(private)\fournisseurs\[id]\edit\page.tsx" $edit