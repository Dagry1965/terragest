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
  "ERPFormField.tsx"
);

if (!fs.existsSync(file)) {
  console.error(`MISSING ${file}`);
  process.exit(1);
}

const content = fs.readFileSync(file, "utf8");

const beforeRelationBlock = `  if (field.type === "relation") {`;

const start = content.indexOf(beforeRelationBlock);

if (start === -1) {
  console.error("RELATION BLOCK NOT FOUND");
  process.exit(1);
}

const endMarker = `  if (field.type === "select" || field.type === "status") {`;
const end = content.indexOf(endMarker, start);

if (end === -1) {
  console.error("SELECT BLOCK MARKER NOT FOUND");
  process.exit(1);
}

const newRelationBlock = `  if (field.type === "relation") {
    const relationConfig =
      typeof field.relation === "string"
        ? null
        : field.relation;

    const canCreateRelation =
      Boolean(relationConfig?.create?.enabled) &&
      !isLocked;

    const selectedOption =
      relationOptions.find((option) =>
        String(option.id) === String(currentValue)
      );

    const selectedLabel =
      selectedOption?.label ||
      (currentValue
        ? "Relation verrouillée"
        : "Aucune relation renseignée");

    const filteredOptions =
      relationOptions.filter((option) =>
        option.label
          .toLowerCase()
          .includes(relationSearch.toLowerCase())
      );

    if (isLocked) {
      return (
        <FieldWrapper field={field} error={error}>
          <div className="block space-y-2">
            {label}

            <input
              type="hidden"
              name={field.key}
              value={currentValue}
            />

            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3">
              <p className="text-xs font-black uppercase tracking-wide text-emerald-700">
                Relation verrouillée
              </p>

              <p className="mt-1 text-sm font-black text-slate-950">
                {selectedLabel}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Cette relation vient du contexte d’origine et ne peut pas être modifiée ici.
              </p>
            </div>
          </div>
        </FieldWrapper>
      );
    }

    return (
      <FieldWrapper field={field} error={error}>
        <label className="block space-y-2">
          {label}

          <input
            type="text"
            placeholder="Rechercher..."
            value={relationSearch}
            onChange={(event) => setRelationSearch(event.target.value)}
            className={className}
          />

          <select
            name={field.key}
            required={field.required}
            value={currentValue}
            onChange={(event) => onChange?.(field.key, event.target.value)}
            className={className}
          >
            <option value="">
              {field.placeholder ?? "Sélectionner"}
            </option>

            {filteredOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>

          {canCreateRelation ? (
            <button
              type="button"
              onClick={() => {
                const targetModule =
                  relationConfig?.module;

                if (!targetModule) {
                  return;
                }

                router.push(
                  buildRelationCreateUrl({
                    targetModule,
                    fieldKey: field.key,
                    prefill:
                      relationConfig?.create?.prefill ?? {},
                  })
                );
              }}
              className="
                mt-2
                inline-flex
                items-center
                rounded-xl
                border
                border-blue-200
                bg-blue-50
                px-4
                py-2
                text-sm
                font-bold
                text-blue-700
                transition
                hover:bg-blue-100
              "
            >
              + Créer {field.label}
            </button>
          ) : null}
        </label>
      </FieldWrapper>
    );
  }

`;

const updated =
  content.slice(0, start) +
  newRelationBlock +
  content.slice(end);

fs.writeFileSync(file, updated, { encoding: "utf8" });

console.log("UPDATED src/components/erp/forms/enterprise/ERPFormField.tsx");
console.log("DONE install locked relation field renderer");