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
  console.error("MISSING " + file);
  process.exit(1);
}

let content = fs.readFileSync(file, "utf8");

function insertBefore(source, needle, insertion) {
  const index = source.indexOf(needle);

  if (index === -1) {
    console.error("NEEDLE NOT FOUND:");
    console.error(needle);
    process.exit(1);
  }

  return source.slice(0, index) + insertion + source.slice(index);
}

if (!content.includes("function getBusinessStatusAction()")) {
  const returnNeedle = "  return (";

  const helper = `
  function getBusinessStatusAction() {
    if (mode !== "edit") {
      return null;
    }

    const moduleKey = module.metadata.key;
    const currentStatus = String(formValues.statut ?? "");

    if (moduleKey === "clientsauto" && currentStatus !== "archive") {
      return {
        label: "Archiver client",
        nextStatus: "archive",
        confirmMessage: "Archiver ce client ? Il ne sera pas supprimé et son historique sera conservé.",
      };
    }

    if (moduleKey === "vehicules" && currentStatus !== "archive") {
      return {
        label: "Archiver véhicule",
        nextStatus: "archive",
        confirmMessage: "Archiver ce véhicule ? Il ne sera pas supprimé et son historique sera conservé.",
      };
    }

    if (moduleKey === "encaissementsauto" && currentStatus !== "annule") {
      return {
        label: "Annuler encaissement",
        nextStatus: "annule",
        confirmMessage: "Annuler cet encaissement ? Le paiement restera conservé dans l’historique.",
      };
    }

    if (moduleKey === "echeancespaiementauto" && currentStatus !== "annulee") {
      return {
        label: "Annuler échéance",
        nextStatus: "annulee",
        confirmMessage: "Annuler cette échéance ? Elle restera conservée dans l’historique.",
      };
    }

    return null;
  }

  async function handleBusinessStatusAction() {
    const action = getBusinessStatusAction();

    if (!action || !initialData?.id) {
      return;
    }

    const confirmed = window.confirm(action.confirmMessage);

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

  const businessStatusAction = getBusinessStatusAction();

`;

  content = insertBefore(content, returnNeedle, helper);
}

if (!content.includes("data-business-status-actions")) {
  const saveButtonIndex = content.indexOf(`<ERPButton
              type="submit"`);

  if (saveButtonIndex === -1) {
    console.error("SAVE BUTTON NOT FOUND");
    process.exit(1);
  }

  const block = `            {businessStatusAction ? (
              <div
                data-business-status-actions
                className="w-full rounded-3xl border border-amber-200 bg-amber-50 p-5"
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
                    className="inline-flex items-center justify-center rounded-2xl bg-amber-600 px-5 py-3 text-sm font-black text-white shadow-sm transition hover:bg-amber-500 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {businessStatusAction.label}
                  </button>
                </div>
              </div>
            ) : null}

`;

  content = content.slice(0, saveButtonIndex) + block + content.slice(saveButtonIndex);
}

fs.writeFileSync(file, content, { encoding: "utf8" });

console.log("UPDATED ERPEnterpriseForm hard insert business status actions");