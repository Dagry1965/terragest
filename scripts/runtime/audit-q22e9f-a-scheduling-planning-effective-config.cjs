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

function scanBackups() {
  const targets = [
    p("src", "runtime", "scheduling"),
    p("src", "components"),
    p("src", "app"),
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
    fail(
      `Backups/fichiers temporaires détectés :\n${suspicious
        .map((item) => `  - ${item}`)
        .join("\n")}`
    );
  }

  ok("Aucun backup/temporaire détecté dans les zones scheduling/app/components/scripts");
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

function main() {
  console.log("");
  console.log("=== Q22E-9F-A — Audit planning effective scheduling config ===");
  console.log("");

  const settingsResolverPath = p(
    "src",
    "runtime",
    "scheduling",
    "settings",
    "RuntimeSchedulingSettingsResolver.ts"
  );

  const planningCandidates = [
    p("src", "runtime", "scheduling"),
    p("src", "components"),
    p("src", "app"),
  ];

  read(settingsResolverPath);
  ok("RuntimeSchedulingSettingsResolver existe");

  const files = planningCandidates.flatMap((dir) => walk(dir));
  ok(`${files.length} fichiers inspectables trouvés`);

  const schedulingReads = findOccurrences(files, [
    {
      label: "module.scheduling",
      regex: /\bmodule\.scheduling\b/,
    },
    {
      label: "scheduling.enabled",
      regex: /\bscheduling\.enabled\b/,
    },
    {
      label: "moduleScheduling",
      regex: /\bmoduleScheduling\b/,
    },
    {
      label: "RuntimeSchedulingSettingsResolver",
      regex: /\bRuntimeSchedulingSettingsResolver\b/,
    },
    {
      label: "RuntimeSchedulingSettingsEngine",
      regex: /\bRuntimeSchedulingSettingsEngine\b/,
    },
  ]);

  const planningViews = schedulingReads.filter((item) =>
    /Scheduling|Planning|rendezvous|planning/i.test(item.file)
  );

  const directModuleSchedulingInPlanning = planningViews.filter(
    (item) => item.pattern === "module.scheduling"
  );

  printOccurrences("Lectures scheduling liées au planning", planningViews);

  console.log("");
  console.log("=== Synthèse ===");

  if (!planningViews.length) {
    warn("Aucune lecture scheduling liée au planning détectée.");
  } else {
    ok(`${planningViews.length} occurrence(s) scheduling/planning détectée(s)`);
  }

  if (directModuleSchedulingInPlanning.length) {
    warn(
      `${directModuleSchedulingInPlanning.length} lecture(s) directe(s) module.scheduling dans le planning à remplacer progressivement par RuntimeSchedulingSettingsResolver`
    );
  } else {
    ok("Aucune lecture directe module.scheduling détectée dans les fichiers planning");
  }

  const likelyPlanningFiles = Array.from(
    new Set(planningViews.map((item) => item.file))
  );

  console.log("");
  console.log("=== Fichiers candidats pour Q22E-9F-B ===");

  if (!likelyPlanningFiles.length) {
    console.log("[NONE]");
  } else {
    for (const file of likelyPlanningFiles) {
      console.log(`- ${file}`);
    }
  }

  console.log("");
  console.log("=== Vérification backups ===");
  scanBackups();

  console.log("");
  console.log("[Q22E9F_A_AUDIT_OK] Audit planning/config effective terminé.");
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
  console.log("  git status --short");
  console.log("  git add .\\scripts\\runtime\\audit-q22e9f-a-scheduling-planning-effective-config.cjs");
  console.log('  git commit -m "test(runtime): audit scheduling planning effective config"');
  console.log("  git tag q22e9f-a-scheduling-planning-effective-config-audit");
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