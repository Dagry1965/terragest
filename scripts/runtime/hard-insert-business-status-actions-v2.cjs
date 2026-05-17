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
let changed = false;

const formIndex = content.indexOf("<form");

if (formIndex === -1) {
  console.error("FORM TAG NOT FOUND");
  process.exit(1);
}

const renderReturnIndex = content.lastIndexOf("  return (", formIndex);

if (renderReturnIndex === -1) {
  console.error("RENDER RETURN NOT FOUND BEFORE FORM");
  process.exit(1);
}

if (!content.includes("function getBusinessStatusAction()")) {
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
        confirmMessage:
          "Archiver ce client ? Il ne sera pas supprimé et son historique sera conservé.",
      };
    }

    if (moduleKey === "vehicules" && currentStatus !== "archive") {
      return {
        label: "Archiver véhicule",
        nextStatus: "archive",
        confirmMessage:
          "Archiver ce véhicule ? Il ne sera pas supprimé et son historique sera conservé.",
      };
    }

    if (moduleKey === "encaissementsauto" && currentStatus !== "annule") {
      return {
        label: "Annuler encaissement",
        nextStatus: "annule",
        confirmMessage:
          "Annuler cet encaissement ? Le paiement restera conservé dans l’historique.",
      };
    }

    if (moduleKey === "echeancespaiementauto" && currentStatus !== "annulee") {
      return {
        label: "Annuler échéance",
        nextStatus: "annulee",
        confirmMessage:
          "Annuler cette échéance ? Elle restera conservée dans l’historique.",
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

  content =
    content.slice(0, renderReturnIndex) +
    helper +
    content.slice(renderReturnIndex);

  changed = true;
  console.log("INSERTED helper");
} else {
  console.log("SKIP helper already present");
}

if (!content.includes("data-business-status-actions")) {
  const saveButtonRegex =
    /(\s*)<ERPButton\s+type="submit"\s+disabled=\{saving\}/m;

  const match = content.match(saveButtonRegex);

  if (!match || match.index === undefined) {
    console.error("SAVE BUTTON MARKER NOT FOUND");
    process.exit(1);
  }

  const indent = match[1] ?? "            ";

  const block = `${indent}{businessStatusAction ? (
${indent}  <div
${indent}    data-business-status-actions
${indent}    className="w-full rounded-3xl border border-amber-200 bg-amber-50 p-5"
${indent}  >
${indent}    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
${indent}      <div>
${indent}        <p className="text-xs font-black uppercase tracking-wide text-amber-700">
${indent}          Action métier
${indent}        </p>
${indent}
${indent}        <h3 className="mt-1 text-xl font-black text-slate-950">
${indent}          {businessStatusAction.label}
${indent}        </h3>
${indent}
${indent}        <p className="mt-2 text-sm leading-6 text-slate-600">
${indent}          Cette action conserve l’historique et évite une suppression brute.
${indent}        </p>
${indent}      </div>
${indent}
${indent}      <button
${indent}        type="button"
${indent}        disabled={saving}
${indent}        onClick={handleBusinessStatusAction}
${indent}        className="inline-flex items-center justify-center rounded-2xl bg-amber-600 px-5 py-3 text-sm font-black text-white shadow-sm transition hover:bg-amber-500 disabled:cursor-not-allowed disabled:opacity-60"
${indent}      >
${indent}        {businessStatusAction.label}
${indent}      </button>
${indent}    </div>
${indent}  </div>
${indent}) : null}

`;

  content =
    content.slice(0, match.index) +
    block +
    content.slice(match.index);

  changed = true;
  console.log("INSERTED action block");
} else {
  console.log("SKIP action block already present");
}

if (!changed) {
  console.log("NO CHANGE");
} else {
  fs.writeFileSync(file, content, { encoding: "utf8" });
  console.log("UPDATED src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx");
}