const fs = require("fs");
const path = require("path");

const root = process.cwd();

function write(file, content) {
  fs.writeFileSync(file, content, { encoding: "utf8" });
  console.log(`UPDATED ${path.relative(root, file)}`);
}

const loaderFile = path.join(
  root,
  "src",
  "runtime",
  "modules",
  "lifecycle",
  "ERPRelationDataLoader.ts"
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

if (!fs.existsSync(loaderFile)) {
  console.error(`MISSING ${loaderFile}`);
  process.exit(1);
}

if (!fs.existsSync(formFieldFile)) {
  console.error(`MISSING ${formFieldFile}`);
  process.exit(1);
}

let loader = fs.readFileSync(loaderFile, "utf8");

if (!loader.includes("static async resolveLabel(")) {
  loader = loader.replace(
    `  static async load(moduleKey: string) {
    const module = allERPModules.find(
      (item) => item.metadata.key === moduleKey
    );

    if (!module) {
      return [];
    }

    const records = await RuntimeDataBinding.list(module);

    return records.map((record) => ({
      id: String(record.id),
      label: ERPRelationDataLoader.getLabel(record),
    }));
  }`,
    `  static async load(moduleKey: string) {
    const module = allERPModules.find(
      (item) => item.metadata.key === moduleKey
    );

    if (!module) {
      return [];
    }

    const records = await RuntimeDataBinding.list(module);

    return records.map((record) => ({
      id: String(record.id),
      label: ERPRelationDataLoader.getLabel(record),
    }));
  }

  static async resolveLabel(
    moduleKey: string,
    id: string
  ): Promise<string> {
    if (!moduleKey || !id) {
      return "";
    }

    const module = allERPModules.find(
      (item) => item.metadata.key === moduleKey
    );

    if (!module) {
      return "";
    }

    try {
      const record =
        await RuntimeDataBinding.detail(
          module,
          id
        );

      if (!record) {
        return "";
      }

      return ERPRelationDataLoader.getLabel(record);
    } catch {
      return "";
    }
  }`
  );
}

if (!loader.includes(`const numeroFacture = value("numeroFacture");`)) {
  loader = loader.replace(
    `    const numero = value("numero");`,
    `    const numero = value("numero");
    const numeroFacture = value("numeroFacture");
    const dateFacture = value("dateFacture");
    const montantTTC = value("montantTTC");`
  );
}

if (!loader.includes("Factures AMARKHYS")) {
  loader = loader.replace(
    `    /**
     * Contrats / factures / documents mÃ©tier
     */`,
    `    /**
     * Factures AMARKHYS
     */
    const factureLabel = compact(
      numeroFacture || reference || numero,
      montantTTC ? montantTTC + " FCFA" : "",
      dateFacture
    );

    if (factureLabel) {
      return factureLabel;
    }

    /**
     * Contrats / factures / documents métier
     */`
  );
}

loader = loader
  .replaceAll("VÃ©hicules", "Véhicules")
  .replaceAll("propriÃ©taires", "propriétaires")
  .replaceAll("oÃ¹", "où")
  .replaceAll("dÃ©jÃ", "déjà")
  .replaceAll("mÃ©tier", "métier");

write(loaderFile, loader);

let form = fs.readFileSync(formFieldFile, "utf8");

if (!form.includes("lockedRelationLabel")) {
  form = form.replace(
    `  const [relationOptions, setRelationOptions] = useState<RelationOption[]>([]);
  const [relationSearch, setRelationSearch] = useState("");`,
    `  const [relationOptions, setRelationOptions] = useState<RelationOption[]>([]);
  const [relationSearch, setRelationSearch] = useState("");
  const [lockedRelationLabel, setLockedRelationLabel] = useState("");`
  );
}

if (!form.includes("async function loadLockedRelationLabel()")) {
  form = form.replace(
    `  useEffect(() => {
    async function loadRelation() {`,
    `  useEffect(() => {
    async function loadLockedRelationLabel() {
      if (field.type !== "relation" || !isLocked || !currentValue) {
        setLockedRelationLabel("");
        return;
      }

      const targetModule =
        field.references?.module ??
        (typeof field.relation === "string"
          ? field.relation
          : field.relation?.module);

      if (!targetModule) {
        setLockedRelationLabel("");
        return;
      }

      const label =
        await ERPRelationDataLoader.resolveLabel(
          targetModule,
          currentValue
        );

      setLockedRelationLabel(label);
    }

    loadLockedRelationLabel().catch(() => {
      setLockedRelationLabel("");
    });
  }, [field, isLocked, currentValue]);

  useEffect(() => {
    async function loadRelation() {`
  );
}

form = form.replace(
  /const selectedLabel\s*=\s*selectedOption\?\.label\s*\|\|[\s\S]*?\);/,
  `const selectedLabel =
      lockedRelationLabel ||
      selectedOption?.label ||
      (currentValue
        ? "Relation métier sélectionnée"
        : "Aucune relation renseignée");`
);

form = form.replaceAll(
  "Relation verrouillée",
  "Relation métier verrouillée"
);

write(formFieldFile, form);

console.log("DONE fix locked relation direct label resolver");