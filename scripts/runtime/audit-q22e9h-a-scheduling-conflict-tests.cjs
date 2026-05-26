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
    console.log(`[FOUND] ${row.file}:${row.line} [${row.pattern}] ${row.text}`);
  }
}

function main() {
  console.log("");
  console.log("=== Q22E-9H-A — Audit scheduling conflict tests ===");
  console.log("");

  const roots = [
    p("scripts", "runtime"),
    p("tests"),
    p("src", "runtime"),
    p("src", "components", "erp", "scheduling"),
  ];

  const files = roots.flatMap((root) => walk(root));
  if (!files.length) {
    fail("Aucun fichier inspectable trouvé");
  }

  ok(`${files.length} fichiers inspectés`);

  const occurrences = findOccurrences(files, [
    {
      label: "assertNoAppointmentConflict",
      regex: /\bassertNoAppointmentConflict\b/,
    },
    {
      label: "assertWithinOpeningHours",
      regex: /\bassertWithinOpeningHours\b/,
    },
    {
      label: "getAvailableSlotsWithBookings",
      regex: /\bgetAvailableSlotsWithBookings\b/,
    },
    {
      label: "processRuntimeBeforeMutationGuards",
      regex: /\bprocessRuntimeBeforeMutationGuards\b/,
    },
    {
      label: "conflit planning",
      regex: /conflit|conflict|overlap|créneau|creneau|rendez-vous|rendezvous/i,
    },
    {
      label: "RuntimeSchedulingSettingsResolver",
      regex: /\bRuntimeSchedulingSettingsResolver\b/,
    },
    {
      label: "q22",
      regex: /q22e9|scheduling|planning/i,
    },
  ]);

  const relevant = occurrences.filter((row) =>
    /scheduling|planning|rendezvous|guard|mutation|runtime|test|audit/i.test(row.file) ||
    /assertNoAppointmentConflict|processRuntimeBeforeMutationGuards|conflit|conflict|créneau|creneau/i.test(row.text)
  );

  print("Occurrences conflit planning / tests existants", relevant);

  const candidateFiles = Array.from(new Set(relevant.map((row) => row.file)));

  console.log("");
  console.log("=== Fichiers candidats à réutiliser pour Q22E-9H-B ===");

  if (!candidateFiles.length) {
    console.log("[NONE]");
  } else {
    for (const file of candidateFiles) {
      console.log(`- ${file}`);
    }
  }

  console.log("");
  if (candidateFiles.some((file) => /test|audit|conflict|conflit|scheduling|planning/i.test(file))) {
    ok("Des scripts/tests candidats existent probablement");
  } else {
    warn("Aucun script de test conflit planning évident : prévoir un script dédié Q22E-9H-B");
  }

  console.log("");
  console.log("[Q22E9H_A_AUDIT_OK] Audit tests conflit planning terminé.");
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
  console.log("  git status --short");
  console.log("  git add .\\scripts\\runtime\\audit-q22e9h-a-scheduling-conflict-tests.cjs");
  console.log('  git commit -m "test(runtime): audit scheduling conflict tests"');
  console.log("  git tag q22e9h-a-scheduling-conflict-tests-audit");
}

try {
  main();
} catch (error) {
  console.error("");
  console.error(error.message || error);
  console.error("");
  process.exit(1);
}