const fs = require("fs");
const path = require("path");

const root = process.cwd();

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function write(file, content) {
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, content, { encoding: "utf8" });
  console.log(`UPDATED ${path.relative(root, file)}`);
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

const engineFile = path.join(
  root,
  "src",
  "runtime",
  "validation",
  "RuntimeUniqueConstraintEngine.ts"
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

write(
  engineFile,
  `import type { ERPModule } from "@/runtime/modules/ERPModule";

import {
  RuntimeDataBinding,
} from "@/runtime/data-binding";

export interface RuntimeUniqueConstraintViolation {
  field: string;
  message: string;
}

function normalizeUniqueValue(
  value: unknown
): string {
  return String(value ?? "")
    .trim()
    .toUpperCase();
}

function getRecordId(
  record: Record<string, unknown>
): string {
  return String(
    record.id ??
      record._id ??
      ""
  );
}

export class RuntimeUniqueConstraintEngine {
  static async validate(
    module: ERPModule,
    payload: Record<string, unknown>,
    currentRecordId?: string
  ): Promise<RuntimeUniqueConstraintViolation[]> {
    const uniqueFields =
      module.schema.fields.filter((field) => {
        return Boolean(field.unique);
      });

    if (uniqueFields.length === 0) {
      return [];
    }

    const records =
      await RuntimeDataBinding.list(module);

    const violations: RuntimeUniqueConstraintViolation[] = [];

    for (const field of uniqueFields) {
      const value =
        normalizeUniqueValue(payload[field.key]);

      if (!value) {
        continue;
      }

      const duplicate =
        records.find((record) => {
          const recordId =
            getRecordId(record as Record<string, unknown>);

          if (
            currentRecordId &&
            recordId &&
            recordId === currentRecordId
          ) {
            return false;
          }

          const existingValue =
            normalizeUniqueValue(
              (record as Record<string, unknown>)[field.key]
            );

          return existingValue === value;
        });

      if (duplicate) {
        violations.push({
          field: field.key,
          message:
            field.label +
            " existe déjà. Cette valeur doit être unique.",
        });
      }
    }

    return violations;
  }
}
`
);

/**
 * Mark key AMARKHYS business codes as unique.
 */
if (fs.existsSync(clientsFile)) {
  let content = read(clientsFile);

  content = content.replace(
    `        key: "codeClient",
        label: "Code client",
        type: "text",
        required: true,
        searchable: true,`,
    `        key: "codeClient",
        label: "Code client",
        type: "text",
        required: true,
        unique: true,
        searchable: true,`
  );

  write(clientsFile, content);
}

if (fs.existsSync(vehiculesFile)) {
  let content = read(vehiculesFile);

  content = content.replace(
    `        key:"immatriculation",
        label:"Immatriculation",
        type:"text",
        required:true,
        searchable:true,`,
    `        key:"immatriculation",
        label:"Immatriculation",
        type:"text",
        required:true,
        unique:true,
        searchable:true,`
  );

  write(vehiculesFile, content);
}

if (fs.existsSync(facturesFile)) {
  let content = read(facturesFile);

  content = content.replace(
    `        key: "numeroFacture",
        label: "Numéro facture",
        type: "text",
        required: true,
        searchable: true,`,
    `        key: "numeroFacture",
        label: "Numéro facture",
        type: "text",
        required: true,
        unique: true,
        searchable: true,`
  );

  content = content.replace(
    `        key: "numeroFacture",
        label: "NumÃ©ro facture",
        type: "text",
        required: true,
        searchable: true,`,
    `        key: "numeroFacture",
        label: "Numéro facture",
        type: "text",
        required: true,
        unique: true,
        searchable: true,`
  );

  write(facturesFile, content);
}

/**
 * Patch ERPEnterpriseForm to call RuntimeUniqueConstraintEngine before save.
 */
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

console.log("DONE install runtime unique constraint engine");