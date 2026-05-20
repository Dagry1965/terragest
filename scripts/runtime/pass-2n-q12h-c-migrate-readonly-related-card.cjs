const fs = require("fs");
const os = require("os");
const path = require("path");

const root = process.cwd();
const backupDir = fs.mkdtempSync(path.join(os.tmpdir(), "terragest-q12h-c-"));

function backup(file) {
  const backupFile = path.join(backupDir, path.basename(file) + ".bak");
  fs.writeFileSync(backupFile, fs.readFileSync(file, "utf8"), "utf8");
  console.log("BACKUP:", backupFile);
}

function read(file) {
  if (!fs.existsSync(file)) throw new Error(`Fichier introuvable: ${file}`);
  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  fs.writeFileSync(file, content, "utf8");
  console.log("WRITTEN:", file);
}

const erpModuleFile = path.join(root, "src", "runtime", "modules", "ERPModule.ts");
const clientsFile = path.join(root, "src", "runtime", "modules", "generated", "clientsauto", "clientsauto.module.ts");
const panelFile = path.join(root, "src", "components", "erp", "runtime", "ERPRelatedRecordsPanel.tsx");
const formFile = path.join(root, "src", "components", "erp", "forms", "enterprise", "ERPEnterpriseForm.tsx");

// 1. Types composition child enrichis
{
  let content = read(erpModuleFile);
  backup(erpModuleFile);

  if (!content.includes("mode?: \"default\" | \"readonly\";")) {
    content = content.replace(
      `  totalField?: string;
  relations?: ERPCompositionRelation[];`,
      `  totalField?: string;
  mode?: "default" | "readonly";
  allowCreate?: boolean;
  badgeLabel?: string;
  description?: string;
  openLabel?: string;
  labelFields?: string[];
  subtitleFields?: string[];
  relations?: ERPCompositionRelation[];`
    );
  }

  write(erpModuleFile, content);
}

// 2. Enrichir clientsauto composition child vehicules
{
  let content = read(clientsFile);
  backup(clientsFile);

  const oldBlock = `        title: "Véhicules du client",
        createLabel: "Ajouter un véhicule",
        displayIn: [
          "detail",
          "edit",
        ],
        position: "after",
        lazy: true,`;

  const newBlock = `        title: "Véhicules du client",
        createLabel: "Ajouter un véhicule",
        displayIn: [
          "detail",
          "edit",
        ],
        position: "after",
        lazy: true,
        mode: "readonly",
        allowCreate: false,
        badgeLabel: "véhicules liés",
        description: "Source de vérité : le champ Client dans chaque fiche véhicule. Cette section affiche les véhicules liés sans modifier la relation.",
        openLabel: "Ouvrir véhicule",
        labelFields: [
          "marque",
          "modele",
        ],
        subtitleFields: [
          "immatriculation",
          "statut",
          "kilometrage",
        ],`;

  if (!content.includes(`badgeLabel: "véhicules liés"`)) {
    if (!content.includes(oldBlock)) {
      throw new Error("Bloc child vehicules clientsauto introuvable.");
    }
    content = content.replace(oldBlock, newBlock);
  }

  write(clientsFile, content);
}

// 3. Améliorer ERPRelatedRecordsPanel
{
  let content = read(panelFile);
  backup(panelFile);

  // Ajoute helpers génériques
  if (!content.includes("function formatRelatedFieldValue(")) {
    const insertAfter = `function getFallbackRecordLabel(record: Record<string, unknown>): string {
  return String(
    record.designation ??
      record.nom ??
      record.label ??
      record.reference ??
      record.code ??
      record.id ??
      record._id ??
      "Enregistrement"
  );
}

`;

    const helpers = `function formatRelatedFieldValue(field: string, value: unknown): string {
  const text = String(value ?? "").trim();

  if (!text) return "";

  const normalized = text.toLowerCase();

  const statusLabels: Record<string, string> = {
    actif: "Actif",
    active: "Actif",
    prospect: "Prospect",
    inactif: "Inactif",
    inactive: "Inactif",
    entretien: "Entretien requis",
    immobilise: "Immobilisé",
    immobilisé: "Immobilisé",
    archive: "Archivé",
    brouillon: "Brouillon",
    validee: "Validée",
    validée: "Validée",
    facturee: "Facturée",
    facturée: "Facturée",
    annulee: "Annulée",
    annulée: "Annulée",
  };

  if (field.toLowerCase().includes("kilometrage")) {
    const amount = Number(value ?? 0);
    return Number.isFinite(amount)
      ? amount.toLocaleString("fr-FR") + " km"
      : text;
  }

  return statusLabels[normalized] ?? text;
}

function getConfiguredRecordLabel(
  record: Record<string, unknown>,
  fields?: string[]
): string {
  if (!fields || fields.length === 0) return "";

  return fields
    .map((field) => formatRelatedFieldValue(field, record[field]))
    .filter((value) => value && !looksLikeTechnicalId(value))
    .join(" ")
    .trim();
}

function getConfiguredSubtitleParts(
  record: Record<string, unknown>,
  fields?: string[]
): string[] {
  if (!fields || fields.length === 0) return [];

  return fields
    .map((field) => formatRelatedFieldValue(field, record[field]))
    .filter((value) => value && !looksLikeTechnicalId(value));
}

`;

    if (!content.includes(insertAfter)) {
      throw new Error("Point d'insertion helpers panel introuvable.");
    }

    content = content.replace(insertAfter, insertAfter + helpers);
  }

  // Remplace calcul label dans map
  content = content.replace(
    `const label = getChildRecordLabel(record, childModule);`,
    `const configuredLabel = getConfiguredRecordLabel(record, child.labelFields);
            const label = configuredLabel || getChildRecordLabel(record, childModule);
            const configuredSubtitleParts = getConfiguredSubtitleParts(
              record,
              child.subtitleFields
            );`
  );

  // Améliore summary header si description/mode readonly
  content = content.replace(
    `{loading
              ? "Chargement..."
              : child.totalField
                ? \`\${records.length} ligne(s) · total \${formatMoney(total)}\`
                : \`\${records.length} enregistrement(s)\`}`,
    `{loading
              ? "Chargement..."
              : child.badgeLabel
                ? \`\${records.length} \${child.badgeLabel}\`
                : child.totalField
                  ? \`\${records.length} ligne(s) · total \${formatMoney(total)}\`
                  : \`\${records.length} enregistrement(s)\`}`
  );

  // Injecte description sous le compteur
  content = content.replace(
    `</p>
        </div>

        <Link`,
    `</p>

          {child.description ? (
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              {child.description}
            </p>
          ) : null}
        </div>

        {(child.allowCreate ?? child.mode !== "readonly") ? (
        <Link`
  );

  content = content.replace(
    `        </Link>
      </div>`,
    `        </Link>
        ) : null}
      </div>`
  );

  // Remplace sous-titre relationParts par subtitle configuré + relationParts
  content = content.replace(
    `{relationParts.length > 0 ? (
                  <p className="mt-1 text-xs font-semibold text-slate-500">
                    {relationParts.join(" · ")}
                  </p>
                ) : null}`,
    `{configuredSubtitleParts.length > 0 || relationParts.length > 0 ? (
                  <div className="mt-2 flex flex-wrap gap-2 text-xs font-bold text-slate-600">
                    {[...configuredSubtitleParts, ...relationParts].map((part) => (
                      <span
                        key={part}
                        className="rounded-full bg-slate-100 px-3 py-1"
                      >
                        {part}
                      </span>
                    ))}
                  </div>
                ) : null}`
  );

  // Bouton ouvrir lisible pour readonly
  content = content.replace(
    `href={buildChildEditHref(child, record)}
              className="group flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[#009B7D]/40 hover:bg-emerald-50/30 hover:shadow-[0_14px_32px_rgba(15,23,42,0.08)] sm:flex-row sm:items-center sm:justify-between"
            >`,
    `href={buildChildEditHref(child, record)}
              className="group flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[#009B7D]/40 hover:bg-emerald-50/30 hover:shadow-[0_14px_32px_rgba(15,23,42,0.08)] sm:flex-row sm:items-center sm:justify-between"
            >`
  );

  // Si readonly sans montant, afficher CTA ouvrir
  content = content.replace(
    `{amount !== null ? (
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-right">
                  <p className="text-xs font-black uppercase tracking-wide text-emerald-700">
                    Montant
                  </p>
                  <p className="mt-1 whitespace-nowrap text-base font-black text-slate-950">
                    {formatMoney(amount)}
                  </p>
                </div>
              ) : null}`,
    `{amount !== null ? (
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-right">
                  <p className="text-xs font-black uppercase tracking-wide text-emerald-700">
                    Montant
                  </p>
                  <p className="mt-1 whitespace-nowrap text-base font-black text-slate-950">
                    {formatMoney(amount)}
                  </p>
                </div>
              ) : child.openLabel ? (
                <span className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-4 py-2 text-sm font-black text-white transition group-hover:bg-slate-800">
                  {child.openLabel}
                </span>
              ) : null}`
  );

  write(panelFile, content);
}

// 4. Désactiver l'ancien composant spécialisé dans ERPEnterpriseForm
{
  let content = read(formFile);
  backup(formFile);

  content = content.replace(
    /import\s*\{\s*ClientVehiclesReadonlyCard,\s*\}\s*from\s*"@\/components\/erp\/relations\/ClientVehiclesReadonlyCard";\s*/m,
    ""
  );

  content = content.replace(
    /\s*\{mode === "edit" &&\s*module\.metadata\.key ===\s*"clientsauto" &&\s*Boolean\(initialData\?\.id\)\s*\? \(\s*<div\s+data-client-vehicles-readonly-card>[\s\S]*?<\/div>\s*\) : null\}\s*/m,
    "\n"
  );

  write(formFile, content);
}

console.log("OK: ancien readonly card migré vers ERPRelatedRecordsPanel générique.");