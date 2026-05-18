const fs = require("fs");
const path = require("path");

const root = process.cwd();

const target = path.join(
  root,
  "src/runtime/dashboard/generic/ERPDashboardWidgetEngine.ts"
);

let content = fs.readFileSync(target, "utf8");

if (!content.includes("function isLikelyTechnicalId(")) {
  content = content.replace(
`function compact(...parts: Array<string | undefined>): string {
  return parts
    .map((part) => String(part ?? "").trim())
    .filter(Boolean)
    .join(" · ");
}`,
`function compact(...parts: Array<string | undefined>): string {
  return parts
    .map((part) => String(part ?? "").trim())
    .filter(Boolean)
    .join(" · ");
}

function isLikelyTechnicalId(value: unknown): boolean {
  const text = String(value ?? "").trim();

  if (!text) {
    return false;
  }

  if (/^[A-Za-z0-9_-]{16,}$/.test(text)) {
    return true;
  }

  if (/^[0-9a-f]{20,}$/i.test(text)) {
    return true;
  }

  return false;
}

function relationFragment(
  label: string,
  relationLabel: string,
  relationId: unknown
): string | undefined {
  const id = String(relationId ?? "").trim();
  const value = String(relationLabel ?? "").trim();

  if (!id) {
    return undefined;
  }

  if (!value || value === id || isLikelyTechnicalId(value)) {
    return label + " introuvable";
  }

  return label + " : " + value;
}`
  );
}

content = content.replace(
`  const fragments = [
    clientLabel ? "Client : " + clientLabel : undefined,
    vehicleLabel ? "Véhicule : " + vehicleLabel : undefined,
    invoiceLabel ? "Facture : " + invoiceLabel : undefined,
    interventionLabel ? "Intervention : " + interventionLabel : undefined,
    appointmentLabel ? "RDV : " + appointmentLabel : undefined,
    amount ? "Montant : " + amount : undefined,
    date ? "Date : " + date : undefined,
    record.statutFacture ? "Facture : " + String(record.statutFacture) : undefined,
    record.statutPaiement ? "Paiement : " + String(record.statutPaiement) : undefined,
    record.statut ? "Statut : " + String(record.statut) : undefined,
    record.source ? "Source : " + String(record.source) : undefined,
  ].filter(Boolean);`,
`  const fragments = [
    relationFragment("Client", clientLabel, record.clientId),
    relationFragment("Véhicule", vehicleLabel, record.vehiculeId),
    relationFragment("Facture", invoiceLabel, record.factureId),
    relationFragment("Intervention", interventionLabel, record.interventionId),
    relationFragment("RDV", appointmentLabel, record.rendezVousId),
    amount ? "Montant : " + amount : undefined,
    date ? "Date : " + date : undefined,
    record.statutFacture ? "Statut facture : " + String(record.statutFacture) : undefined,
    record.statutPaiement ? "Paiement : " + String(record.statutPaiement) : undefined,
    record.statut ? "Statut : " + String(record.statut) : undefined,
    record.source ? "Source : " + String(record.source) : undefined,
  ].filter(Boolean);`
);

fs.writeFileSync(target, content, "utf8");

console.log("OK: unresolved dashboard relation IDs are now hidden.");