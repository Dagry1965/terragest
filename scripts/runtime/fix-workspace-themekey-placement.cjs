const fs = require("fs");
const path = require("path");

const root = process.cwd();
const target = path.join(
  root,
  "src/runtime/workspaces/ERPWorkspaceRegistry.ts"
);

let content = fs.readFileSync(target, "utf8");

// 1. Supprimer les themeKey placés dans les blocs KPI/modules/actions par erreur.
content = content.replaceAll(
`      {
        key: "production",
    themeKey: "agri-enterprise",
        label: "Production",
      },`,
`      {
        key: "production",
        label: "Production",
      },`
);

// Variante indentation possible
content = content.replaceAll(
`      {
        key: "production",
        themeKey: "agri-enterprise",
        label: "Production",
      },`,
`      {
        key: "production",
        label: "Production",
      },`
);

// 2. Ajouter themeKey uniquement au niveau workspace.
if (!content.includes('key: "general",\n    themeKey: "default-enterprise"')) {
  content = content.replace(
`key: "general",

    label: "Vue Générale",`,
`key: "general",
    themeKey: "default-enterprise",

    label: "Vue Générale",`
  );
}

if (!content.includes('key: "production",\n    themeKey: "agri-enterprise"')) {
  content = content.replace(
`key: "production",

    label: "Production",`,
`key: "production",
    themeKey: "agri-enterprise",

    label: "Production",`
  );
}

if (!content.includes('key: "amarkhys",\n  themeKey: "amarkhys-petronas"')) {
  content = content.replace(
`key: "amarkhys",

  label: "AMARKHYS",`,
`key: "amarkhys",
  themeKey: "amarkhys-petronas",

  label: "AMARKHYS",`
  );
}

// 3. Nettoyer accents registry.
content = content
  .replaceAll("Vue Générale", "Vue Générale")
  .replaceAll("Matériels", "Matériels")
  .replaceAll("Récoltes", "Récoltes")
  .replaceAll("matériels", "matériels")
  .replaceAll("financière", "financière")
  .replaceAll("Dépenses", "Dépenses")
  .replaceAll("Observabilité", "Observabilité")
  .replaceAll("Véhicules", "Véhicules");

fs.writeFileSync(target, content, "utf8");

console.log("OK: workspace themeKey placement fixed.");