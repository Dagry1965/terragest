const fs = require("fs");
const path = require("path");

const root = process.cwd();

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, content, { encoding: "utf8" });
  console.log(`UPDATED ${path.relative(root, file)}`);
}

const breadcrumbFile = path.join(
  root,
  "src",
  "components",
  "erp",
  "navigation",
  "ERPReturnBreadcrumb.tsx"
);

const cardFile = path.join(
  root,
  "src",
  "components",
  "erp",
  "relations",
  "ClientVehiclesReadonlyCard.tsx"
);

const formFile = path.join(
  root,
  "src",
  "components",
  "erp",
  "forms",
  "enterprise",
  "ERPEnterpriseForm.tsx"
);

write(
  breadcrumbFile,
  `"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function ERPReturnBreadcrumb() {
  const searchParams =
    useSearchParams();

  const returnTo =
    searchParams.get("returnTo");

  const returnLabel =
    searchParams.get("returnLabel") || "Retour";

  if (!returnTo) {
    return null;
  }

  return (
    <nav className="rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <Link
          href={returnTo}
          className="font-black text-blue-700 transition hover:text-blue-900"
        >
          ← {returnLabel}
        </Link>

        <span className="text-slate-300">/</span>

        <span className="font-semibold text-slate-500">
          Fiche courante
        </span>
      </div>
    </nav>
  );
}
`
);

/**
 * 1) Dans la carte véhicules du client :
 * Ouvrir véhicule doit transporter returnTo + returnLabel.
 */
if (!fs.existsSync(cardFile)) {
  console.error(`MISSING ${cardFile}`);
  process.exit(1);
}

let card = read(cardFile);

card = card.replace(
  `href={\`/vehicules/\${id}/edit\`}`,
  `href={{
                          pathname: \`/vehicules/\${id}/edit\`,
                          query: {
                            returnTo: \`/clientsauto/\${clientId}/edit\`,
                            returnLabel: "Retour au client",
                          },
                        }}`
);

write(cardFile, card);

/**
 * 2) Dans ERPEnterpriseForm :
 * afficher le breadcrumb s’il y a un returnTo dans l’URL.
 */
if (!fs.existsSync(formFile)) {
  console.error(`MISSING ${formFile}`);
  process.exit(1);
}

let form = read(formFile);

if (!form.includes("@/components/erp/navigation/ERPReturnBreadcrumb")) {
  const firstInterfaceIndex =
    form.indexOf("interface ");

  if (firstInterfaceIndex === -1) {
    console.error("Could not find import insertion point");
    process.exit(1);
  }

  const importBlock = `import {
  ERPReturnBreadcrumb,
} from "@/components/erp/navigation/ERPReturnBreadcrumb";

`;

  form =
    form.slice(0, firstInterfaceIndex) +
    importBlock +
    form.slice(firstInterfaceIndex);
}

if (!form.includes("<ERPReturnBreadcrumb />")) {
  form = form.replace(
    `      {isInvoiceEditForm ? (`,
    `      <ERPReturnBreadcrumb />

      {isInvoiceEditForm ? (`
  );
}

write(formFile, form);

console.log("DONE install return breadcrumb context");