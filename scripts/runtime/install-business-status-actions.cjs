const fs = require("fs");
const path = require("path");

const root = process.cwd();

const file = path.join(
  root,
  "src",
  "components",
  "erp",
  "forms",
  "enterprise",
  "ERPEnterpriseForm.tsx"
);

if (!fs.existsSync(file)) {
  console.error(`MISSING ${file}`);
  process.exit(1);
}

let content = fs.readFileSync(file, "utf8");
const before = content;

/**
 * 1) Ajouter les helpers actions métier avant le return.
 */
if (!content.includes("function getBusinessStatusAction()")) {
  const marker = `  return (
    <form`;

  const helpers = `  function getBusinessStatusAction() {
    if (mode !== "edit") {
      return null;
    }

    const moduleKey =
      module.metadata.key;

    const currentStatus =
      String(formValues.statut ?? "");

    if (
      moduleKey === "clientsauto" &&
      currentStatus !== "archive"
    ) {
      return {
        label: "Archiver client",
        nextStatus: "archive",
        confirmMessage:
          "Archiver ce client ? Il ne sera pas supprimé et son historique sera conservé.",
        successMessage:
          "Client archivé.",
      };
    }

    if (
      moduleKey === "vehicules" &&
      currentStatus !== "archive"
    ) {
      return {
        label: "Archiver véhicule",
        nextStatus: "archive",
        confirmMessage:
          "Archiver ce véhicule ? Il ne sera pas supprimé et son historique sera conservé.",
        successMessage:
          "Véhicule archivé.",
      };
    }

    if (
      moduleKey === "encaissementsauto" &&
      currentStatus !== "annule"
    ) {
      return {
        label: "Annuler encaissement",
        nextStatus: "annule",
        confirmMessage:
          "Annuler cet encaissement ? Le paiement restera conservé dans l’historique.",
        successMessage:
          "Encaissement annulé.",
      };
    }

    if (
      moduleKey === "echeancespaiementauto" &&
      currentStatus !== "annulee"
    ) {
      return {
        label: "Annuler échéance",
        nextStatus: "annulee",
        confirmMessage:
          "Annuler cette échéance ? Elle restera conservée dans l’historique.",
        successMessage:
          "Échéance annulée.",
      };
    }

    return null;
  }

  async function handleBusinessStatusAction() {
    const action =
      getBusinessStatusAction();

    if (!action || !initialData?.id) {
      return;
    }

    const confirmed =
      window.confirm(action.confirmMessage);

    if (!confirmed) {
      return;
    }

    setSaving(true);

    try {
      await RuntimeDataBinding.update(
        module,
        String(initialData.id),
        {
          statut: action.nextStatus,
        }
      );

      setFormValues((currentValues) => ({
        ...currentValues,
        statut: action.nextStatus,
      }));

      setErrors([]);

      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Action métier impossible.";

      setErrors([
        {
          field: "businessAction",
          message,
        },
      ]);
    } finally {
      setSaving(false);
    }
  }

  const businessStatusAction =
    getBusinessStatusAction();

`;

  if (!content.includes(marker)) {
    console.error("RETURN FORM MARKER NOT FOUND");
    process.exit(1);
  }

  content = content.replace(marker, helpers + marker);
}

/**
 * 2) Ajouter le bloc UI Actions métier après le workflow.
 */
if (!content.includes("data-business-status-actions")) {
  const insertAfter = `      {mode === "edit" && workflowActions.length > 0 && (
        <section className="rounded-3xl border border-blue-100 bg-blue-50 p-4">
          <div className="mb-3">
            <p className="text-xs font-black uppercase tracking-wide text-blue-700">
              Workflow
            </p>
            <p className="text-sm text-blue-900">
              Ces actions enregistrent d'abord le formulaire, puis exécutent le workflow.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {workflowActions.map((action) => (
              <button
                key={action.key}
                type="button"
                onClick={() => {
                  pendingWorkflowActionRef.current = action;
                  formRef.current?.requestSubmit();
                }}
                className={\`
                  rounded-2xl
                  px-4
                  py-2
                  text-sm
                  font-bold
                  transition
                  \${
                    action.type === "danger"
                      ? "bg-red-600 text-white hover:bg-red-700"
                      : action.type === "secondary"
                        ? "bg-slate-200 text-slate-900 hover:bg-slate-300"
                        : "bg-slate-950 text-white hover:bg-slate-800"
                  }
                \`}
              >
                {action.label}
              </button>
            ))}
          </div>
        </section>
      )}`;

  const actionBlock = `      {businessStatusAction ? (
        <section
          data-business-status-actions
          className="rounded-3xl border border-amber-200 bg-amber-50 p-5 shadow-sm"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-amber-700">
                Action métier
              </p>

              <h3 className="mt-1 text-xl font-black text-slate-950">
                {businessStatusAction.label}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Cette action conserve l’historique et évite une suppression brute.
              </p>
            </div>

            <button
              type="button"
              disabled={saving}
              onClick={handleBusinessStatusAction}
              className="
                inline-flex
                items-center
                justify-center
                rounded-2xl
                bg-amber-600
                px-5
                py-3
                text-sm
                font-black
                text-white
                shadow-sm
                transition
                hover:bg-amber-500
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {businessStatusAction.label}
            </button>
          </div>
        </section>
      ) : null}`;

  if (content.includes(insertAfter)) {
    content = content.replace(
      insertAfter,
      `${insertAfter}
${actionBlock}`
    );
  } else {
    /**
     * Fallback : insérer avant la première grande section formulaire.
     */
    content = content.replace(
      `      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">`,
      `${actionBlock}

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">`
    );
  }
}

/**
 * 3) Nettoyage mojibake visible dans la zone inspectée.
 */
content = content
  .replaceAll("DÃ©jÃ  payÃ©", "Déjà payé")
  .replaceAll("Reste Ã  payer", "Reste à payer")
  .replaceAll("exÃ©cutent", "exécutent")
  .replaceAll("mÃ©tier", "métier")
  .replaceAll("CrÃ©ation", "Création")
  .replaceAll("connectÃ©", "connecté")
  .replaceAll("Ã©lÃ©ment", "élément")
  .replaceAll("Validation mÃ©tier", "Validation métier")
  .replaceAll("â€¢", "•");

if (content === before) {
  console.log("NO CHANGE");
  process.exit(0);
}

fs.writeFileSync(file, content, { encoding: "utf8" });

console.log("UPDATED ERPEnterpriseForm business status actions");
console.log("DONE install business status actions");