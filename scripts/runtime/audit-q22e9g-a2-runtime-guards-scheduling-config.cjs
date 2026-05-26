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

    if (/\.(ts|tsx|js|jsx)$/.test(entry.name)) {
      files.push(full);
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

function print(title, rows) {
  console.log("");
  console.log(`=== ${title} ===`);

  if (!rows.length) {
    console.log("[NONE]");
    return;
  }

  for (const row of rows) {
    console.log(
      `[FOUND] ${row.file}:${row.line} [${row.pattern}] ${row.text}`
    );
  }
}

function main() {
  console.log("");
  console.log("=== Q22E-9G-A2 — Audit runtime guards scheduling config ===");
  console.log("");

  const roots = [
    p("src", "runtime", "guards"),
    p("src", "runtime", "firestore"),
    p("src", "runtime", "scheduling"),
  ];

  const files = roots.flatMap((root) => walk(root));

  if (!files.length) {
    fail("Aucun fichier trouvé dans src/runtime/guards, firestore, scheduling");
  }

  ok(`${files.length} fichiers inspectés`);

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
      label: "RuntimeSchedulingEngine",
      regex: /\bRuntimeSchedulingEngine\b/,
    },
    {
      label: "RuntimeSchedulingSettingsResolver",
      regex: /\bRuntimeSchedulingSettingsResolver\b/,
    },
    {
      label: "blockingStatuses",
      regex: /\bblockingStatuses\b/,
    },
    {
      label: "appointment conflict",
      regex: /conflict|conflit|overlap|créneau|creneau|rendez-vous|rendezvous/i,
    },
  ]);

  print("Occurrences runtime guards / scheduling", occurrences);

  const candidateFiles = Array.from(new Set(occurrences.map((row) => row.file)));

  console.log("");
  console.log("=== Fichiers candidats pour Q22E-9G-B ===");

  if (!candidateFiles.length) {
    console.log("[NONE]");
  } else {
    for (const file of candidateFiles) {
      console.log(`- ${file}`);
    }
  }

  const directScheduling = occurrences.filter(
    (row) => row.pattern === "module.scheduling"
  );

  console.log("");
  console.log("=== Synthèse ===");

  if (directScheduling.length) {
    warn(`${directScheduling.length} lecture(s) directe(s) module.scheduling détectée(s)`);
  } else {
    ok("Aucune lecture directe module.scheduling détectée dans runtime/guards ciblé");
  }

  console.log("");
  console.log("[Q22E9G_A2_AUDIT_OK] Audit ciblé guards terminé.");
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
  console.log("  git status --short");
  console.log("  git add .\\scripts\\runtime\\audit-q22e9g-a2-runtime-guards-scheduling-config.cjs");
  console.log('  git commit -m "test(runtime): audit runtime guards scheduling config"');
  console.log("  git tag q22e9g-a2-runtime-guards-scheduling-config-audit");
}

try {
  main();
} catch (error) {
  console.error("");
  console.error(error.message || error);
  console.error("");
  process.exit(1);
}