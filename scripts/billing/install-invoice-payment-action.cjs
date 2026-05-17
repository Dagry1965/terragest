const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

function file(relativePath) {
  return path.join(ROOT, relativePath);
}

function read(relativePath) {
  return fs.readFileSync(file(relativePath), "utf8");
}

function write(relativePath, content) {
  fs.writeFileSync(file(relativePath), content, "utf8");
  console.log("UPDATED", relativePath);
}

function patchFacturesActions() {
  const relativePath =
    "src/runtime/modules/generated/facturesauto/facturesauto.actions.ts";

  let content = read(relativePath);

  content = content
    .split("Marquer payÃ©e").join("Marquer payée");

  if (!content.includes('key: "Enregistrer paiement"')) {
    content = content.replace(
`  {
    key: "Relancer",
    label: "Relancer le client",
    type: "secondary",
    permission: "facturesauto.workflow",
  },`,
`  {
    key: "Enregistrer paiement",
    label: "Enregistrer un paiement",
    type: "primary",
    permission: "facturesauto.workflow",
  },
  {
    key: "Relancer",
    label: "Relancer le client",
    type: "secondary",
    permission: "facturesauto.workflow",
  },`
    );
  }

  write(relativePath, content);
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

  if (!content.includes("function buildInvoicePaymentHref")) {
    content = content.replace(
`function getRuntimePageTypeLabel(type: string): string {`,
`function buildInvoicePaymentHref(
  record: Record<string, unknown>
): string {
  const factureId =
    String(record.id ?? record._id ?? "");

  const montantTTC =
    Number(record.montantTTC ?? 0);

  const montantPaye =
    Number(record.montantPaye ?? 0);

  const resteAPayer =
    Number(record.resteAPayer ?? 0);

  const montant =
    resteAPayer > 0
      ? resteAPayer
      : Math.max(montantTTC - montantPaye, 0);

  const params =
    new URLSearchParams();

  params.set(
    "factureId",
    factureId
  );

  if (record.clientId) {
    params.set(
      "clientId",
      String(record.clientId)
    );
  }

  if (record.vehiculeId) {
    params.set(
      "vehiculeId",
      String(record.vehiculeId)
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
    new Date().toISOString().split("T")[0]
  );

  params.set(
    "statut",
    "valide"
  );

  params.set(
    "returnTo",
    "/facturesauto/" + factureId
  );

  params.set(
    "lockFields",
    "factureId,clientId,vehiculeId"
  );

  return "/encaissementsauto/nouveau?" + params.toString();
}

function getRuntimePageTypeLabel(type: string): string {`
    );
  }

  if (!content.includes("const isInvoiceDetailPage")) {
    content = content.replace(
`  const runtimeActions =
    type !== "list" && record
      ? RuntimeActionEngine.getAvailableActions({
          actions: module?.actions ?? [],
          userPermissions: ["*"],
          workflow: module?.workflows?.[0],
          record,
        })
      : [];`,
`  const runtimeActions =
    type !== "list" && record
      ? RuntimeActionEngine.getAvailableActions({
          actions: module?.actions ?? [],
          userPermissions: ["*"],
          workflow: module?.workflows?.[0],
          record,
        })
      : [];

  const isInvoiceDetailPage =
    type === "detail" &&
    module?.metadata?.key === "facturesauto" &&
    Boolean(record?.id);

  const invoicePaymentHref =
    isInvoiceDetailPage && record
      ? buildInvoicePaymentHref(record)
      : "#";`
    );
  }

  if (!content.includes("Enregistrer un paiement")) {
    content = content.replace(
`        {type === "detail" && runtimeActions.length > 0 && (
          <div className="flex flex-wrap gap-3">`,
`        {type === "detail" && (
          <div className="flex flex-wrap gap-3">
            {isInvoiceDetailPage ? (
              <Link
                href={invoicePaymentHref}
                className="
                  rounded-2xl
                  bg-emerald-600
                  px-4
                  py-2
                  text-sm
                  font-bold
                  text-white
                  transition
                  hover:bg-emerald-500
                "
              >
                Enregistrer un paiement
              </Link>
            ) : null}`
    );

    content = content.replace(
`          </div>
        )}

        {loading && type === "list" ? (`,
`          </div>
        )}

        {loading && type === "list" ? (`
    );
  }

  write(relativePath, content);
}

patchFacturesActions();
patchRuntimePage();

console.log("");
console.log("Invoice payment action installed.");
console.log("Done.");