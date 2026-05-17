const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

function write(relativePath, content) {
  fs.writeFileSync(path.join(ROOT, relativePath), content, "utf8");
  console.log("UPDATED", relativePath);
}

function patchRuntimePage() {
  const relativePath =
    "src/components/erp/runtime/ERPRuntimePage.tsx";

  let content = read(relativePath);

  content = content
    .split("crÃ©ation").join("création")
    .split("gÃ©nÃ©rÃ©e").join("générée")
    .split("gÃ©nÃ©rÃ©").join("généré")
    .split("donnÃ©es").join("données")
    .split("Ã©tÃ©").join("été")
    .split("â€”").join("—");

  content = content.replace(
`  const isInvoiceDetailPage =
    type === "detail" &&
    module?.metadata?.key === "facturesauto" &&
    Boolean(record?.id);`,
`  const isInvoiceDetailPage =
    type === "detail" &&
    module?.metadata?.key === "facturesauto" &&
    Boolean(record?.id ?? record?._id);`
  );

  if (!content.includes("data-billing-payment-action")) {
    content = content.replace(
`        {type === "detail" && module && record && (
          <ERPRuntimeDetails
            module={module}
            data={record}
          />
        )}`,
`        {isInvoiceDetailPage ? (
          <section
            data-billing-payment-action
            className="
              rounded-3xl
              border
              border-emerald-200
              bg-emerald-50
              p-5
              shadow-sm
            "
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-emerald-700">
                  Encaissement
                </p>

                <h3 className="mt-1 text-lg font-black text-slate-950">
                  Enregistrer un paiement
                </h3>

                <p className="mt-1 text-sm text-slate-600">
                  Créer un encaissement lié à cette facture. Le montant payé, le reste à payer et le statut seront recalculés automatiquement.
                </p>
              </div>

              <Link
                href={invoicePaymentHref}
                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-2xl
                  bg-emerald-600
                  px-5
                  py-3
                  text-sm
                  font-black
                  text-white
                  shadow-sm
                  transition
                  hover:bg-emerald-500
                "
              >
                Enregistrer un paiement
              </Link>
            </div>
          </section>
        ) : null}

        {type === "detail" && module && record && (
          <ERPRuntimeDetails
            module={module}
            data={record}
          />
        )}`
    );
  }

  write(relativePath, content);
}

function patchFacturesActions() {
  const relativePath =
    "src/runtime/modules/generated/facturesauto/facturesauto.actions.ts";

  let content = read(relativePath);

  content = content
    .split("Marquer payÃ©e").join("Marquer payée");

  write(relativePath, content);
}

patchRuntimePage();
patchFacturesActions();

console.log("");
console.log("Invoice payment button forced visible.");
console.log("Done.");