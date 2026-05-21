/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const root = process.cwd();

function p(...parts) {
  return path.join(root, ...parts);
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  fs.writeFileSync(file, content, "utf8");
}

function backup(file, suffix) {
  const target = `${file}.bak-${suffix}`;
  if (!fs.existsSync(target)) {
    fs.copyFileSync(file, target);
    console.log(`[BACKUP] ${path.relative(root, target)}`);
  }
}

function replaceOnce(content, from, to, label) {
  if (!content.includes(from)) {
    throw new Error(`[${label}] pattern introuvable`);
  }

  return content.replace(from, to);
}

function patchERPFormField() {
  const file = p(
    "src",
    "components",
    "erp",
    "forms",
    "enterprise",
    "ERPFormField.tsx"
  );

  backup(file, "q16c2c-relation-autofill");

  let content = read(file);

  if (!content.includes("interface ERPFormRelationChangeContext")) {
    content = content.replace(
      `type RelationOption = {
  id: string;
  label: string;
  record?: Record<string, unknown>;
};`,
      `type RelationOption = {
  id: string;
  label: string;
  record?: Record<string, unknown>;
};

interface ERPFormRelationChangeContext {
  field: ERPModuleField;
  selectedOption?: RelationOption;
}`
    );
  }

  content = content.replace(
    `  onChange?: (key: string, value: unknown) => void;`,
    `  onChange?: (
    key: string,
    value: unknown,
    context?: ERPFormRelationChangeContext
  ) => void;`
  );

  const oldSelect = `          <select
            name={field.key}
            required={field.required}
            value={currentValue}
            onChange={(event) => onChange?.(field.key, event.target.value)}
            className={className}
          >`;

  const newSelect = `          <select
            name={field.key}
            required={field.required}
            value={currentValue}
            onChange={(event) => {
              const nextValue =
                event.target.value;

              const selectedRelationOption =
                relationOptions.find((option) =>
                  String(option.id) === String(nextValue)
                );

              onChange?.(
                field.key,
                nextValue,
                {
                  field,
                  selectedOption: selectedRelationOption,
                }
              );
            }}
            className={className}
          >`;

  if (content.includes(oldSelect)) {
    content = content.replace(oldSelect, newSelect);
  } else if (!content.includes("selectedRelationOption")) {
    throw new Error("[ERPFormField] select relation onChange introuvable");
  }

  write(file, content);
  console.log(`[WRITTEN] ${path.relative(root, file)}`);
}

function patchERPEnterpriseForm() {
  const file = p(
    "src",
    "components",
    "erp",
    "forms",
    "enterprise",
    "ERPEnterpriseForm.tsx"
  );

  backup(file, "q16c2c-relation-autofill");

  let content = read(file);

  if (!content.includes("interface ERPFormRelationChangeContext")) {
    content = content.replace(
      `interface ERPEnterpriseFormProps {
  module: ERPModule;
  mode?: "create" | "edit";
  initialData?: Record<string, unknown>;
  workflowActions?: ERPModuleAction[];
}`,
      `interface ERPEnterpriseFormProps {
  module: ERPModule;
  mode?: "create" | "edit";
  initialData?: Record<string, unknown>;
  workflowActions?: ERPModuleAction[];
}

interface ERPFormRelationChangeContext {
  field?: {
    key: string;
    relation?: unknown;
    autoFill?: RuntimeRelationAutoFillConfig;
  };
  selectedOption?: {
    id: string;
    label: string;
    record?: Record<string, unknown>;
  };
}

interface RuntimeRelationAutoFillConfig {
  map?: Record<string, string[] | string>;
  recalculate?: boolean;
}`
    );
  }

  const oldHandle = `  function handleFieldChange(
    key: string,
    value: unknown
  ) {
    setFormValues((currentValues) => ({
      ...currentValues,
      [key]: value,
    }));
  }`;

  const newHandle = `  function toRuntimeNumber(
    value: unknown,
    fallback = 0
  ): number {
    if (
      typeof value === "number" &&
      Number.isFinite(value)
    ) {
      return value;
    }

    if (typeof value === "string") {
      const parsed =
        Number(
          value
            .replace(",", ".")
            .trim()
        );

      if (Number.isFinite(parsed)) {
        return parsed;
      }
    }

    return fallback;
  }

  function getRelationAutoFillConfig(
    field?: ERPFormRelationChangeContext["field"]
  ): RuntimeRelationAutoFillConfig | null {
    if (!field) {
      return null;
    }

    const fieldWithAutoFill =
      field as {
        autoFill?: RuntimeRelationAutoFillConfig;
        relation?: {
          autoFill?: RuntimeRelationAutoFillConfig;
        };
      };

    return (
      fieldWithAutoFill.autoFill ??
      (
        typeof fieldWithAutoFill.relation === "object" &&
        fieldWithAutoFill.relation
          ? fieldWithAutoFill.relation.autoFill
          : undefined
      ) ??
      null
    );
  }

  function resolveAutoFillValue(
    record: Record<string, unknown> | undefined,
    candidates: string[] | string
  ): unknown {
    if (!record) {
      return undefined;
    }

    const keys =
      Array.isArray(candidates)
        ? candidates
        : [candidates];

    for (const key of keys) {
      const value =
        record[key];

      if (
        value !== undefined &&
        value !== null &&
        String(value).trim() !== ""
      ) {
        return value;
      }
    }

    return undefined;
  }

  function applyRelationAutoFill(
    currentValues: Record<string, unknown>,
    context?: ERPFormRelationChangeContext
  ): Record<string, unknown> {
    const autoFillConfig =
      getRelationAutoFillConfig(context?.field);

    const record =
      context?.selectedOption?.record;

    if (
      !autoFillConfig?.map ||
      !record
    ) {
      return currentValues;
    }

    const nextValues = {
      ...currentValues,
    };

    for (const [targetField, sourceFields] of Object.entries(autoFillConfig.map)) {
      const value =
        resolveAutoFillValue(
          record,
          sourceFields
        );

      if (
        value !== undefined &&
        value !== null
      ) {
        nextValues[targetField] = value;
      }
    }

    return autoFillConfig.recalculate
      ? applyLineItemFormCalculations(nextValues)
      : nextValues;
  }

  function applyLineItemFormCalculations(
    values: Record<string, unknown>
  ): Record<string, unknown> {
    if (module.metadata.key !== "lignesinterventionauto") {
      return values;
    }

    const quantity =
      toRuntimeNumber(values.quantite, 1);

    const unitPrice =
      toRuntimeNumber(
        values.prixUnitaireHT ??
          values.prixUnitaire,
        0
      );

    const taxRate =
      toRuntimeNumber(values.tauxTVA, 18);

    const montantHT =
      Math.round(quantity * unitPrice * 100) / 100;

    const montantTVA =
      Math.round((montantHT * taxRate / 100) * 100) / 100;

    const montantTTC =
      Math.round((montantHT + montantTVA) * 100) / 100;

    return {
      ...values,
      quantite: quantity,
      prixUnitaire: unitPrice,
      prixUnitaireHT: unitPrice,
      tauxTVA: taxRate,
      montantHT,
      montantTVA,
      montantTTC,
      montantTotal: montantHT,
    };
  }

  function handleFieldChange(
    key: string,
    value: unknown,
    context?: ERPFormRelationChangeContext
  ) {
    setFormValues((currentValues) => {
      const nextValues = {
        ...currentValues,
        [key]: value,
      };

      const autoFilledValues =
        applyRelationAutoFill(
          nextValues,
          context
        );

      if (
        module.metadata.key === "lignesinterventionauto" &&
        [
          "quantite",
          "prixUnitaire",
          "prixUnitaireHT",
          "tauxTVA",
          "produitId",
        ].includes(key)
      ) {
        return applyLineItemFormCalculations(autoFilledValues);
      }

      return autoFilledValues;
    });
  }`;

  content = replaceOnce(
    content,
    oldHandle,
    newHandle,
    "replace handleFieldChange"
  );

  write(file, content);
  console.log(`[WRITTEN] ${path.relative(root, file)}`);
}

function patchLignesInterventionModule() {
  const file = p(
    "src",
    "runtime",
    "modules",
    "generated",
    "lignesinterventionauto",
    "lignesinterventionauto.module.ts"
  );

  backup(file, "q16c2c-product-autofill");

  let content = read(file);

  if (!content.includes("autoFill: {")) {
    const oldBlock = `      {
        key: "produitId",
        label: "Produit / piÃ¨ce",
        type: "relation",
        relation: { module: "produitsauto" },
        searchable: true,
        list: { order: 2 },
        grid: { cols: 6 },
      },`;

    const newBlock = `      {
        key: "produitId",
        label: "Produit / pièce",
        type: "relation",
        relation: { module: "produitsauto" },
        autoFill: {
          map: {
            produitCode: ["code", "reference"],
            produitNom: ["nom", "designation"],
            designation: ["nom", "designation"],
            typeArticle: ["typeArticle"],
            typeLigne: ["typeArticle"],
            prixUnitaireHT: ["prixPromo", "prixUnitaireHT", "prixVente", "prixUnitaire"],
            prixUnitaire: ["prixPromo", "prixUnitaireHT", "prixVente", "prixUnitaire"],
            tauxTVA: ["tauxTVA"],
          },
          recalculate: true,
        },
        searchable: true,
        list: { order: 2 },
        grid: { cols: 6 },
      },`;

    content = replaceOnce(
      content,
      oldBlock,
      newBlock,
      "patch produitId autoFill"
    );
  }

  write(file, content);
  console.log(`[WRITTEN] ${path.relative(root, file)}`);
}

function main() {
  console.log("");
  console.log("[PASS] 2N-Q16C2C - Relation autoFill + line item recalculation");

  patchERPFormField();
  patchERPEnterpriseForm();
  patchLignesInterventionModule();

  console.log("");
  console.log("[Q16C2C_DONE]");
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
  console.log("  tester choix produit dans une ligne intervention");
}

main();