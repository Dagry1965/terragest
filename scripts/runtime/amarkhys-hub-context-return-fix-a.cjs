const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const TARGET = path.join(ROOT, "src/components/erp/hub/ERPClientOperationalSheet.tsx");
const REPORT = path.join(ROOT, "docs/audits/AMARKHYS-HUB-CONTEXT-RETURN-FIX-A.md");
const BACKUP = TARGET + ".bak-context-return-fix-a";

function fail(message) {
  console.error("[FAIL] " + message);
  process.exit(1);
}

function ok(message) {
  console.log("[OK] " + message);
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, "utf8");
}

if (!fs.existsSync(TARGET)) {
  fail("Missing target: " + TARGET);
}

const before = read(TARGET);
write(BACKUP, before);

let after = before;

if (!after.includes("function withHubReturnContext(")) {
  const anchor = `function withReturnTo(
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

  if (!after.includes(anchor)) {
    fail("withReturnTo anchor not found");
  }

  after = after.replace(
    anchor,
    anchor + `
function withHubReturnContext(
  hrefValue: string | null | undefined,
  returnTo: string,
  params: Record<string, string | null | undefined> = {}
): string {
  if (!hrefValue) return "#";
  if (!hrefValue.startsWith("/")) return hrefValue;
  if (hrefValue.includes("returnTo=")) return hrefValue;

  return withReturnTo(hrefValue, returnTo, params);
}
`
  );
}

if (!after.includes("const selectedPaymentForReturn = useMemo(() => {")) {
  const anchor = `  const hubActions = useMemo(() => {`;

  if (!after.includes(anchor)) {
    fail("hubActions anchor not found");
  }

  const block = `  const selectedPaymentForReturn = useMemo(() => {
    const selectedInvoiceId = recordId(selectedInvoice);
    const selectedInterventionRecordId = recordId(selectedIntervention);

    return (
      encaissements.find((encaissement) => {
        const factureId = String(
          encaissement.factureId ??
            encaissement.invoiceId ??
            encaissement.factureAutoId ??
            ""
        );

        return selectedInvoiceId ? factureId === selectedInvoiceId : false;
      }) ??
      encaissements.find((encaissement) => {
        return selectedInterventionRecordId
          ? String(encaissement.interventionId ?? "") === selectedInterventionRecordId
          : false;
      }) ??
      encaissements[0] ??
      null
    );
  }, [encaissements, selectedInvoice, selectedIntervention]);

  const hubActionReturnParams = {
    clientId: recordId(rootRecord),
    selectedVehicleId: recordId(selectedVehicle),
    selectedRendezvousId: recordId(selectedRendezvous),
    selectedInterventionId: recordId(selectedIntervention),
    selectedFactureId: recordId(selectedInvoice),
  };

  const contextualVehicleDetailHref = selectedVehicle
    ? withReturnTo(href("/vehicules", selectedVehicle) + "/edit", hubReturnTo, hubActionReturnParams)
    : withHubReturnContext(vehicleDetailHref, hubReturnTo, hubActionReturnParams);

  const contextualInterventionDetailHref = selectedIntervention
    ? withReturnTo("/interventionsauto/" + recordId(selectedIntervention), hubReturnTo, hubActionReturnParams)
    : withHubReturnContext(interventionDetailHref, hubReturnTo, hubActionReturnParams);

  const contextualInvoiceDetailHref = selectedInvoice
    ? withReturnTo("/facturesauto/" + recordId(selectedInvoice), hubReturnTo, hubActionReturnParams)
    : withHubReturnContext(invoiceDetailHref, hubReturnTo, hubActionReturnParams);

  const contextualPaymentDetailHref = selectedPaymentForReturn
    ? withReturnTo("/encaissementsauto/" + recordId(selectedPaymentForReturn), hubReturnTo, hubActionReturnParams)
    : withHubReturnContext(paymentDetailHref, hubReturnTo, hubActionReturnParams);

`;

  after = after.replace(anchor, block + anchor);
}

after = after.replaceAll("href={vehicleDetailHref}", "href={contextualVehicleDetailHref}");
after = after.replaceAll("href={interventionDetailHref}", "href={contextualInterventionDetailHref}");
after = after.replaceAll("href={invoiceDetailHref}", "href={contextualInvoiceDetailHref}");
after = after.replaceAll("href={paymentDetailHref}", "href={contextualPaymentDetailHref}");

after = after.replaceAll(
  "href={action.href}",
  "href={withHubReturnContext(action.href, hubReturnTo, hubActionReturnParams)}"
);

after = after.replaceAll(
  'href={action.href ?? "#"}',
  "href={withHubReturnContext(action.href, hubReturnTo, hubActionReturnParams)}"
);

const checks = [
  ["changed", after !== before],
  ["withHubReturnContext", after.includes("function withHubReturnContext(")],
  ["selectedPaymentForReturn", after.includes("const selectedPaymentForReturn = useMemo")],
  ["contextualVehicleDetailHref", after.includes("const contextualVehicleDetailHref")],
  ["contextualInterventionDetailHref", after.includes("const contextualInterventionDetailHref")],
  ["contextualInvoiceDetailHref", after.includes("const contextualInvoiceDetailHref")],
  ["contextualPaymentDetailHref", after.includes("const contextualPaymentDetailHref")],
  ["quick vehicle patched", after.includes("href={contextualVehicleDetailHref}")],
  ["quick intervention patched", after.includes("href={contextualInterventionDetailHref}")],
  ["quick invoice patched", after.includes("href={contextualInvoiceDetailHref}")],
  ["quick payment patched", after.includes("href={contextualPaymentDetailHref}")],
];

const failed = checks.filter(([, passed]) => !passed);
if (failed.length) {
  fail("Checks failed: " + failed.map(([name]) => name).join(", "));
}

write(TARGET, after);

write(REPORT, [
  "# AMARKHYS-HUB-CONTEXT-RETURN-FIX-A",
  "",
  "## Objectif",
  "",
  "Contextualiser les liens sortants de la fiche client opérationnelle.",
  "",
  "## Corrigé",
  "",
  "- Navigation rapide véhicule",
  "- Navigation rapide intervention",
  "- Navigation rapide facture",
  "- Navigation rapide encaissement",
  "- Actions client préparées avec returnTo",
  "",
  "## Checks",
  "",
  ...checks.map(([name, passed]) => "- " + (passed ? "OK" : "FAIL") + " — " + name),
  "",
].join("\\n"));

ok("Written: " + path.relative(ROOT, TARGET));
ok("Report: " + path.relative(ROOT, REPORT));
console.log("[AMARKHYS-HUB-CONTEXT-RETURN-FIX-A] DONE");