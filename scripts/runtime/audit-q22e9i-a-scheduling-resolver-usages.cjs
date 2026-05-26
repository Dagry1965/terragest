/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

function p(...parts) {
  return path.join(ROOT, ...parts);
}

function ok(message) {
  console.log(`[OK] ${message}`);
}

function warn(message) {
  console.warn(`[WARN] ${message}`);
}

function fail(message) {
  throw new Error(`[FAIL] ${message}`);
}

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if ([".git", ".next", "node_modules"].includes(entry.name)) continue;
      walk(full, files);
      continue;
    }

    if (/\.(ts|tsx|js|jsx|cjs|mjs)$/.test(entry.name)) {
      files.push(full);
    }
  }

  return files;
}

function findOccurrences(files, patterns) {
  const rows = [];

  for (const file of files) {
    const content = fs.readFileSync(file, "utf8");
    const lines = content.split(/\r?\n/);

    lines.forEach((line, index) => {
      for (const pattern of patterns) {
        if (pattern.regex.test(line)) {
          rows.push({
            file: path.relative(ROOT, file),
            line: index + 1,
            pattern: pattern.label,
            text: line.trim(),
          });
        }
      }
    });
  }

  return rows;
}

function print(title, rows) {
  console.log("");
  console.log(`=== ${title} ===`);

  if (!rows.length) {
    console.log("[NONE]");
    return;
  }

  for (const row of rows) {
    console.log(`[FOUND] ${row.file}:${row.line} [${row.pattern}] ${row.text}`);
  }
}

function main() {
  console.log("");
  console.log("=== Q22E-9I-A — Audit scheduling resolver usages ===");
  console.log("");

  const roots = [
    p("src", "runtime"),
    p("src", "components"),
    p("src", "app"),
    p("scripts", "runtime"),
  ];

  const files = roots.flatMap((root) => walk(root));

  if (!files.length) {
    fail("Aucun fichier inspectable trouvé");
  }

  ok(`${files.length} fichiers inspectés`);

  const occurrences = findOccurrences(files, [
    {
      label: "Resolver import",
      regex: /RuntimeSchedulingSettingsResolver/,
    },
    {
      label: "Resolver.resolve",
      regex: /RuntimeSchedulingSettingsResolver\.resolve\s*\(/,
    },
    {
      label: "Resolver.loadAndResolve",
      regex: /RuntimeSchedulingSettingsResolver\.loadAndResolve\s*\(/,
    },
    {
      label: "Repository usage",
      regex: /RuntimeSchedulingSettingsRepository/,
    },
    {
      label: "runtimeFirestore",
      regex: /runtimeFirestore|getDoc|setDoc|collection\(/,
    },
    {
      label: "use client",
      regex: /^["']use client["'];/,
    },
    {
      label: "planning",
      regex: /ERPSchedulingPlanningView|Planning|planning/i,
    },
    {
      label: "guards",
      regex: /processRuntimeBeforeMutationGuards|guardRendezvousMutation/i,
    },
  ]);

  const resolverUsages = occurrences.filter((row) =>
    /RuntimeSchedulingSettingsResolver|RuntimeSchedulingSettingsRepository|processRuntimeBeforeMutationGuards|ERPSchedulingPlanningView/i.test(
      row.text
    ) ||
    /scheduling|guards|planning|settings/i.test(row.file)
  );

  print("Usages resolver / repository / scheduling settings", resolverUsages);

  const resolveFiles = Array.from(
    new Set(
      resolverUsages
        .filter((row) => row.pattern === "Resolver.resolve")
        .map((row) => row.file)
    )
  );

  const loadAndResolveFiles = Array.from(
    new Set(
      resolverUsages
        .filter((row) => row.pattern === "Resolver.loadAndResolve")
        .map((row) => row.file)
    )
  );

  const repositoryFiles = Array.from(
    new Set(
      resolverUsages
        .filter((row) => row.pattern === "Repository usage")
        .map((row) => row.file)
    )
  );

  console.log("");
  console.log("=== Synthèse ===");

  if (resolveFiles.length) {
    ok(`Resolver.resolve() utilisé dans ${resolveFiles.length} fichier(s)`);
    for (const file of resolveFiles) console.log(`- ${file}`);
  } else {
    warn("Aucun usage RuntimeSchedulingSettingsResolver.resolve() détecté");
  }

  console.log("");

  if (loadAndResolveFiles.length) {
    ok(`Resolver.loadAndResolve() déjà utilisé dans ${loadAndResolveFiles.length} fichier(s)`);
    for (const file of loadAndResolveFiles) console.log(`- ${file}`);
  } else {
    warn("Aucun usage RuntimeSchedulingSettingsResolver.loadAndResolve() détecté");
  }

  console.log("");

  if (repositoryFiles.length) {
    ok(`Repository référencé dans ${repositoryFiles.length} fichier(s)`);
    for (const file of repositoryFiles) console.log(`- ${file}`);
  } else {
    warn("Aucun usage RuntimeSchedulingSettingsRepository détecté hors repository/resolver/scripts");
  }

  console.log("");
  console.log("=== Recommandation Q22E-9I-B ===");
  console.log("- Ne pas brancher loadAndResolve() dans un composant client.");
  console.log("- Planning client actuel doit rester sur resolve() tant qu’aucun loader server n’est en place.");
  console.log("- Guards/mutations runtime peuvent évoluer vers loadAndResolve() si contexte tenant/workspace/module est fiable.");
  console.log("- Vérifier FirestoreRuntimeMutation pour tenantId/workspaceId avant branchement persisted settings.");
  console.log("");
  console.log("[Q22E9I_A_AUDIT_OK] Audit usages resolver terminé.");
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
  console.log("  git status --short");
  console.log("  git add .\\scripts\\runtime\\audit-q22e9i-a-scheduling-resolver-usages.cjs");
  console.log('  git commit -m "test(runtime): audit scheduling resolver usages"');
  console.log("  git tag q22e9i-a-scheduling-resolver-usages-audit");
}

try {
  main();
} catch (error) {
  console.error("");
  console.error(error.message || error);
  console.error("");
  process.exit(1);
}