const fs = require("fs");
const path = require("path");

const root = process.cwd();

const targetPath = path.join(
  root,
  "src",
  "components",
  "erp",
  "forms",
  "enterprise",
  "ERPEnterpriseForm.tsx"
);

const backupPath = `${targetPath}.bak-q22e7e-apply-create-query-values`;

function fail(message) {
  console.error(`\n[ERROR] ${message}`);
  process.exit(1);
}

function read(filePath) {
  if (!fs.existsSync(filePath)) {
    fail(`File not found: ${filePath}`);
  }

  return fs.readFileSync(filePath, "utf8");
}

function write(filePath, content) {
  fs.writeFileSync(filePath, content, "utf8");
  console.log(`[WRITTEN] ${path.relative(root, filePath)}`);
}

function backup() {
  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(targetPath, backupPath);
    console.log(`[BACKUP] ${path.relative(root, backupPath)}`);
  } else {
    console.log(`[BACKUP_EXISTS] ${path.relative(root, backupPath)}`);
  }
}

let content = read(targetPath);
const original = content;

backup();

if (
  content.includes("Q22E7E_APPLY_CREATE_QUERY_VALUES") &&
  content.includes("queryInitialValuesAppliedRef")
) {
  console.log("\n[SKIP] Q22E-7E-A semble déjà appliqué.");
  process.exit(0);
}

const refAnchor = `  const searchParams = useSearchParams();`;

const refInsert = `  const searchParams = useSearchParams();

  const queryInitialValuesAppliedRef =
    useRef(false);`;

if (!content.includes(refAnchor)) {
  fail("Anchor searchParams not found.");
}

content = content.replace(refAnchor, refInsert);

const stateBlock = `  const [formValues, setFormValues] =
    useState<Record<string, unknown>>(
      () => resolveInitialFormValues()
    );`;

const effectBlock = `  const [formValues, setFormValues] =
    useState<Record<string, unknown>>(
      () => resolveInitialFormValues()
    );

  const queryValuesSignature =
    JSON.stringify(queryValues);

  useEffect(() => {
    // Q22E7E_APPLY_CREATE_QUERY_VALUES
    // Generic create forms must be able to receive initial values from URL.
    // This is used by runtime planning, parent/child creation links,
    // contextual creation buttons, and any future metadata-driven entry point.
    // Applied once only to avoid overwriting user input while editing the form.
    if (mode !== "create") {
      return;
    }

    if (queryInitialValuesAppliedRef.current) {
      return;
    }

    const entries =
      Object.entries(queryValues).filter(
        ([, value]) =>
          value !== undefined &&
          value !== null &&
          String(value).trim() !== ""
      );

    if (entries.length === 0) {
      return;
    }

    queryInitialValuesAppliedRef.current = true;

    setFormValues((currentValues) => {
      const nextValues = {
        ...currentValues,
      };

      let changed = false;

      for (const [key, value] of entries) {
        if (nextValues[key] !== value) {
          nextValues[key] = value;
          changed = true;
        }
      }

      if (!changed) {
        return currentValues;
      }

      const computedResult =
        RuntimeComputedFieldsEngine.apply({
          module,
          values: nextValues,
        });

      return computedResult.values;
    });
  }, [
    mode,
    module,
    queryValuesSignature,
  ]);`;

if (!content.includes(stateBlock)) {
  fail("formValues state block not found.");
}

content = content.replace(stateBlock, effectBlock);

if (content === original) {
  fail("No changes applied.");
}

write(targetPath, content);

console.log(`
[Q22E7E_A_DONE] Query params appliqués au formulaire create.

Scope:
  - generic ERPEnterpriseForm
  - create mode only
  - applies URL query values once
  - does not overwrite user input after initial hydration
  - supports scheduling planning slots
  - supports future generic contextual create links
  - no AMARKHYS / garage / rendezvous-specific logic

Next:
  pnpm build
  tester /rendezvous/planning
  cliquer sur un créneau disponible
  vérifier que date/heure/durée sont préremplies
`);