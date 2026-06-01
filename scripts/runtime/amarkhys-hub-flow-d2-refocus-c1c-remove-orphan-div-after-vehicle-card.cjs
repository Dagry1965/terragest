const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const TARGET = path.join(
  ROOT,
  "src",
  "components",
  "erp",
  "hub",
  "ERPClientOperationalSheet.tsx"
);

const REPORT = path.join(
  ROOT,
  "docs",
  "audits",
  "AMARKHYS-HUB-FLOW-D2-REFOCUS-C1C-remove-orphan-div-after-vehicle-card.md"
);

const BACKUP = `${TARGET}.bak-c1c-remove-orphan-div-after-vehicle-card`;

function fail(message) {
  console.error(`[FAIL] ${message}`);
  process.exit(1);
}

function ok(message) {
  console.log(`[OK] ${message}`);
}

console.log("[AMARKHYS-HUB-FLOW-D2-REFOCUS-C1C] Remove orphan div after selected vehicle card removal");

if (!fs.existsSync(TARGET)) {
  fail(`Missing target: ${TARGET}`);
}

const before = fs.readFileSync(TARGET, "utf8");

fs.writeFileSync(BACKUP, before, "utf8");
ok(`Backup written: ${path.relative(ROOT, BACKUP)}`);

const exactBrokenPattern = [
  "                        ) : (",
  "                          <EmptyCard>Aucune facture sélectionnée pour afficher les encaissements.</EmptyCard>",
  "                        )}",
  "                    </div>",
  "                </section>",
].join("\n");

const fixedPattern = [
  "                        ) : (",
  "                          <EmptyCard>Aucune facture sélectionnée pour afficher les encaissements.</EmptyCard>",
  "                        )}",
  "                </section>",
].join("\n");

let after = before;

if (after.includes(exactBrokenPattern)) {
  after = after.replace(exactBrokenPattern, fixedPattern);
  ok("Exact orphan div pattern removed.");
} else {
  const relaxedBrokenPattern =
/(\s*\)\s*:\s*\(\s*\n\s*<EmptyCard>Aucune facture sélectionnée pour afficher les encaissements\.<\/EmptyCard>\s*\n\s*\)\}\s*\n)\s*<\/div>\s*\n(\s*<\/section>)/;

  if (!relaxedBrokenPattern.test(after)) {
    fail("Could not find the orphan div pattern after invoice payment empty card.");
  }

  after = after.replace(relaxedBrokenPattern, "$1$2");
  ok("Relaxed orphan div pattern removed.");
}

if (after === before) {
  fail("No change applied.");
}

const forbiddenMarkers = [
  "Véhicule sélectionné",
  "Vehicule sélectionné",
  "Véhicule selectionné",
  "Vehicule selectionné",
];

const checks = [
  [
    "selected vehicle visual card remains removed",
    forbiddenMarkers.every((marker) => !after.includes(marker)),
  ],
  [
    "rdv block preserved",
    after.includes("Choisir un rendez-vous"),
  ],
  [
    "intervention block preserved",
    after.includes("Interventions liées au rendez-vous"),
  ],
  [
    "invoice payment empty card preserved",
    after.includes("Aucune facture sélectionnée pour afficher les encaissements."),
  ],
  [
    "synthese parcours section preserved",
    after.includes('id="parcours-detaille"'),
  ],
  [
    "specific orphan sequence removed",
    !after.includes(exactBrokenPattern),
  ],
];

const okCount = checks.filter(([, passed]) => passed).length;
const failCount = checks.length - okCount;

fs.writeFileSync(TARGET, after, "utf8");
ok(`Written: ${path.relative(ROOT, TARGET)}`);

const report = [
  "# AMARKHYS-HUB-FLOW-D2-REFOCUS-C1C — Remove orphan div after vehicle card removal",
  "",
  `Target: \`${path.relative(ROOT, TARGET)}\``,
  `Backup: \`${path.relative(ROOT, BACKUP)}\``,
  "",
  "## Scope",
  "",
  "- Removed only the orphan `</div>` left after C1/C1B.",
  "- Preserved RDV block.",
  "- Preserved interventions block.",
  "- Preserved invoices/payments area.",
  "- Did not relaunch D2-REFOCUS-B.",
  "",
  "## Checks",
  "",
  ...checks.map(([name, passed]) => `- ${passed ? "OK" : "FAIL"} — ${name}`),
  "",
  `OK: ${okCount}`,
  `FAIL: ${failCount}`,
  "",
].join("\n");

fs.mkdirSync(path.dirname(REPORT), { recursive: true });
fs.writeFileSync(REPORT, report, "utf8");

console.log(`[REPORT] ${path.relative(ROOT, REPORT)}`);
console.log(`[OK] ${okCount}`);
console.log(`[FAIL] ${failCount}`);

if (failCount > 0) {
  process.exit(1);
}

console.log("[AMARKHYS-HUB-FLOW-D2-REFOCUS-C1C] DONE");
console.log("[NEXT] pnpm build");