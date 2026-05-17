const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const target = path.join(
  ROOT,
  "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx"
);

if (!fs.existsSync(target)) {
  throw new Error("ERPEnterpriseForm.tsx introuvable");
}

let content = fs.readFileSync(target, "utf8");

if (!content.includes("function buildInvoicePaymentHref")) {
  content = content.replace(
`interface ERPEnterpriseFormProps {
  module: ERPModule;
  mode?: "create" | "edit";
  initialData?: Record<string, unknown>;
  workflowActions?: ERPModuleAction[];
}`,
`interface ERPEnterpriseFormProps {
  module: ERPModule;
  mode?: "create" | "edit";
  initialData?: Record<string, unknown>;
  workflowActions?: ERPModuleAction[];
}

function buildInvoicePaymentHref(
  invoice: Record<string, unknown>
): string {
  const factureId =
    String(
      invoice.id ??
      invoice._id ??
      ""
    );

  const montantTTC =
    Number(invoice.montantTTC ?? 0);

  const montantPaye =
    Number(invoice.montantPaye ?? 0);

  const resteAPayer =
    Number(invoice.resteAPayer ?? 0);

  const montant =
    resteAPayer > 0
      ? resteAPayer
      : Math.max(
          montantTTC - montantPaye,
          0
        );

  const params =
    new URLSearchParams();

  params.set(
    "factureId",
    factureId
  );

  if (invoice.clientId) {
    params.set(
      "clientId",
      String(invoice.clientId)
    );
  }

  if (invoice.vehiculeId) {
    params.set(
      "vehiculeId",
      String(invoice.vehiculeId)
    );
  }

  if (montant > 0) {
    params.set(
      "montant",
      String(montant)
    );
  }

  params.set(
    "datePaiement",
    new Date()
      .toISOString()
      .split("T")[0]
  );

  params.set(
    "statut",
    "valide"
  );

  params.set(
    "returnTo",
    "/facturesauto/" + factureId + "/edit"
  );

  params.set(
    "lockFields",
    "factureId,clientId,vehiculeId"
  );

  return "/encaissementsauto/nouveau?" + params.toString();
}

function getInvoiceAmountSummary(
  invoice: Record<string, unknown>
) {
  const montantTTC =
    Number(invoice.montantTTC ?? 0);

  const montantPaye =
    Number(invoice.montantPaye ?? 0);

  const resteAPayer =
    Number(invoice.resteAPayer ?? 0);

  const computedReste =
    resteAPayer > 0
      ? resteAPayer
      : Math.max(
          montantTTC - montantPaye,
          0
        );

  return {
    montantTTC,
    montantPaye,
    resteAPayer: computedReste,
  };
}`
  );
}

if (!content.includes("const isInvoiceEditForm")) {
  content = content.replace(
`  const returnTo =
    searchParams.get("returnTo");`,
`  const returnTo =
    searchParams.get("returnTo");

  const isInvoiceEditForm =
    mode === "edit" &&
    module.metadata.key === "facturesauto" &&
    Boolean(initialData.id ?? initialData._id);

  const invoicePaymentHref =
    isInvoiceEditForm
      ? buildInvoicePaymentHref(initialData)
      : "#";

  const invoiceAmountSummary =
    getInvoiceAmountSummary(initialData);`
  );
}

if (!content.includes("data-invoice-edit-payment-action")) {
  content = content.replace(
`      {mode === "edit" && workflowActions.length > 0 && (
        <section className="rounded-3xl border border-blue-100 bg-blue-50 p-4">`,
`      {isInvoiceEditForm ? (
        <section
          data-invoice-edit-payment-action
          className="
            rounded-3xl
            border
            border-emerald-300/30
            bg-emerald-500/10
            p-6
            shadow-sm
          "
        >
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-emerald-300">
                Encaissement facture
              </p>

              <h2 className="mt-2 text-2xl font-black text-slate-950">
                Enregistrer un paiement
              </h2>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                Crée un encaissement lié à cette facture. Le montant payé, le reste à payer et le statut de paiement seront recalculés automatiquement.
              </p>

              <div className="mt-5 grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl border border-emerald-200 bg-white p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    Total TTC
                  </p>
                  <p className="mt-1 text-xl font-black text-slate-950">
                    {invoiceAmountSummary.montantTTC.toLocaleString("fr-FR")} FCFA
                  </p>
                </div>

                <div className="rounded-2xl border border-emerald-200 bg-white p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    Déjà payé
                  </p>
                  <p className="mt-1 text-xl font-black text-slate-950">
                    {invoiceAmountSummary.montantPaye.toLocaleString("fr-FR")} FCFA
                  </p>
                </div>

                <div className="rounded-2xl border border-emerald-200 bg-white p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    Reste à payer
                  </p>
                  <p className="mt-1 text-xl font-black text-emerald-700">
                    {invoiceAmountSummary.resteAPayer.toLocaleString("fr-FR")} FCFA
                  </p>
                </div>
              </div>
            </div>

            <a
              href={invoicePaymentHref}
              className="
                inline-flex
                items-center
                justify-center
                rounded-2xl
                bg-emerald-600
                px-6
                py-4
                text-sm
                font-black
                text-white
                shadow-sm
                transition
                hover:bg-emerald-500
              "
            >
              Enregistrer un paiement
            </a>
          </div>
        </section>
      ) : null}

      {mode === "edit" && workflowActions.length > 0 && (
        <section className="rounded-3xl border border-blue-100 bg-blue-50 p-4">`
  );
}

fs.writeFileSync(target, content, "utf8");

console.log("OK bouton paiement installé dans ERPEnterpriseForm edit facture.");