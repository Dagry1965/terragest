const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

function assertProjectRoot() {
  if (
    !fs.existsSync(path.join(ROOT, "package.json")) ||
    !fs.existsSync(path.join(ROOT, "src"))
  ) {
    throw new Error("Ce script doit être lancé depuis la racine du projet Terragest.");
  }
}

function readFile(filePath) {
  return fs.readFileSync(filePath, "utf8").replace(/\r\n/g, "\n");
}

function writeFile(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, { encoding: "utf8" });
  console.log("[WRITTEN] " + path.relative(ROOT, filePath));
}

function replaceOnce(content, search, replacement, label) {
  if (!content.includes(search)) {
    throw new Error("Bloc introuvable : " + label);
  }

  return content.replace(search, replacement);
}

function replaceAll(content, search, replacement) {
  return content.split(search).join(replacement);
}

assertProjectRoot();

const enterpriseFormPath = path.join(
  ROOT,
  "src",
  "components",
  "erp",
  "forms",
  "enterprise",
  "ERPEnterpriseForm.tsx"
);

const formFieldPath = path.join(
  ROOT,
  "src",
  "components",
  "erp",
  "forms",
  "enterprise",
  "ERPFormField.tsx"
);

const linesModulePath = path.join(
  ROOT,
  "src",
  "runtime",
  "modules",
  "generated",
  "lignesinterventionauto",
  "lignesinterventionauto.module.ts"
);

const interventionsModulePath = path.join(
  ROOT,
  "src",
  "runtime",
  "modules",
  "generated",
  "interventionsauto",
  "interventionsauto.module.ts"
);

// =====================================================
// 1. ERPEnterpriseForm : lockedFields = URL + composition
//    readOnlyFields = composition
// =====================================================

let enterpriseForm = readFile(enterpriseFormPath);

const oldLockedFieldsBlock = `  const lockedFields =
    searchParams
      .get("lockFields")
      ?.split(",")
      .map((item) => item.trim())
      .filter(Boolean) ?? [];`;

const newLockedFieldsBlock = `  const queryLockedFields =
    searchParams
      .get("lockFields")
      ?.split(",")
      .map((item) => item.trim())
      .filter(Boolean) ?? [];

  const compositionLocking =
    module.composition as
      | {
          lockedFields?: string[];
          readOnlyFields?: string[];
          allowOverride?: string[];
        }
      | undefined;

  const lockedFields =
    Array.from(
      new Set([
        ...(compositionLocking?.lockedFields ?? []),
        ...queryLockedFields,
      ])
    );

  const readOnlyFields =
    Array.from(
      new Set(
        compositionLocking?.readOnlyFields ?? []
      )
    );`;

enterpriseForm = replaceOnce(
  enterpriseForm,
  oldLockedFieldsBlock,
  newLockedFieldsBlock,
  "ERPEnterpriseForm lockedFields runtime composition"
);

enterpriseForm = replaceAll(
  enterpriseForm,
  `lockedFields={lockedFields}
            />`,
  `lockedFields={lockedFields}
              readOnlyFields={readOnlyFields}
            />`
);

enterpriseForm = replaceAll(
  enterpriseForm,
  `lockedFields={lockedFields}
                  />`,
  `lockedFields={lockedFields}
                      readOnlyFields={readOnlyFields}
                  />`
);

enterpriseForm = replaceAll(
  enterpriseForm,
  `lockedFields={lockedFields}
                    />`,
  `lockedFields={lockedFields}
                      readOnlyFields={readOnlyFields}
                    />`
);

writeFile(enterpriseFormPath, enterpriseForm);

// =====================================================
// 2. ERPFormField : support readOnlyFields + protection UI
// =====================================================

let formField = readFile(formFieldPath);

formField = replaceOnce(
  formField,
  `  lockedFields?: string[];
}`,
  `  lockedFields?: string[];
  readOnlyFields?: string[];
}`,
  "ERPFormField props readOnlyFields"
);

formField = replaceOnce(
  formField,
  `  lockedFields = [],
}: ERPFormFieldProps) {`,
  `  lockedFields = [],
  readOnlyFields = [],
}: ERPFormFieldProps) {`,
  "ERPFormField destructuring readOnlyFields"
);

formField = replaceOnce(
  formField,
  `  const isLocked =
    lockedFields.includes(field.key);`,
  `  const isLocked =
    lockedFields.includes(field.key);

  const isReadOnly =
    readOnlyFields.includes(field.key);

  const isProtected =
    isLocked || isReadOnly;`,
  "ERPFormField protection flags"
);

formField = replaceAll(
  formField,
  `!isLocked;`,
  `!isProtected;`
);

formField = replaceAll(
  formField,
  `if (field.type !== "relation" || !isLocked || !currentValue) {`,
  `if (field.type !== "relation" || !isProtected || !currentValue) {`
);

formField = replaceAll(
  formField,
  `  }, [field, isLocked, currentValue]);`,
  `  }, [field, isProtected, currentValue]);`
);

formField = replaceAll(
  formField,
  `    if (isLocked) {`,
  `    if (isProtected) {`
);

formField = replaceAll(
  formField,
  `                Relation métier verrouillée`,
  `                {isLocked ? "Relation métier verrouillée" : "Relation métier en lecture seule"}`
);

formField = replaceAll(
  formField,
  `                Cette relation vient du contexte d'origine et ne peut pas être modifiée ici.`,
  `                Cette relation vient du contexte d'origine et ne peut pas être modifiée ici.`
);

formField = replaceAll(
  formField,
  `disabled={isLocked}`,
  `disabled={isProtected}`
);

formField = replaceAll(
  formField,
  `isLocked
                ? "cursor-not-allowed bg-slate-100 text-[var(--erp-text-muted)]"
                : ""`,
  `isProtected
                ? "cursor-not-allowed bg-slate-100 text-[var(--erp-text-muted)]"
                : ""`
);

formField = replaceOnce(
  formField,
  `          <textarea
            name={field.key}
            required={field.required}
            value={currentValue}
            onChange={(event) => onChange?.(field.key, event.target.value)}
            placeholder={field.placeholder ?? field.label}`,
  `          <textarea
            name={field.key}
            required={field.required}
            value={currentValue}
            readOnly={isReadOnly}
            disabled={isLocked}
            onChange={(event) => onChange?.(field.key, event.target.value)}
            placeholder={field.placeholder ?? field.label}`,
  "textarea readonly locked"
);

formField = replaceOnce(
  formField,
  `          name={field.key}
          required={field.required}
          value={currentValue}
          disabled={isProtected}
          onChange={(event) => onChange?.(field.key, event.target.value)}
          type={primitiveInputType}`,
  `          name={field.key}
          required={field.required}
          value={currentValue}
          disabled={isLocked}
          readOnly={isReadOnly}
          onChange={(event) => onChange?.(field.key, event.target.value)}
          type={primitiveInputType}`,
  "primitive input readonly locked"
);

formField = replaceAll(
  formField,
  `className={isLocked ? lockedClassName : className}`,
  `className={isProtected ? lockedClassName : className}`
);

writeFile(formFieldPath, formField);

// =====================================================
// 3. interventionsauto : readOnlyFields déclaratif minimal
// =====================================================

let interventionsModule = readFile(interventionsModulePath);

if (!interventionsModule.includes("readOnlyFields")) {
  interventionsModule = replaceOnce(
    interventionsModule,
    `    lockedFields: [
      "clientId",
      "vehiculeId",
      "rendezVousId",
      "coutPieces",
      "coutMainOeuvre",
      "coutTotal",
    ],`,
    `    lockedFields: [
      "clientId",
      "vehiculeId",
      "rendezVousId",
      "coutPieces",
      "coutMainOeuvre",
      "coutTotal",
    ],

    readOnlyFields: [
      "dateIntervention",
    ],`,
    "interventionsauto readOnlyFields"
  );
}

writeFile(interventionsModulePath, interventionsModule);

// =====================================================
// 4. lignesinterventionauto : composition parent/fils
// =====================================================

let linesModule = readFile(linesModulePath);

if (!linesModule.includes("composition:")) {
  const compositionBlock = `

  composition: {
    labelFields: [
      "designation",
      "typeLigne",
      "statut",
    ],

    breadcrumbs: [
      {
        field: "interventionId",
        moduleKey: "interventionsauto",
        labelFields: [
          "dateIntervention",
          "typeIntervention",
          "statut",
        ],
      },
    ],

    relations: [
      {
        field: "interventionId",
        moduleKey: "interventionsauto",
        labelFields: [
          "dateIntervention",
          "typeIntervention",
          "statut",
        ],
        snapshotFields: [
          "clientId",
          "vehiculeId",
          "rendezVousId",
          "dateIntervention",
          "typeIntervention",
        ],
        displayAs: "card",
        lockDerivedFields: true,
      },
      {
        field: "produitId",
        moduleKey: "produitsauto",
        labelFields: [
          "nom",
          "reference",
          "code",
        ],
        displayAs: "inline",
      },
      {
        field: "stockId",
        moduleKey: "stocksauto",
        labelFields: [
          "nom",
          "emplacement",
          "reference",
        ],
        displayAs: "inline",
      },
    ],

    lockedFields: [
      "interventionId",
      "montantTotal",
      "stockMovementId",
      "stockProcessedAt",
      "stockProcessedQuantity",
    ],

    readOnlyFields: [
      "stockMovementId",
      "stockProcessedAt",
      "stockProcessedQuantity",
    ],
  },
`;

  linesModule = replaceOnce(
    linesModule,
    `  workflows: [`,
    compositionBlock + `
  workflows: [`,
    "lignesinterventionauto composition"
  );
}

writeFile(linesModulePath, linesModule);

console.log("");
console.log("[OK] PASS 2N-Q15A Runtime Ownership / Parent-Child Locking installé.");
console.log("");
console.log("Prochaines commandes :");
console.log("node .\\\\scripts\\\\runtime\\\\check-encoding.cjs");
console.log("pnpm build");