const fs = require("fs");
const path = require("path");

const root = process.cwd();
const filePath = "src/components/erp/hub/ERPClientOperationalSheet.tsx";
const fullPath = path.join(root, filePath);

if (!fs.existsSync(fullPath)) {
  console.error("[MISSING]", filePath);
  process.exit(1);
}

const backupPath = `${fullPath}.bak-q2op-b4-actions-polish`;
if (!fs.existsSync(backupPath)) {
  fs.copyFileSync(fullPath, backupPath);
  console.log("[BACKUP]", path.relative(root, backupPath));
}

let content = fs.readFileSync(fullPath, "utf8");

/**
 * 1. Add safe query href helper.
 */
if (!content.includes("function queryHref(")) {
  content = content.replace(
    `function href(modulePath: string, record: ERPRecordHubRecord | null | undefined): string {
  const id = recordId(record);
  return id ? \`\${modulePath}/\${id}\` : modulePath;
}`,
    `function href(modulePath: string, record: ERPRecordHubRecord | null | undefined): string {
  const id = recordId(record);
  return id ? \`\${modulePath}/\${id}\` : modulePath;
}

function queryHref(
  pathname: string,
  params: Record<string, string | null | undefined>
): string {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (typeof value === "string" && value.trim().length > 0) {
      searchParams.set(key, value);
    }
  }

  const query = searchParams.toString();
  return query ? \`\${pathname}?\${query}\` : pathname;
}`
  );
}

/**
 * 2. Add contextual href constants after clientType.
 */
if (!content.includes("const clientId = recordId(rootRecord);")) {
  content = content.replace(
    `const clientType = text(
    rootRecord,
    ["clientType", "typeClient", "categorieClient", "type"],
    "Particulier"
  );`,
    `const clientType = text(
    rootRecord,
    ["clientType", "typeClient", "categorieClient", "type"],
    "Particulier"
  );

  const clientId = recordId(rootRecord);
  const selectedVehicleRecordId = recordId(selectedVehicle);

  const clientReturnTo = queryHref("/clientsauto/hub", {
    clientId,
    selectedVehicleId: selectedVehicleRecordId,
  });

  const addVehicleHref = queryHref("/vehicules/nouveau", {
    clientId,
    returnTo: clientReturnTo,
  });

  const fullActivityHref = queryHref("/clientsauto/hub", {
    clientId,
    selectedVehicleId: selectedVehicleRecordId,
    view: "activity",
  }) + "#activite-recente";

  const allAppointmentsHref = queryHref("/rendezvous", {
    clientId,
    vehiculeId: selectedVehicleRecordId,
  });

  const interventionsHref = queryHref("/interventionsauto", {
    clientId,
    vehiculeId: selectedVehicleRecordId,
  });

  const invoicesHref = queryHref("/facturesauto", {
    clientId,
    vehiculeId: selectedVehicleRecordId,
  });

  const paymentsHref = queryHref("/encaissementsauto", {
    clientId,
    vehiculeId: selectedVehicleRecordId,
  });`
  );
}

/**
 * 3. Widen page / main grid.
 */
content = content.replace(
  `className="mx-auto max-w-[1880px] px-6 py-8 xl:px-10 2xl:px-12"`,
  `className="mx-auto max-w-[2040px] px-8 py-10 xl:px-12 2xl:px-16"`
);

content = content.replace(
  `2xl:grid-cols-[minmax(0,1fr)_420px]`,
  `2xl:grid-cols-[minmax(0,1fr)_460px]`
);

/**
 * 4. Business action links.
 */
content = content.replace(
  `href="/vehicules/nouveau"`,
  `href={addVehicleHref}`
);

content = content.replace(
  `href="/clientsauto" className="mt-5 inline-flex text-sm font-bold text-emerald-700"`,
  `href={fullActivityHref} className="mt-5 inline-flex text-sm font-bold text-emerald-700"`
);

content = content.replace(
  `href="/rendezvous" className="mt-5 inline-flex text-sm font-bold text-emerald-700"`,
  `href={allAppointmentsHref} className="mt-5 inline-flex text-sm font-bold text-emerald-700"`
);

content = content.replace(
  `href="/interventionsauto"
                    className="rounded-[1.25rem] bg-slate-100 px-4 py-3 text-sm font-bold text-slate-900"`,
  `href={interventionsHref}
                    className="rounded-[1.25rem] bg-slate-100 px-4 py-3 text-sm font-bold text-slate-900"`
);

content = content.replace(
  `href="/facturesauto"
                    className="rounded-[1.25rem] bg-slate-100 px-4 py-3 text-sm font-bold text-slate-900"`,
  `href={invoicesHref}
                    className="rounded-[1.25rem] bg-slate-100 px-4 py-3 text-sm font-bold text-slate-900"`
);

content = content.replace(
  `href="/encaissementsauto"
                    className="rounded-[1.25rem] bg-slate-100 px-4 py-3 text-sm font-bold text-slate-900"`,
  `href={paymentsHref}
                    className="rounded-[1.25rem] bg-slate-100 px-4 py-3 text-sm font-bold text-slate-900"`
);

/**
 * 5. Add anchors for exact sections.
 */
content = content.replace(
  `<div className="rounded-[2.25rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
                  <SectionTitle title="ACTIVITÉ RÉCENTE" />`,
  `<div id="activite-recente" className="rounded-[2.25rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
                  <SectionTitle title="ACTIVITÉ RÉCENTE" />`
);

content = content.replace(
  `<div className="rounded-[2.25rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
                  <SectionTitle title="À VENIR" />`,
  `<div id="a-venir" className="rounded-[2.25rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
                  <SectionTitle title="À VENIR" />`
);

content = content.replace(
  `<section className="rounded-[2.25rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
                <SectionTitle title="PARCOURS DÉTAILLÉ : DU VÉHICULE À LA FACTURE" />`,
  `<section id="parcours-detaille" className="rounded-[2.25rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
                <SectionTitle title="PARCOURS DÉTAILLÉ : DU VÉHICULE À LA FACTURE" />`
);

/**
 * 6. Improve vehicle cards size and KPI readability.
 */
content = content.replace(
  `className="grid gap-5 lg:grid-cols-2 2xl:grid-cols-3"`,
  `className="grid gap-6 lg:grid-cols-2 2xl:grid-cols-3"`
);

content = content.replace(
  `className="mb-5 h-36 rounded-[1.5rem] bg-gradient-to-br from-slate-200 to-slate-100"`,
  `className="mb-5 h-44 rounded-[1.5rem] bg-gradient-to-br from-slate-200 to-slate-100"`
);

content = content.replace(
  `["Factures impayées", \`\${text(rootRecord, ["unpaidInvoicesCount", "facturesImpayees"], "0")} · \${money(unpaidAmount)}\`]`,
  `["Factures impayées", \`\${text(rootRecord, ["unpaidInvoicesCount", "facturesImpayees"], "0")} impayée(s) · \${money(unpaidAmount)}\`]`
);

/**
 * 7. Required markers.
 */
const required = [
  "const addVehicleHref =",
  "const fullActivityHref =",
  "const allAppointmentsHref =",
  "href={addVehicleHref}",
  "href={fullActivityHref}",
  "href={allAppointmentsHref}",
  "id=\\"activite-recente\\"",
  "max-w-[2040px]",
];

for (const marker of required) {
  if (!content.includes(marker)) {
    console.error("[PATCH_FAILED] Missing marker:", marker);
    process.exit(1);
  }
}

fs.writeFileSync(fullPath, content, "utf8");

console.log("[WRITTEN]", filePath);
console.log("[Q2-OP-B4] Client sheet business actions and visual polish applied.");
console.log("Next:");
console.log("  pnpm build");
console.log("  git status --short");