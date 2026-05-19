const fs = require("fs");
const path = require("path");

const root = process.cwd();
const target = path.join(
  root,
  "src/components/erp/runtime/ERPRuntimeDetails.tsx"
);

if (!fs.existsSync(target)) {
  console.error("Missing:", target);
  process.exit(1);
}

let content = fs.readFileSync(target, "utf8");

/**
 * PASS 2N-Q11B
 * Ajouter une action contextuelle sur le détail intervention :
 * - Ajouter une ligne
 * - préremplit interventionId
 * - verrouille interventionId
 * - retour vers l'intervention
 *
 * Scope strict :
 * - ERPRuntimeDetails uniquement
 * - pas de cockpit
 * - pas de sidebar
 */

if (!content.includes("function buildInterventionLineHref(")) {
  content = content.replace(
    `function buildInvoicePaymentHref(
  data: Record<string, unknown>
): string {`,
    `function buildInterventionLineHref(
  data: Record<string, unknown>
): string {
  const interventionId =
    String(
      data.id ??
      data._id ??
      ""
    );

  const params =
    new URLSearchParams();

  if (interventionId) {
    params.set(
      "interventionId",
      interventionId
    );

    params.set(
      "returnTo",
      "/interventionsauto/" + interventionId
    );

    params.set(
      "lockFields",
      "interventionId"
    );
  }

  return "/lignesinterventionauto/nouveau?" + params.toString();
}

function buildInvoicePaymentHref(
  data: Record<string, unknown>
): string {`
  );
}

if (!content.includes("const isIntervention =")) {
  content = content.replace(
    `  const isInvoice =
    module.metadata.key === "facturesauto" &&
    Boolean(
      data.id ??
      data._id
    );`,
    `  const isInvoice =
    module.metadata.key === "facturesauto" &&
    Boolean(
      data.id ??
      data._id
    );

  const isIntervention =
    module.metadata.key === "interventionsauto" &&
    Boolean(
      data.id ??
      data._id
    );`
  );
}

if (!content.includes("const interventionLineHref =")) {
  content = content.replace(
    `  const paymentHref =
    isInvoice
      ? buildInvoicePaymentHref(data)
      : "#";`,
    `  const paymentHref =
    isInvoice
      ? buildInvoicePaymentHref(data)
      : "#";

  const interventionLineHref =
    isIntervention
      ? buildInterventionLineHref(data)
      : "#";`
  );
}

if (!content.includes("data-intervention-line-action")) {
  content = content.replace(
    `    <div className="space-y-6">
      {isInvoice ? (`,
    `    <div className="space-y-6">
      {isIntervention ? (
        <ERPCard
          title="Lignes de l’intervention"
          description="Ajoutez les pièces, services ou main d’œuvre consommés sur cette intervention."
        >
          <div
            data-intervention-line-action
            className="flex flex-col gap-4 rounded-2xl border border-[var(--erp-border)] bg-[var(--erp-surface-soft)] p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-sm font-black text-[var(--erp-text)]">
                Détail des prestations et consommations
              </p>
              <p className="mt-1 text-sm text-[var(--erp-text-muted)]">
                Prépare la facture détaillée et la future sortie de stock.
              </p>
            </div>

            <a
              href={interventionLineHref}
              className="inline-flex items-center justify-center rounded-2xl bg-[var(--erp-primary)] px-5 py-3 text-sm font-black text-white transition hover:opacity-90"
            >
              Ajouter une ligne
            </a>
          </div>
        </ERPCard>
      ) : null}

      {isInvoice ? (`
  );
}

fs.writeFileSync(target, content, "utf8");

console.log("PASS 2N-Q11B OK: intervention line action added.");