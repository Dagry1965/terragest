const fs = require("fs");
const path = require("path");

const root = process.cwd();

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  fs.writeFileSync(file, content, { encoding: "utf8" });
  console.log(`UPDATED ${path.relative(root, file)}`);
}

function patchUnique(file, fieldKey) {
  if (!fs.existsSync(file)) {
    console.log(`SKIP missing ${file}`);
    return;
  }

  let content = read(file);
  const before = content;

  const fieldRegex = new RegExp(
    `(key:\\s*["']${fieldKey}["'][\\s\\S]*?required\\s*:\\s*true\\s*,)(?![\\s\\S]*?unique\\s*:\\s*true[\\s\\S]*?searchable)`,
    "m"
  );

  content = content.replace(
    fieldRegex,
    `$1
        unique: true,`
  );

  if (content !== before) {
    write(file, content);
  } else {
    console.log(`UNCHANGED ${path.relative(root, file)} / ${fieldKey}`);
  }
}

const clientsFile = path.join(
  root,
  "src",
  "runtime",
  "modules",
  "generated",
  "clientsauto",
  "clientsauto.module.ts"
);

const vehiculesFile = path.join(
  root,
  "src",
  "runtime",
  "modules",
  "generated",
  "vehicules",
  "vehicules.module.ts"
);

const facturesFile = path.join(
  root,
  "src",
  "runtime",
  "modules",
  "generated",
  "facturesauto",
  "facturesauto.module.ts"
);

const formFile = path.join(
  root,
  "src",
  "components",
  "erp",
  "forms",
  "enterprise",
  "ERPEnterpriseForm.tsx"
);

const engineFile = path.join(
  root,
  "src",
  "runtime",
  "validation",
  "RuntimeUniqueConstraintEngine.ts"
);

patchUnique(clientsFile, "codeClient");
patchUnique(vehiculesFile, "immatriculation");
patchUnique(facturesFile, "numeroFacture");

if (!fs.existsSync(engineFile)) {
  console.error(`MISSING ${engineFile}`);
  process.exit(1);
}

let engine = read(engineFile);

engine = engine
  .replaceAll("existe dÃ©jÃ ", "existe déjà")
  .replaceAll("doit Ãªtre", "doit être");

write(engineFile, engine);

if (!fs.existsSync(formFile)) {
  console.error(`MISSING ${formFile}`);
  process.exit(1);
}

let form = read(formFile);

if (!form.includes("RuntimeUniqueConstraintEngine")) {
  form = form.replace(
    `import {
  RuntimeValidationEngine,
} from "@/runtime/validation/RuntimeValidationEngine";`,
    `import {
  RuntimeValidationEngine,
} from "@/runtime/validation/RuntimeValidationEngine";

import {
  RuntimeUniqueConstraintEngine,
} from "@/runtime/validation/RuntimeUniqueConstraintEngine";`
  );
}

if (!form.includes("uniqueConstraintErrors")) {
  form = form.replace(
    `    const validationErrors =
      RuntimeValidationEngine.validate(
        module,
        preparedPayload
      );

    setErrors(validationErrors);

    if (validationErrors.length > 0) {
      pendingWorkflowActionRef.current = null;
      setSaving(false);
      return;
    }`,
    `    const validationErrors =
      RuntimeValidationEngine.validate(
        module,
        preparedPayload
      );

    const currentRecordId =
      mode === "edit"
        ? String(
            initialData.id ??
              initialData._id ??
              preparedPayload.id ??
              preparedPayload._id ??
              ""
          )
        : "";

    const uniqueConstraintErrors =
      await RuntimeUniqueConstraintEngine.validate(
        module,
        preparedPayload,
        currentRecordId
      );

    const allValidationErrors = [
      ...validationErrors,
      ...uniqueConstraintErrors,
    ];

    setErrors(allValidationErrors);

    if (allValidationErrors.length > 0) {
      pendingWorkflowActionRef.current = null;
      setSaving(false);
      return;
    }`
  );
}

form = form.replaceAll(
  "Les rÃ¨gles mÃ©tier ERP bloquent cet enregistrement.",
  "Les règles métier ERP bloquent cet enregistrement."
);

write(formFile, form);

console.log("DONE fix runtime unique constraint wiring");