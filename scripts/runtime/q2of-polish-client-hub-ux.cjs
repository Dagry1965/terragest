const fs = require("fs");
const path = require("path");

const root = process.cwd();

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function write(relativePath, content) {
  const full = path.join(root, relativePath);
  const backup = full + ".bak-q2of-client-hub-polish";

  if (!fs.existsSync(backup)) {
    fs.writeFileSync(backup, fs.readFileSync(full, "utf8"), "utf8");
    console.log("[BACKUP] " + path.relative(root, backup));
  }

  fs.writeFileSync(full, content, "utf8");
  console.log("[WRITTEN] " + relativePath);
}

function replaceOrFail(relativePath, from, to, label) {
  const content = read(relativePath);

  if (!content.includes(from)) {
    console.log("[WARN] Pattern not found for " + label + " in " + relativePath);
    return false;
  }

  write(relativePath, content.replace(from, to));
  console.log("[OK] " + label);
  return true;
}

console.log("[Q2-OF] Safe polish Client Operational Hub UX");
console.log("[ROOT] " + root);

/**
 * 1. RuntimeHubTypes — ajouter selectionQueryParam + enrichir relation descriptor.
 */
{
  const file = "src/runtime/hub/RuntimeHubTypes.ts";
  let content = read(file);

  if (!content.includes("selectionQueryParam?: string;")) {
    content = content.replace(
      "  displayModeSourceField?: string;\n",
      "  displayModeSourceField?: string;\n  selectionQueryParam?: string;\n"
    );
  }

  if (!content.includes("labelFields?: string[];") || !content.includes("actions?: ERPRecordHubActionConfig[];")) {
    content = content.replace(
      `export type ERPRecordHubRelationDescriptor = {
  key: string;
  label: string;
  moduleKey: string;
  foreignKey: string;
  layout: ERPRecordHubSectionLayout;
};`,
      `export type ERPRecordHubRelationDescriptor = {
  key: string;
  label: string;
  moduleKey: string;
  foreignKey: string;
  layout: ERPRecordHubSectionLayout;
  labelFields?: string[];
  subtitleFields?: string[];
  actions?: ERPRecordHubActionConfig[];
};`
    );
  }

  write(file, content);
}

/**
 * 2. RuntimeHubRelationResolver — transmettre labelFields/subtitleFields/actions.
 */
{
  const file = "src/runtime/hub/RuntimeHubRelationResolver.ts";
  let content = read(file);

  if (!content.includes("labelFields: section.labelFields")) {
    content = content.replace(
      `      layout: section.layout ?? "collapsible-list",
    }));`,
      `      layout: section.layout ?? "collapsible-list",
      labelFields: section.labelFields,
      subtitleFields: section.subtitleFields,
      actions: section.actions,
    }));`
    );
  }

  write(file, content);
}

/**
 * 3. Route client hub — ajouter selectionQueryParam + actions de navigation.
 */
{
  const file = "src/app/(private)/clientsauto/hub/page.tsx";
  let content = read(file);

  if (!content.includes('selectionQueryParam: "selectedVehicleId"')) {
    content = content.replace(
      `    displayModeSourceField: "typeClient",`,
      `    displayModeSourceField: "typeClient",
    selectionQueryParam: "selectedVehicleId",`
    );
  }

  if (!content.includes('key: "open-vehicle"')) {
    content = content.replace(
      `    tableFields: ["immatriculation", "marque", "modele", "statut"],
  },`,
      `    tableFields: ["immatriculation", "marque", "modele", "statut"],
    actions: [
      {
        key: "open-vehicle",
        label: "Fiche véhicule",
        kind: "open-record",
        moduleKey: "vehicules",
        hrefTemplate: "/vehicules/{id}",
        variant: "secondary",
      },
    ],
  },`
    );
  }

  if (!content.includes('key: "open-intervention"')) {
    content = content.replace(
      `      subtitleFields: ["dateIntervention", "montantTTC"],
    },`,
      `      subtitleFields: ["dateIntervention", "montantTTC"],
      actions: [
        {
          key: "open-intervention",
          label: "Fiche intervention",
          kind: "open-record",
          moduleKey: "interventionsauto",
          hrefTemplate: "/interventionsauto/{id}",
          variant: "secondary",
        },
      ],
    },`
    );
  }

  if (!content.includes('key: "open-facture"')) {
    content = content.replace(
      `      subtitleFields: ["dateFacture", "dateEcheance"],
    },`,
      `      subtitleFields: ["dateFacture", "dateEcheance"],
      actions: [
        {
          key: "open-facture",
          label: "Facture complète",
          kind: "open-record",
          moduleKey: "facturesauto",
          hrefTemplate: "/facturesauto/{id}",
          variant: "secondary",
        },
      ],
    },`
    );
  }

  write(file, content);
}

/**
 * 4. ERPRecordHubPage — sélection URL via query param.
 */
{
  const file = "src/components/erp/hub/ERPRecordHubPage.tsx";
  let content = read(file);

  if (!content.includes("useRouter")) {
    content = content.replace(
      `import { useMemo, useState } from "react";`,
      `import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";`
    );
  }

  if (!content.includes("const router = useRouter();")) {
    content = content.replace(
      `}: ERPRecordHubPageProps) {
  const [selectedPrimaryRecordId, setSelectedPrimaryRecordId] = useState<string | null>(
    primaryRecords[0]?.id ?? null
  );`,
      `}: ERPRecordHubPageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectionQueryParam =
    config.primaryCollection.selectionQueryParam ?? "selectedRecordId";

  const initialSelectedId =
    searchParams.get(selectionQueryParam) ?? primaryRecords[0]?.id ?? null;

  const [selectedPrimaryRecordId, setSelectedPrimaryRecordId] = useState<string | null>(
    initialSelectedId
  );`
    );
  }

  if (!content.includes("function handleSelectRecord")) {
    content = content.replace(
      `  }, [config, rootRecord, selectedPrimaryRecord]);

  return (`,
      `  }, [config, rootRecord, selectedPrimaryRecord]);

  function handleSelectRecord(recordId: string | null) {
    setSelectedPrimaryRecordId(recordId);

    const params = new URLSearchParams(searchParams.toString());

    if (recordId) {
      params.set(selectionQueryParam, recordId);
    } else {
      params.delete(selectionQueryParam);
    }

    router.replace(params.toString() ? pathname + "?" + params.toString() : pathname);
  }

  return (`
    );
  }

  content = content.replace(
    `            onSelectRecord={setSelectedPrimaryRecordId}`,
    `            onSelectRecord={handleSelectRecord}`
  );

  content = content.replace(
    `max-w-7xl`,
    `max-w-[1600px]`
  );

  write(file, content);
}

/**
 * 5. Créer audit Q2-OF final.
 */
{
  const auditPath = path.join(root, "scripts/runtime/q2of-audit-client-hub-polish.cjs");

  const audit = `
const fs = require("fs");
const path = require("path");

const root = process.cwd();

const files = [
  "src/runtime/hub/RuntimeHubTypes.ts",
  "src/runtime/hub/RuntimeHubRelationResolver.ts",
  "src/components/erp/hub/ERPRecordHubPage.tsx",
  "src/components/erp/hub/ERPRecordHubPrimaryCollection.tsx",
  "src/components/erp/hub/ERPRecordHubSelectedDetails.tsx",
  "src/app/(private)/clientsauto/hub/page.tsx"
];

let ok = 0;
let fail = 0;

console.log("[Q2-OF] Client Hub polish audit");
console.log("[ROOT] " + root);

for (const file of files) {
  const full = path.join(root, file);

  if (!fs.existsSync(full)) {
    console.log("[FAIL] Missing file: " + file);
    fail += 1;
    continue;
  }

  console.log("[OK] Found: " + file);
  ok += 1;
}

const page = fs.readFileSync(path.join(root, "src/components/erp/hub/ERPRecordHubPage.tsx"), "utf8");
const route = fs.readFileSync(path.join(root, "src/app/(private)/clientsauto/hub/page.tsx"), "utf8");
const resolver = fs.readFileSync(path.join(root, "src/runtime/hub/RuntimeHubRelationResolver.ts"), "utf8");
const types = fs.readFileSync(path.join(root, "src/runtime/hub/RuntimeHubTypes.ts"), "utf8");

const expected = [
  [page, "useRouter"],
  [page, "selectionQueryParam"],
  [route, "selectionQueryParam"],
  [route, "open-vehicle"],
  [route, "open-intervention"],
  [route, "open-facture"],
  [resolver, "labelFields"],
  [resolver, "actions"],
  [types, "selectionQueryParam"]
];

for (const [content, marker] of expected) {
  if (content.includes(marker)) {
    console.log("[OK] Marker detected: " + marker);
    ok += 1;
  } else {
    console.log("[FAIL] Marker missing: " + marker);
    fail += 1;
  }
}

const forbidden = ["firebase/firestore", "getDocs(", "collection("];

for (const file of files) {
  const content = fs.readFileSync(path.join(root, file), "utf8");

  for (const marker of forbidden) {
    if (content.includes(marker)) {
      console.log("[FAIL] Forbidden local Firestore marker " + marker + " in " + file);
      fail += 1;
    }
  }
}

function walk(dir, backups) {
  if (!fs.existsSync(dir)) return;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(full, backups);
      continue;
    }

    if (entry.name.includes(".bak-q2of")) {
      backups.push(full);
    }
  }
}

const backups = [];
walk(root, backups);

if (backups.length > 0) {
  for (const backup of backups) {
    console.log("[FAIL] Backup still present: " + path.relative(root, backup));
    fail += 1;
  }
} else {
  console.log("[OK] No Q2-OF backup detected");
  ok += 1;
}

console.log("[OK] " + ok);
console.log("[FAIL] " + fail);

if (fail > 0) {
  process.exit(1);
}

console.log("[Q2-OF] Client Hub polish audit completed successfully.");
`;

  fs.writeFileSync(auditPath, audit.trimStart(), "utf8");
  console.log("[WRITTEN] scripts/runtime/q2of-audit-client-hub-polish.cjs");
}

console.log("[Q2-OF] DONE");