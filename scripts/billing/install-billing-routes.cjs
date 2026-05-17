const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

function write(relativePath, content) {
  const file = path.join(ROOT, relativePath);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, "utf8");
  console.log("WRITTEN", relativePath);
}

function installRoutes(moduleKey) {
  write(
    `src/app/(private)/${moduleKey}/page.tsx`,
`import { GenericListPage } from "@/components/erp/generic/GenericListPage";

export const dynamic = "force-dynamic";

export default function Page() {
  return <GenericListPage moduleKey="${moduleKey}" />;
}
`
  );

  write(
    `src/app/(private)/${moduleKey}/nouveau/page.tsx`,
`import { GenericCreatePage } from "@/components/erp/generic/GenericCreatePage";

export const dynamic = "force-dynamic";

export default function Page() {
  return <GenericCreatePage moduleKey="${moduleKey}" />;
}
`
  );

  write(
    `src/app/(private)/${moduleKey}/[id]/page.tsx`,
`import { GenericDetailPage } from "@/components/erp/generic/GenericDetailPage";

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
    <GenericDetailPage
      moduleKey="${moduleKey}"
      id={resolvedParams.id}
    />
  );
}
`
  );

  write(
    `src/app/(private)/${moduleKey}/[id]/edit/page.tsx`,
`import { GenericEditPage } from "@/components/erp/generic/GenericEditPage";

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
      moduleKey="${moduleKey}"
      id={resolvedParams.id}
    />
  );
}
`
  );
}

installRoutes("encaissementsauto");
installRoutes("echeancespaiementauto");

console.log("");
console.log("Billing routes installed.");
console.log("Done.");