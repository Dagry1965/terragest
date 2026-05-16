const fs = require("fs");
const path = require("path");

const ROOT = "C:\\Users\\Admin\\terragest";

const pagePath = path.join(
  ROOT,
  "src",
  "components",
  "erp",
  "runtime",
  "ERPRuntimePage.tsx"
);

const tablePath = path.join(
  ROOT,
  "src",
  "components",
  "erp",
  "runtime",
  "ERPRuntimeTable.tsx"
);

function read(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Fichier introuvable : ${filePath}`);
  }

  return fs.readFileSync(filePath, "utf8");
}

function write(filePath, content) {
  fs.writeFileSync(filePath, content, "utf8");
}

function fixEncoding(content) {
  const replacements = {
    "â€”": "—",
    "â†’": "→",
    "Liste opÃ©rationnelle": "Liste opérationnelle",
    "DonnÃ©es mÃ©tier": "Données métier",
    "SynchronisÃ©": "Données à jour",
    "Aucune donnÃ©e": "Aucune donnée",
    "PrÃ©cÃ©dent": "Précédent",
    "gÃ©nÃ©rÃ©e": "générée",
    "connectÃ©": "connecté",
    "mÃ©tier": "métier",
    "MÃ©tier": "Métier",
    "Ã©lÃ©ments": "éléments",
    "Ã©lÃ©ment": "élément",
    "CrÃ©ation": "Création",
    "crÃ©ation": "création",
    "DÃ©tails": "Détails",
    "dÃ©tail": "détail",
    "Ã©": "é",
    "Ã¨": "è",
    "Ã ": "à",
    "Ã´": "ô"
  };

  for (const [bad, good] of Object.entries(replacements)) {
    content = content.split(bad).join(good);
  }

  return content;
}

function ensurePageTypeHelper(content) {
  if (content.includes("function getRuntimePageTypeLabel")) {
    return content;
  }

  const helper = `function getRuntimePageTypeLabel(type: string): string {
  switch (type) {
    case "list":
      return "liste";
    case "create":
      return "création";
    case "edit":
      return "modification";
    case "detail":
      return "fiche";
    default:
      return type;
  }
}

interface ERPRuntimePageProps {`;

  return content.replace(
    /interface\s+ERPRuntimePageProps\s*\{/,
    helper
  );
}

function fixRuntimePage() {
  let content = read(pagePath);

  content = ensurePageTypeHelper(content);

  content = content.replace(
    /const\s+resolvedTitle\s*=\s*title\s*\?\?\s*`[^`]*`\s*;/,
    "const resolvedTitle =\n    title ?? `${moduleLabel} — ${getRuntimePageTypeLabel(type)}`;"
  );

  content = content.replace(
    /const\s+pageTitle\s*=\s*title\s*\?\?\s*`[^`]*`\s*;/,
    "const pageTitle =\n    title ?? `${moduleLabel} — ${getRuntimePageTypeLabel(type)}`;"
  );

  content = content.replace(
    /const\s+runtimeActions\s*=\s*RuntimeActionEngine\.getAvailableActions\(\{[\s\S]*?\}\);/,
    `const runtimeActions =
    type === "detail" && record
      ? RuntimeActionEngine.getAvailableActions({
          actions: module?.actions ?? [],
          userPermissions: ["*"],
          workflow: module?.workflows?.[0],
          record,
        })
      : [];`
  );

  content = content.replace(
    "{runtimeActions.length > 0 && (",
    '{type !== "list" && runtimeActions.length > 0 && ('
  );

  content = content.replace(
    '{type !== "list" && type !== "list" && runtimeActions.length > 0 && (',
    '{type !== "list" && runtimeActions.length > 0 && ('
  );

  content = fixEncoding(content);

  write(pagePath, content);

  console.log("OK - ERPRuntimePage.tsx corrigé");
}

function fixRuntimeTable() {
  let content = read(tablePath);

  content = content.replace(
    "`/${module.metadata.key}/${id}`",
    "`/${module.metadata.key}/${id}/edit`"
  );

  content = content.replace(
    'title="Cliquer pour ouvrir la fiche"',
    'title="Cliquer pour modifier"'
  );

  content = fixEncoding(content);

  write(tablePath, content);

  console.log("OK - ERPRuntimeTable.tsx corrigé");
}

function verify() {
  const page = read(pagePath);
  const table = read(tablePath);

  console.log("\n=== Vérification ERPRuntimePage.tsx ===");

  [
    "getRuntimePageTypeLabel",
    "`${moduleLabel} — ${getRuntimePageTypeLabel(type)}`",
    'type === "detail" && record',
    'type !== "list" && runtimeActions.length > 0'
  ].forEach((check) => {
    console.log(`${check} : ${page.includes(check) ? "OK" : "KO"}`);
  });

  console.log("\n=== Vérification ERPRuntimeTable.tsx ===");

  [
    "Liste opérationnelle",
    "Données métier",
    "Données à jour",
    "`/${module.metadata.key}/${id}/edit`",
    'title="Cliquer pour modifier"'
  ].forEach((check) => {
    console.log(`${check} : ${table.includes(check) ? "OK" : "KO"}`);
  });

  console.log("\n=== Encodage restant ===");

  ["â€”", "SynchronisÃ©", "DonnÃ©es", "PrÃ©cÃ©dent"].forEach((bad) => {
    const found = page.includes(bad) || table.includes(bad);
    console.log(`${bad} : ${found ? "KO" : "OK"}`);
  });
}

fixRuntimePage();
fixRuntimeTable();
verify();

console.log("\nTerminé.");
console.log('Lance maintenant : Remove-Item -Recurse -Force ".\\.next" -ErrorAction SilentlyContinue');
console.log("Puis : pnpm build");