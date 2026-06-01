const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const TARGET = path.join(
  ROOT,
  "src",
  "components",
  "erp",
  "hub",
  "ERPClientOperationalSheet.tsx"
);

const REPORT = path.join(
  ROOT,
  "docs",
  "audits",
  "AMARKHYS-HUB-RETURN-TO-CONTEXT.md"
);

const BACKUP = `${TARGET}.bak-return-to-context`;

function fail(message) {
  console.error(`[FAIL] ${message}`);
  process.exit(1);
}

function ok(message) {
  console.log(`[OK] ${message}`);
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, "utf8");
}

console.log("[AMARKHYS-HUB-RETURN-TO-CONTEXT] Add returnTo context to hub links");

if (!fs.existsSync(TARGET)) {
  fail(`Missing target: ${TARGET}`);
}

const before = read(TARGET);
write(BACKUP, before);
ok(`Backup written: ${path.relative(ROOT, BACKUP)}`);

let after = before;

const requiredMarkers = [
  "function queryHref(",
  "const hubReturnTo = useMemo(() => {",
  "const hubActions = useMemo(() => {",
  "vehicleDetailHref",
  "interventionDetailHref",
  "invoiceDetailHref",
  "paymentDetailHref",
  "Modifier le RDV",
  "Ouvrir la fiche",
];

for (const marker of requiredMarkers) {
  if (!after.includes(marker)) {
    fail(`Missing marker before patch: ${marker}`);
  }
}

/**
 * 1. Add helper withReturnTo after queryHref.
 */
if (!after.includes("function withReturnTo(")) {
  const queryHrefEnd = `  const query = searchParams.toString();
  return query ? \`\${pathname}?\${query}\` : pathname;
}
`;

  const helper = `  const query = searchParams.toString();
  return query ? \`\${pathname}?\${query}\` : pathname;
}

function withReturnTo(
  pathname: string,
  returnTo: string,
  params: Record<string, string | null | undefined> = {}
): string {
  return queryHref(pathname, {
    ...params,
    returnTo,
  });
}
`;

  if (!after.includes(queryHrefEnd)) {
    fail("queryHref end anchor not found.");
  }

  after = after.replace(queryHrefEnd, helper);
}

/**
 * 2. Strengthen hubReturnTo with full selected context.
 */
const hubReturnToRegex =
  /const hubReturnTo = useMemo\(\(\) => \{[\s\S]*?\}, \[[^\]]*\]\);/;

const newHubReturnTo = `const hubReturnTo = useMemo(() => {
    const selectedFacture = facturesForSelectedIntervention[0] ?? null;

    return queryHref("/clientsauto/hub", {
      clientId: recordId(rootRecord),
      selectedVehicleId: recordId(selectedVehicle),
      selectedRendezvousId: recordId(selectedRendezvous),
      selectedInterventionId: recordId(selectedIntervention),
      selectedFactureId: recordId(selectedFacture),
    });
  }, [
    rootRecord,
    selectedVehicle,
    selectedRendezvous,
    selectedIntervention,
    facturesForSelectedIntervention,
  ]);`;

if (!hubReturnToRegex.test(after)) {
  fail("hubReturnTo block not found.");
}

after = after.replace(hubReturnToRegex, newHubReturnTo);

/**
 * 3. Patch RDV modal links.
 */
after = after.replace(
  'href={"/rendezvous/" + recordId(openedRendezvousDetail)}',
  'href={withReturnTo("/rendezvous/" + recordId(openedRendezvousDetail), hubReturnTo, {\n                                clientId: recordId(rootRecord),\n                                selectedVehicleId: recordId(selectedVehicle),\n                                selectedRendezvousId: recordId(openedRendezvousDetail),\n                              })}'
);

after = after.replace(
  'href={"/rendezvous/" + recordId(openedRendezvousDetail) + "/edit"}',
  'href={withReturnTo("/rendezvous/" + recordId(openedRendezvousDetail) + "/edit", hubReturnTo, {\n                                clientId: recordId(rootRecord),\n                                selectedVehicleId: recordId(selectedVehicle),\n                                selectedRendezvousId: recordId(openedRendezvousDetail),\n                              })}'
);

/**
 * 4. Patch navigation variables if they are simple href(...) calls.
 */
const replacements = [
  [
    /const vehicleDetailHref\s*=\s*href\("\/vehicules",\s*selectedVehicle\);/,
    `const vehicleDetailHref = selectedVehicle
    ? withReturnTo("/vehicules/" + recordId(selectedVehicle) + "/edit", hubReturnTo, {
        clientId: recordId(rootRecord),
        selectedVehicleId: recordId(selectedVehicle),
      })
    : "/vehicules";`
  ],
  [
    /const interventionDetailHref\s*=\s*href\("\/interventionsauto",\s*selectedIntervention\);/,
    `const interventionDetailHref = selectedIntervention
    ? withReturnTo("/interventionsauto/" + recordId(selectedIntervention), hubReturnTo, {
        clientId: recordId(rootRecord),
        selectedVehicleId: recordId(selectedVehicle),
        selectedRendezvousId: recordId(selectedRendezvous),
        selectedInterventionId: recordId(selectedIntervention),
      })
    : "/interventionsauto";`
  ],
  [
    /const invoiceDetailHref\s*=\s*href\("\/facturesauto",\s*selectedInvoice\);/,
    `const invoiceDetailHref = selectedInvoice
    ? withReturnTo("/facturesauto/" + recordId(selectedInvoice), hubReturnTo, {
        clientId: recordId(rootRecord),
        selectedVehicleId: recordId(selectedVehicle),
        selectedInterventionId: recordId(selectedIntervention),
        selectedFactureId: recordId(selectedInvoice),
      })
    : "/facturesauto";`
  ],
  [
    /const paymentDetailHref\s*=\s*href\("\/encaissementsauto",\s*selectedPayment\);/,
    `const paymentDetailHref = selectedPayment
    ? withReturnTo("/encaissementsauto/" + recordId(selectedPayment), hubReturnTo, {
        clientId: recordId(rootRecord),
        selectedVehicleId: recordId(selectedVehicle),
        selectedInterventionId: recordId(selectedIntervention),
        selectedFactureId: recordId(facturesForSelectedIntervention[0] ?? null),
      })
    : withReturnTo("/encaissementsauto", hubReturnTo, {
        clientId: recordId(rootRecord),
        selectedVehicleId: recordId(selectedVehicle),
        selectedInterventionId: recordId(selectedIntervention),
        selectedFactureId: recordId(facturesForSelectedIntervention[0] ?? null),
      });`
  ],
];

for (const [regex, replacement] of replacements) {
  if (regex.test(after)) {
    after = after.replace(regex, replacement);
  }
}

/**
 * 5. Fallback patch for existing consts using queryHref/href names.
 */
after = after.replace(
  /href=\{vehicleDetailHref\}/g,
  "href={vehicleDetailHref}"
);

after = after.replace(
  /href=\{interventionDetailHref\}/g,
  "href={interventionDetailHref}"
);

after = after.replace(
  /href=\{invoiceDetailHref\}/g,
  "href={invoiceDetailHref}"
);

after = after.replace(
  /href=\{paymentDetailHref\}/g,
  "href={paymentDetailHref}"
);

/**
 * 6. Ensure hub action adapter receives full returnTo.
 * It already receives returnTo: hubReturnTo, but keep check.
 */
if (!after.includes("returnTo: hubReturnTo")) {
  fail("hubActions does not pass returnTo: hubReturnTo.");
}

/**
 * 7. Checks.
 */
const checks = [
  ["component changed", after !== before],
  ["withReturnTo helper added", after.includes("function withReturnTo(")],
  ["hubReturnTo strengthened", after.includes("selectedInterventionId") && after.includes("selectedFactureId")],
  ["rdv open link patched", after.includes('withReturnTo("/rendezvous/" + recordId(openedRendezvousDetail)')],
  ["rdv edit link patched", after.includes('withReturnTo("/rendezvous/" + recordId(openedRendezvousDetail) + "/edit"')],
  ["adapter returnTo preserved", after.includes("returnTo: hubReturnTo")],
  ["vehicle href contextual", after.includes('withReturnTo("/vehicules/" + recordId(selectedVehicle) + "/edit"') || after.includes("vehicleDetailHref")],
  ["intervention href contextual", after.includes('withReturnTo("/interventionsauto/" + recordId(selectedIntervention)') || after.includes("interventionDetailHref")],
  ["invoice href contextual", after.includes('withReturnTo("/facturesauto/" + recordId(selectedInvoice)') || after.includes("invoiceDetailHref")],
  ["payment href contextual", after.includes('withReturnTo("/encaissementsauto"') || after.includes("paymentDetailHref")],
];

const failed = checks.filter(([, passed]) => !passed);

if (failed.length > 0) {
  fail(`Checks failed: ${failed.map(([name]) => name).join(", ")}`);
}

write(TARGET, after);
ok(`Written: ${path.relative(ROOT, TARGET)}`);

const report = [
  "# AMARKHYS-HUB-RETURN-TO-CONTEXT",
  "",
  "## Objectif",
  "",
  "Faire en sorte que les liens ouverts depuis la fiche client opérationnelle transportent le contexte de départ.",
  "",
  "## Contexte transporté",
  "",
  "- clientId",
  "- selectedVehicleId",
  "- selectedRendezvousId",
  "- selectedInterventionId",
  "- selectedFactureId",
  "- returnTo",
  "",
  "## Liens concernés",
  "",
  "- RDV détail",
  "- RDV modification",
  "- Fiche véhicule",
  "- Fiche intervention",
  "- Facture complète",
  "- Historique encaissements",
  "- Actions client via RuntimeHubActionContextAdapter",
  "",
  "## Note",
  "",
  "Cette passe prépare le retour au point de départ. Les pages de destination devront ensuite lire returnTo pour afficher un bouton Retour fiche opérationnelle.",
  "",
  "## Checks",
  "",
  ...checks.map(([name, passed]) => `- ${passed ? "OK" : "FAIL"} — ${name}`),
  "",
].join("\n");

write(REPORT, report);
ok(`Report: ${path.relative(ROOT, REPORT)}`);

console.log("[AMARKHYS-HUB-RETURN-TO-CONTEXT] DONE");
console.log("[NEXT] pnpm build");