/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

function p(...parts) {
  return path.join(ROOT, ...parts);
}

function read(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`[MISSING] ${path.relative(ROOT, filePath)}`);
  }

  return fs.readFileSync(filePath, "utf8");
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
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (
        entry.name === ".git" ||
        entry.name === ".next" ||
        entry.name === "node_modules"
      ) {
        continue;
      }

      walk(fullPath, files);
      continue;
    }

    if (
      entry.name.endsWith(".ts") ||
      entry.name.endsWith(".tsx") ||
      entry.name.endsWith(".js") ||
      entry.name.endsWith(".jsx")
    ) {
      files.push(fullPath);
    }
  }

  return files;
}

function findOccurrences(files, patterns) {
  const results = [];

  for (const file of files) {
    const content = fs.readFileSync(file, "utf8");
    const lines = content.split(/\r?\n/);

    lines.forEach((line, index) => {
      for (const pattern of patterns) {
        if (pattern.regex.test(line)) {
          results.push({
            file: path.relative(ROOT, file),
            line: index + 1,
            pattern: pattern.label,
            text: line.trim(),
          });
        }
      }
    });
  }

  return results;
}

function printOccurrences(title, occurrences) {
  console.log("");
  console.log(`=== ${title} ===`);

  if (!occurrences.length) {
    console.log("[NONE]");
    return;
  }

  for (const occurrence of occurrences) {
    console.log(
      `[FOUND] ${occurrence.file}:${occurrence.line} [${occurrence.pattern}] ${occurrence.text}`
    );
  }
}

function scanTargetBackups() {
  const targets = [
    p("src", "runtime", "business-rules"),
    p("src", "runtime", "scheduling"),
    p("src", "runtime", "firestore"),
    p("src", "runtime", "modules"),
    p("scripts", "runtime"),
  ];

  const suspicious = [];

  function scan(dir) {
    if (!fs.existsSync(dir)) return;

    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        if (
          entry.name === ".git" ||
          entry.name === ".next" ||
          entry.name === "node_modules"
        ) {
          continue;
        }

        scan(fullPath);
        continue;
      }

      if (
        entry.name.includes(".bak") ||
        entry.name.endsWith(".tmp") ||
        entry.name.endsWith("~")
      ) {
        suspicious.push(path.relative(ROOT, fullPath));
      }
    }
  }

  for (const target of targets) {
    scan(target);
  }

  if (suspicious.length) {
    warn(
      `Backups/fichiers temporaires détectés dans zones ciblées :\n${suspicious
        .map((item) => `  - ${item}`)
        .join("\n")}`
    );
    return;
  }

  ok("Aucun backup/temporaire détecté dans les zones ciblées Q22E-9G-A");
}

function main() {
  console.log("");
  console.log("=== Q22E-9G-A — Audit scheduling guards effective config ===");
  console.log("");

  const resolverPath = p(
    "src",
    "runtime",
    "scheduling",
    "settings",
    "RuntimeSchedulingSettingsResolver.ts"
  );

  read(resolverPath);
  ok("RuntimeSchedulingSettingsResolver existe");

  const searchRoots = [
    p("src", "runtime", "business-rules"),
    p("src", "runtime", "scheduling"),
    p("src", "runtime", "firestore"),
    p("src", "runtime", "modules"),
  ];

  const files = searchRoots.flatMap((dir) => walk(dir));
  ok(`${files.length} fichiers runtime inspectables trouvés`);

  const occurrences = findOccurrences(files, [
    {
      label: "processRuntimeBeforeMutationGuards",
      regex: /\bprocessRuntimeBeforeMutationGuards\b/,
    },
    {
      label: "module.scheduling",
      regex: /\bmodule\.scheduling\b/,
    },
    {
      label: "schedulingConfig",
      regex: /\bschedulingConfig\b/,
    },
    {
      label: "blockingStatuses",
      regex: /\bblockingStatuses\b/,
    },
    {
      label: "RuntimeSchedulingEngine",
      regex: /\bRuntimeSchedulingEngine\b/,
    },
    {
      label: "RuntimeSchedulingSettingsResolver",
      regex: /\bRuntimeSchedulingSettingsResolver\b/,
    },
    {
      label: "conflit",
      regex: /conflit|conflict|overlap|créneau|creneau/i,
    },
  ]);

  const guardRelated = occurrences.filter((item) =>
    /guard|business-rules|mutation|scheduling|firestore/i.test(item.file) ||
    /processRuntimeBeforeMutationGuards|blockingStatuses|conflit|conflict|overlap|créneau|creneau/i.test(item.text)
  );

  const directModuleScheduling = guardRelated.filter(
    (item) => item.pattern === "module.scheduling"
  );

  printOccurrences("Occurrences guards/scheduling candidates", guardRelated);

  console.log("");
  console.log("=== Synthèse ===");

  if (!guardRelated.length) {
    warn("Aucune occurrence guard/scheduling détectée.");
  } else {
    ok(`${guardRelated.length} occurrence(s) guard/scheduling détectée(s)`);
  }

  if (directModuleScheduling.length) {
    warn(
      `${directModuleScheduling.length} lecture(s) directe(s) module.scheduling détectée(s) côté guards/runtime`
    );
  } else {
    ok("Aucune lecture directe module.scheduling détectée côté guards/runtime");
  }

  const candidateFiles = Array.from(
    new Set(guardRelated.map((item) => item.file))
  );

  console.log("");
  console.log("=== Fichiers candidats pour Q22E-9G-B ===");

  if (!candidateFiles.length) {
    console.log("[NONE]");
  } else {
    for (const file of candidateFiles) {
      console.log(`- ${file}`);
    }
  }

  console.log("");
  console.log("=== Vérification backups ciblés ===");
  scanTargetBackups();

  console.log("");
  console.log("[Q22E9G_A_AUDIT_OK] Audit guards/config effective terminé.");
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
  console.log("  git status --short");
  console.log("  git add .\\scripts\\runtime\\audit-q22e9g-a-scheduling-guards-effective-config.cjs");
  console.log('  git commit -m "test(runtime): audit scheduling guards effective config"');
  console.log("  git tag q22e9g-a-scheduling-guards-effective-config-audit");
  console.log("  git status --short");
  console.log("  git log --oneline -10");
}

try {
  main();
} catch (error) {
  console.error("");
  console.error(error.message || error);
  console.error("");
  process.exit(1);
}