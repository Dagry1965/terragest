/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const AUDIT_ID = "Q22E-9M-A";

const REPORT = path.join(
  ROOT,
  "docs",
  "audits",
  "Q22E-9M-A-scheduling-slot-policy-readiness-audit.md"
);

const SEARCH_DIRS = [
  "src/runtime/scheduling",
  "src/runtime/scheduling/settings",
  "src/components/erp/scheduling",
  "src/runtime/modules/generated/rendezvous",
  "src/runtime/guards",
];

const TARGETS = [
  {
    key: "durationMinutes",
    layer: "SchedulingSlotPolicy / Settings",
    expected: "Duration must be resolved by policy/settings before slot generation.",
  },
  {
    key: "bufferMinutes",
    layer: "SchedulingSlotPolicy / Engine",
    expected: "Buffer must be applied by policy, not by view.",
  },
  {
    key: "capacity",
    layer: "SchedulingSlotPolicy / Engine + Guard",
    expected: "Capacity must be calculated by engine and protected by guard.",
  },
  {
    key: "DEFAULT_NON_BLOCKING_SCHEDULING_STATUSES",
    layer: "Scheduling status policy",
    expected: "Non-blocking statuses should become policy/config.",
  },
  {
    key: "isNonBlockingSchedulingRecord",
    layer: "Scheduling status policy",
    expected: "Should be kept generic and later driven by config.",
  },
  {
    key: "opening",
    layer: "Settings / Resolver / Policy",
    expected: "Opening hours must come from settings/resolver.",
  },
  {
    key: "closing",
    layer: "Settings / Resolver / Policy",
    expected: "Closing hours must come from settings/resolver.",
  },
  {
    key: "break",
    layer: "Settings / Resolver / Policy",
    expected: "Breaks/pauses must come from settings/resolver.",
  },
  {
    key: "pause",
    layer: "Settings / Resolver / Policy",
    expected: "Breaks/pauses must come from settings/resolver.",
  },
  {
    key: "getAvailableSlotsForDate",
    layer: "RuntimeSchedulingEngine / Policy consumer",
    expected: "Engine can orchestrate but policy should own slot rules.",
  },
  {
    key: "RuntimeOpeningHours",
    layer: "Opening hours policy",
    expected: "Check whether this should be consumed by SchedulingSlotPolicy.",
  },
];

function rel(filePath) {
  return path.relative(ROOT, filePath).split(path.sep).join("/");
}

function walk(dir) {
  const base = path.join(ROOT, dir);
  if (!fs.existsSync(base)) return [];

  const files = [];

  function visit(current) {
    if (
      current.includes(`${path.sep}node_modules${path.sep}`) ||
      current.includes(`${path.sep}.next${path.sep}`) ||
      current.includes(`${path.sep}.git${path.sep}`) ||
      current.includes(`${path.sep}coverage${path.sep}`)
    ) {
      return;
    }

    const stat = fs.statSync(current);

    if (stat.isDirectory()) {
      for (const child of fs.readdirSync(current)) {
        visit(path.join(current, child));
      }
      return;
    }

    if (/\.(ts|tsx|js|jsx|cjs|mjs)$/.test(current)) {
      files.push(current);
    }
  }

  visit(base);
  return files;
}

function lineInfo(content, index) {
  const before = content.slice(0, index);
  const lineNumber = before.split(/\r?\n/).length;
  const line = content.split(/\r?\n/)[lineNumber - 1] || "";

  return {
    lineNumber,
    line: line.trim(),
  };
}

function classify(file) {
  const normalized = rel(file);

  if (normalized.includes("src/components/erp/scheduling")) {
    return {
      severity: "HIGH",
      zone: "UI / Vue",
      decision:
        "À vérifier fortement : la vue ne doit pas calculer duration/buffer/capacity/slots.",
    };
  }

  if (normalized.includes("src/runtime/scheduling/settings")) {
    return {
      severity: "INFO",
      zone: "Settings / Resolver",
      decision:
        "Probablement correct si cela configure ou résout une policy.",
    };
  }

  if (normalized.includes("src/runtime/scheduling/RuntimeSchedulingEngine.ts")) {
    return {
      severity: "REVIEW",
      zone: "Engine",
      decision:
        "Acceptable si orchestration générique, à extraire si règle policy dispersée.",
    };
  }

  if (normalized.includes("src/runtime/scheduling/RuntimeOpeningHours.ts")) {
    return {
      severity: "REVIEW",
      zone: "OpeningHours",
      decision:
        "À intégrer ou consommer par SchedulingSlotPolicy.",
    };
  }

  if (normalized.includes("src/runtime/modules/generated/rendezvous")) {
    return {
      severity: "INFO",
      zone: "Module metadata",
      decision:
        "Acceptable si déclaration metadata consommateur.",
    };
  }

  if (normalized.includes("src/runtime/guards")) {
    return {
      severity: "REVIEW",
      zone: "Guard",
      decision:
        "La protection écriture doit rester guard, pas UI.",
    };
  }

  return {
    severity: "INFO",
    zone: "Other",
    decision: "À vérifier selon contexte.",
  };
}

const findings = [];

for (const file of SEARCH_DIRS.flatMap(walk)) {
  const content = fs.readFileSync(file, "utf8");

  for (const target of TARGETS) {
    const regex = new RegExp(
      target.key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
      "gi"
    );

    let match;
    while ((match = regex.exec(content)) !== null) {
      const info = lineInfo(content, match.index);
      const classification = classify(file);

      findings.push({
        target: target.key,
        expectedLayer: target.layer,
        expected: target.expected,
        file: rel(file),
        line: info.lineNumber,
        text: info.line,
        ...classification,
      });

      if (match.index === regex.lastIndex) regex.lastIndex++;
    }
  }
}

const high = findings.filter((f) => f.severity === "HIGH");
const review = findings.filter((f) => f.severity === "REVIEW");
const info = findings.filter((f) => f.severity === "INFO");

function escapeMd(value) {
  return String(value || "")
    .replace(/\|/g, "\\|")
    .replace(/\r?\n/g, " ");
}

function table(rows) {
  if (rows.length === 0) return "_Aucun finding._\n";

  return [
    "| Sévérité | Zone | Cible | Couche attendue | Fichier | Ligne | Extrait | Décision |",
    "|---|---|---|---|---|---:|---|---|",
    ...rows.map(
      (f) =>
        `| ${f.severity} | ${escapeMd(f.zone)} | ${escapeMd(f.target)} | ${escapeMd(f.expectedLayer)} | \`${escapeMd(f.file)}\` | ${f.line} | \`${escapeMd(f.text).slice(0, 180)}\` | ${escapeMd(f.decision)} |`
    ),
  ].join("\n") + "\n";
}

const report = [
  `# ${AUDIT_ID} — SchedulingSlotPolicy readiness audit`,
  "",
  "## Objectif",
  "",
  "Préparer la formalisation d’une `SchedulingSlotPolicy` générique pour duration, buffer, capacity, horaires, pauses, exceptions et statuts non bloquants.",
  "",
  "## Doctrine",
  "",
  "La vue affiche. Le moteur orchestre. La policy porte les règles de slot. Les settings/resolvers fournissent la configuration effective. Les guards protègent les écritures.",
  "",
  "## Résumé",
  "",
  `- Findings : ${findings.length}`,
  `- HIGH : ${high.length}`,
  `- REVIEW : ${review.length}`,
  `- INFO : ${info.length}`,
  "",
  "## Findings HIGH — logique potentiellement dans la vue",
  "",
  table(high),
  "",
  "## Findings REVIEW — à extraire ou confirmer",
  "",
  table(review),
  "",
  "## Findings INFO — metadata/settings probablement acceptables",
  "",
  table(info),
  "",
  "## Décision attendue",
  "",
  "- Ce qui doit devenir `SchedulingSlotPolicy`.",
  "- Ce qui reste dans `RuntimeSchedulingEngine`.",
  "- Ce qui reste dans settings/resolver.",
  "- Ce qui doit être laissé à la vue.",
  "- Ce qui doit être gardé pour une future guard.",
  "",
].join("\n");

fs.mkdirSync(path.dirname(REPORT), { recursive: true });
fs.writeFileSync(REPORT, report, "utf8");

console.log(`[${AUDIT_ID}] DONE`);
console.log(`[FINDINGS] ${findings.length}`);
console.log(`[HIGH] ${high.length}`);
console.log(`[REVIEW] ${review.length}`);
console.log(`[INFO] ${info.length}`);
console.log(`[REPORT] ${rel(REPORT)}`);