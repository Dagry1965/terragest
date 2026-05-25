const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const TAG = "q22d5-polish-scheduling-slots-ux";

const targetFile =
  "src/components/erp/forms/enterprise/ERPFormField.tsx";

const target = path.join(ROOT, targetFile);

if (!fs.existsSync(target)) {
  throw new Error(`[MISSING] ${targetFile}`);
}

const backup = `${target}.bak-${TAG}`;

if (!fs.existsSync(backup)) {
  fs.copyFileSync(target, backup);
  console.log(`[BACKUP] ${targetFile}.bak-${TAG}`);
}

let content = fs.readFileSync(target, "utf8");

if (content.includes("Q22D5_SCHEDULING_SLOTS_UX_POLISH")) {
  console.log("[SKIP] Q22D-5 already installed.");
  process.exit(0);
}

const oldBlock = `  if (isSchedulingTimeField) {
    const hasDate =
      Boolean(String(schedulingDateValue ?? "").trim());

    return (
      <FieldWrapper field={field} error={error}>
        <label className="block space-y-2">
          {label}

          <select
            name={field.key}
            required={field.required}
            value={currentValue}
            disabled={isProtected || !hasDate || schedulingSlotsLoading}
            onChange={(event) => onChange?.(field.key, event.target.value)}
            className={\`\${className} \${
              isProtected || !hasDate
                ? "cursor-not-allowed bg-slate-100 text-[var(--erp-text-muted)]"
                : ""
            }\`}
          >
            <option value="">
              {!hasDate
                ? "Choisir d'abord une date"
                : schedulingSlotsLoading
                  ? "Chargement des créneaux..."
                  : field.placeholder ?? "Sélectionner un créneau"}
            </option>

            {schedulingSlots.map((slot) => (
              <option
                key={slot.start + "-" + slot.end}
                value={slot.start}
                disabled={!slot.available}
              >
                {slot.available
                  ? slot.label
                  : slot.label + " — indisponible"}
              </option>
            ))}
          </select>

          {hasDate && schedulingSlots.length === 0 ? (
            <p className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-800">
              Aucun créneau disponible pour cette date.
            </p>
          ) : null}

          {hasDate && schedulingSlots.length > 0 ? (
            <p className="text-xs text-[var(--erp-text-muted)]">
              Créneaux calculés par le moteur ERP Scheduling Runtime.
            </p>
          ) : null}
        </label>
      </FieldWrapper>
    );
  }`;

const newBlock = `  if (isSchedulingTimeField) {
    // Q22D5_SCHEDULING_SLOTS_UX_POLISH
    // Generic ERP scheduling UX: explain date/resource prerequisites and slot availability.
    const hasDate =
      Boolean(String(schedulingDateValue ?? "").trim());

    const schedulingResourceField =
      schedulingConfig?.resourceField;

    const schedulingResourceValue =
      schedulingResourceField
        ? String(formValues[schedulingResourceField] ?? "").trim()
        : "";

    const requiresResource =
      Boolean(schedulingResourceField);

    const hasRequiredResource =
      !requiresResource || Boolean(schedulingResourceValue);

    const disabledReason =
      !hasDate
        ? "Choisir d'abord une date"
        : !hasRequiredResource
          ? "Choisir d'abord la ressource"
          : schedulingSlotsLoading
            ? "Chargement des créneaux..."
            : field.placeholder ?? "Sélectionner un créneau";

    const availableSlotsCount =
      schedulingSlots.filter((slot) => slot.available).length;

    const unavailableSlotsCount =
      schedulingSlots.length - availableSlotsCount;

    return (
      <FieldWrapper field={field} error={error}>
        <label className="block space-y-2">
          {label}

          <select
            name={field.key}
            required={field.required}
            value={currentValue}
            disabled={
              isProtected ||
              !hasDate ||
              !hasRequiredResource ||
              schedulingSlotsLoading
            }
            onChange={(event) => onChange?.(field.key, event.target.value)}
            className={\`\${className} \${
              isProtected || !hasDate || !hasRequiredResource
                ? "cursor-not-allowed bg-slate-100 text-[var(--erp-text-muted)]"
                : ""
            }\`}
          >
            <option value="">
              {disabledReason}
            </option>

            {schedulingSlots.map((slot) => (
              <option
                key={slot.start + "-" + slot.end}
                value={slot.start}
                disabled={!slot.available}
              >
                {slot.available
                  ? slot.label + " · Disponible"
                  : slot.label + " · Déjà réservé"}
              </option>
            ))}
          </select>

          {!hasDate ? (
            <p className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600">
              Sélectionnez une date pour afficher les créneaux disponibles.
            </p>
          ) : null}

          {hasDate && !hasRequiredResource ? (
            <p className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600">
              Sélectionnez la ressource concernée pour calculer les disponibilités.
            </p>
          ) : null}

          {hasDate && hasRequiredResource && schedulingSlots.length === 0 ? (
            <p className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-800">
              Aucun créneau disponible pour cette date selon les horaires configurés.
            </p>
          ) : null}

          {hasDate && hasRequiredResource && schedulingSlots.length > 0 ? (
            <div className="rounded-xl border border-emerald-100 bg-emerald-50/70 px-3 py-2 text-xs font-semibold text-emerald-900">
              {availableSlotsCount} créneau(x) disponible(s)
              {unavailableSlotsCount > 0
                ? " · " + unavailableSlotsCount + " déjà réservé(s)"
                : ""}
              . Calcul ERP Scheduling Runtime.
            </div>
          ) : null}
        </label>
      </FieldWrapper>
    );
  }`;

if (!content.includes(oldBlock)) {
  throw new Error("[MISSING] scheduling field render block");
}

content = content.replace(oldBlock, newBlock);

fs.writeFileSync(target, content, "utf8");

console.log(`[WRITTEN] ${targetFile}`);
console.log("[Q22D5_DONE] Scheduling slots UX polished.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  test /rendezvous/nouveau");