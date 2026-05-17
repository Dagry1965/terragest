const fs = require("fs");
const path = require("path");

const root = process.cwd();

function write(file, content) {
  fs.writeFileSync(file, content, { encoding: "utf8" });
  console.log(`UPDATED ${path.relative(root, file)}`);
}

const rdvFile = path.join(
  root,
  "src",
  "runtime",
  "modules",
  "generated",
  "rendezvous",
  "rendezvous.module.ts"
);

const formFieldFile = path.join(
  root,
  "src",
  "components",
  "erp",
  "forms",
  "enterprise",
  "ERPFormField.tsx"
);

if (!fs.existsSync(rdvFile)) {
  console.error(`MISSING ${rdvFile}`);
  process.exit(1);
}

if (!fs.existsSync(formFieldFile)) {
  console.error(`MISSING ${formFieldFile}`);
  process.exit(1);
}

/**
 * 1) Add relation.filterBy metadata on rendezvous.vehiculeId
 */
let rdv = fs.readFileSync(rdvFile, "utf8");

rdv = rdv.replace(
  `        relation: { module: "vehicules" },`,
  `        relation: {
          module: "vehicules",
          filterBy: {
            sourceField: "clientId",
            targetField: "clientId",
            includeEmptyTarget: true,
          },
        },`
);

rdv = rdv
  .replaceAll("VÃ©hicule", "Véhicule")
  .replaceAll("RÃ©paration", "Réparation")
  .replaceAll("ContrÃ´le", "Contrôle")
  .replaceAll("PlanifiÃ©", "Planifié")
  .replaceAll("ConfirmÃ©", "Confirmé")
  .replaceAll("TerminÃ©", "Terminé")
  .replaceAll("FacturÃ©", "Facturé")
  .replaceAll("AnnulÃ©", "Annulé")
  .replaceAll("DÃ©tails", "Détails")
  .replaceAll("DÃ©marrer", "Démarrer");

write(rdvFile, rdv);

/**
 * 2) Rewrite ERPFormField with dependent relation filtering support.
 * We preserve the existing behavior and add:
 * - allOptions with raw record
 * - current form data via closest form FormData
 * - filterBy.sourceField / targetField / includeEmptyTarget
 */
let form = fs.readFileSync(formFieldFile, "utf8");

form = form.replace(
  `type RelationOption = {
  id: string;
  label: string;
};`,
  `type RelationOption = {
  id: string;
  label: string;
  record?: Record<string, unknown>;
};`
);

form = form.replace(
  `interface ERPFormFieldProps {
  field: ERPModuleField;
  value?: unknown;
  onChange?: (key: string, value: unknown) => void;
  error?: string;
  lockedFields?: string[];
}`,
  `interface ERPFormFieldProps {
  field: ERPModuleField;
  value?: unknown;
  onChange?: (key: string, value: unknown) => void;
  error?: string;
  lockedFields?: string[];
}`
);

if (!form.includes("function getRelationTargetModule(")) {
  form = form.replace(
    `function compactLockedRelationLabel(`,
    `function getRelationTargetModule(
  field: ERPModuleField
): string {
  return (
    field.references?.module ??
    (typeof field.relation === "string"
      ? field.relation
      : field.relation?.module) ??
    ""
  );
}

function getRelationFilterConfig(
  field: ERPModuleField
): {
  sourceField?: string;
  targetField?: string;
  includeEmptyTarget?: boolean;
} | null {
  if (
    !field.relation ||
    typeof field.relation === "string"
  ) {
    return null;
  }

  const relationWithFilter =
    field.relation as {
      filterBy?: {
        sourceField?: string;
        targetField?: string;
        includeEmptyTarget?: boolean;
      };
    };

  return relationWithFilter.filterBy ?? null;
}

function getCurrentFormValue(
  fieldKey: string
): string {
  if (typeof document === "undefined") {
    return "";
  }

  const element =
    document.querySelector(
      \`[name="\${fieldKey}"]\`
    ) as HTMLInputElement | HTMLSelectElement | null;

  return String(element?.value ?? "");
}

function relationTargetIsEmpty(
  value: unknown
): boolean {
  return (
    value === undefined ||
    value === null ||
    String(value).trim() === ""
  );
}

function compactLockedRelationLabel(`
  );
}

form = form.replace(
  `  const [relationOptions, setRelationOptions] = useState<RelationOption[]>([]);
  const [relationSearch, setRelationSearch] = useState("");
  const [lockedRelationLabel, setLockedRelationLabel] = useState("");`,
  `  const [relationOptions, setRelationOptions] = useState<RelationOption[]>([]);
  const [relationSearch, setRelationSearch] = useState("");
  const [lockedRelationLabel, setLockedRelationLabel] = useState("");
  const [relationFilterSourceValue, setRelationFilterSourceValue] = useState("");`
);

form = form.replace(
  `      const targetModule =
        field.references?.module ??
        (typeof field.relation === "string"
          ? field.relation
          : field.relation?.module);`,
  `      const targetModule =
        getRelationTargetModule(field);`
);

form = form.replace(
  `      const targetModule =
        field.references?.module ??
        (typeof field.relation === "string"
          ? field.relation
          : typeof field.relation === "string"
  ? field.relation
  : field.relation?.module);

      if (!targetModule) return;

      try {
        const options = await ERPRelationDataLoader.load(targetModule);
        setRelationOptions(options);`,
  `      const targetModule =
        getRelationTargetModule(field);

      if (!targetModule) return;

      try {
        const options = await ERPRelationDataLoader.load(targetModule);
        setRelationOptions(options as RelationOption[]);`
);

if (!form.includes("function refreshRelationFilterSourceValue()")) {
  form = form.replace(
    `  const label = (`,
    `  useEffect(() => {
    const filterConfig =
      getRelationFilterConfig(field);

    if (
      field.type !== "relation" ||
      !filterConfig?.sourceField
    ) {
      setRelationFilterSourceValue("");
      return;
    }

    function refreshRelationFilterSourceValue() {
      setRelationFilterSourceValue(
        getCurrentFormValue(filterConfig.sourceField ?? "")
      );
    }

    refreshRelationFilterSourceValue();

    const sourceElement =
      typeof document === "undefined"
        ? null
        : document.querySelector(
            \`[name="\${filterConfig.sourceField}"]\`
          );

    sourceElement?.addEventListener(
      "change",
      refreshRelationFilterSourceValue
    );

    sourceElement?.addEventListener(
      "input",
      refreshRelationFilterSourceValue
    );

    return () => {
      sourceElement?.removeEventListener(
        "change",
        refreshRelationFilterSourceValue
      );

      sourceElement?.removeEventListener(
        "input",
        refreshRelationFilterSourceValue
      );
    };
  }, [field]);

  const label = (`
  );
}

form = form.replace(
  `    const filteredOptions =
      relationOptions.filter((option) =>
        option.label
          .toLowerCase()
          .includes(relationSearch.toLowerCase())
      );`,
  `    const filterConfig =
      getRelationFilterConfig(field);

    const filteredByContext =
      relationOptions.filter((option) => {
        if (
          !filterConfig?.sourceField ||
          !filterConfig?.targetField
        ) {
          return true;
        }

        const targetValue =
          option.record?.[filterConfig.targetField];

        if (!relationFilterSourceValue) {
          return filterConfig.includeEmptyTarget
            ? relationTargetIsEmpty(targetValue)
            : true;
        }

        return (
          String(targetValue ?? "") === String(relationFilterSourceValue) ||
          (
            Boolean(filterConfig.includeEmptyTarget) &&
            relationTargetIsEmpty(targetValue)
          )
        );
      });

    const filteredOptions =
      filteredByContext.filter((option) =>
        option.label
          .toLowerCase()
          .includes(relationSearch.toLowerCase())
      );`
);

write(formFieldFile, form);

console.log("DONE install dependent relation filters");