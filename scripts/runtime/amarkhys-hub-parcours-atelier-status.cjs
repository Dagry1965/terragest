const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const TARGET = path.join(ROOT, "src", "components", "erp", "hub", "ERPClientOperationalSheet.tsx");
const REPORT = path.join(ROOT, "docs", "audits", "AMARKHYS-HUB-PARCOURS-ATELIER-STATUS.md");
const BACKUP = `${TARGET}.bak-parcours-atelier-status`;

function fail(message) {
  console.error(`[FAIL] ${message}`);
  process.exit(1);
}

function ok(message) {
  console.log(`[OK] ${message}`);
}

function write(file, content) {
  fs.writeFileSync(file, content, { encoding: "utf8" });
}

console.log("[AMARKHYS-HUB-PARCOURS-ATELIER-STATUS] Install synthetic workshop journey status");

if (!fs.existsSync(TARGET)) {
  fail(`Missing target: ${TARGET}`);
}

const before = fs.readFileSync(TARGET, "utf8");
write(BACKUP, before);
ok(`Backup written: ${path.relative(ROOT, BACKUP)}`);

let after = before;

const requiredMarkers = [
  "const selectedRendezvous = useMemo(() => {",
  "const selectedIntervention = useMemo(() => {",
  "const facturesForSelectedIntervention = useMemo(() => {",
  "const encaissements = relatedRecordsBySection.encaissements ?? [];",
  'SectionTitle title="PARCOURS OPÉRATIONNEL',
];

for (const marker of requiredMarkers) {
  if (!after.includes(marker)) {
    fail(`Missing marker before patch: ${marker}`);
  }
}

/**
 * 1. Add computed status memo before isCardMode.
 */
if (!after.includes("const parcoursAtelierStatus = useMemo(() => {")) {
  const anchor = '  const isCardMode = !["flotte", "entreprise"].includes(clientType.toLowerCase());';

  const statusMemo = `  const parcoursAtelierStatus = useMemo(() => {
    const normalize = (value: string) =>
      value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\\u0300-\\u036f]/g, "");

    const rdvStatus = normalize(text(selectedRendezvous, ["statut", "status"], ""));
    const interventionStatus = normalize(text(selectedIntervention, ["statut", "status"], ""));
    const invoiceIds = new Set(facturesForSelectedIntervention.map((facture) => recordId(facture)));

    const paymentsForSelectedIntervention = encaissements.filter((encaissement) => {
      const factureId = String(
        encaissement.factureId ??
          encaissement.invoiceId ??
          encaissement.factureAutoId ??
          ""
      );

      return (
        invoiceIds.has(factureId) ||
        String(encaissement.interventionId ?? "") === recordId(selectedIntervention)
      );
    });

    const invoiceTotal = facturesForSelectedIntervention.reduce((total, facture) => {
      return total + numberValue(facture, ["montantTTC", "totalTTC", "montantTotal", "total", "montant"]);
    }, 0);

    const explicitRemaining = facturesForSelectedIntervention.reduce((total, facture) => {
      return total + numberValue(facture, ["resteAPayer", "solde", "montantRestant"]);
    }, 0);

    const paidTotal = paymentsForSelectedIntervention.reduce((total, encaissement) => {
      return total + numberValue(encaissement, ["montantEncaisse", "montant", "amount"]);
    }, 0);

    const remainingAmount =
      explicitRemaining > 0
        ? explicitRemaining
        : Math.max(invoiceTotal - paidTotal, 0);

    const hasRdv = Boolean(selectedRendezvous);
    const hasIntervention = Boolean(selectedIntervention);
    const hasInvoice = facturesForSelectedIntervention.length > 0;
    const hasPayment = paymentsForSelectedIntervention.length > 0;

    let label = "Aucun parcours sélectionné";
    let description = "Sélectionnez un rendez-vous pour lire le parcours atelier.";
    let tone = "slate";
    let nextAction = "Choisir un rendez-vous";

    if (hasRdv) {
      label = "RDV planifié";
      description = "Le rendez-vous est identifié. L'intervention reste à suivre.";
      tone = "blue";
      nextAction = "Suivre l'intervention";
    }

    if (rdvStatus.includes("annul")) {
      label = "Parcours annulé";
      description = "Le rendez-vous est annulé. Aucune suite atelier active n'est attendue.";
      tone = "rose";
      nextAction = "Replanifier si nécessaire";
    } else if (hasRdv && hasIntervention) {
      label = "Intervention en cours";
      description = "Une intervention est rattachée au rendez-vous sélectionné.";
      tone = "amber";
      nextAction = "Suivre les travaux";

      if (
        interventionStatus.includes("terminee") ||
        interventionStatus.includes("facturee") ||
        interventionStatus.includes("termin")
      ) {
        label = "Intervention terminée";
        description = "Les travaux sont terminés. La facturation ou le paiement doit être vérifié.";
        tone = "emerald";
        nextAction = "Vérifier la facture";
      }
    }

    if (hasInvoice) {
      label = "Facturé à encaisser";
      description = "Une facture est rattachée à l'intervention. Le règlement reste à contrôler.";
      tone = "orange";
      nextAction = "Suivre le paiement";

      if (hasPayment && remainingAmount > 0) {
        label = "Paiement partiel";
        description = \`\${money(remainingAmount)} restent à encaisser sur ce parcours.\`;
        tone = "orange";
        nextAction = "Relancer ou encaisser le solde";
      }

      if (remainingAmount <= 0 && invoiceTotal > 0) {
        label = "Parcours soldé";
        description = "Le parcours atelier est facturé et soldé.";
        tone = "emerald";
        nextAction = "Dossier clôturé";
      }
    }

    const toneClass =
      tone === "emerald"
        ? "bg-emerald-50 text-emerald-800 ring-emerald-200"
        : tone === "orange"
          ? "bg-orange-50 text-orange-800 ring-orange-200"
          : tone === "amber"
            ? "bg-amber-50 text-amber-800 ring-amber-200"
            : tone === "rose"
              ? "bg-rose-50 text-rose-800 ring-rose-200"
              : tone === "blue"
                ? "bg-blue-50 text-blue-800 ring-blue-200"
                : "bg-slate-50 text-slate-700 ring-slate-200";

    return {
      label,
      description,
      nextAction,
      toneClass,
      remainingAmount,
      steps: [
        {
          label: "RDV",
          done: hasRdv,
          value: text(selectedRendezvous, ["statut", "status"], hasRdv ? "suivi" : "à sélectionner"),
        },
        {
          label: "Intervention",
          done: hasIntervention,
          value: text(selectedIntervention, ["statut", "status"], hasIntervention ? "suivi" : "non créée"),
        },
        {
          label: "Facture",
          done: hasInvoice,
          value: hasInvoice ? \`\${facturesForSelectedIntervention.length} facture(s)\` : "non émise",
        },
        {
          label: "Paiement",
          done: hasPayment || (hasInvoice && remainingAmount <= 0 && invoiceTotal > 0),
          value:
            hasInvoice && remainingAmount <= 0 && invoiceTotal > 0
              ? "soldé"
              : hasPayment
                ? \`\${money(paidTotal)} encaissé(s)\`
                : "à encaisser",
        },
      ],
    };
  }, [
    selectedRendezvous,
    selectedIntervention,
    facturesForSelectedIntervention,
    encaissements,
  ]);

  const isCardMode = !["flotte", "entreprise"].includes(clientType.toLowerCase());`;

  if (!after.includes(anchor)) {
    fail("Could not find isCardMode anchor.");
  }

  after = after.replace(anchor, statusMemo);
}

/**
 * 2. Add status banner after PARCOURS OPÉRATIONNEL title.
 */
if (!after.includes('data-amarkhys-parcours-atelier-status="SUMMARY"')) {
  const sectionAnchor = `                <SectionTitle title="PARCOURS OPÉRATIONNEL : CLIENT → VÉHICULE → RENDEZ-VOUS → INTERVENTION → FACTURE" />`;

  const banner = `                <SectionTitle title="PARCOURS OPÉRATIONNEL : CLIENT → VÉHICULE → RENDEZ-VOUS → INTERVENTION → FACTURE" />

                <div
                  data-amarkhys-parcours-atelier-status="SUMMARY"
                  className="mb-6 rounded-[1.75rem] bg-white p-5 shadow-sm ring-1 ring-slate-200"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                        Statut synthétique du parcours atelier
                      </p>

                      <div className="mt-3 flex flex-wrap items-center gap-3">
                        <span
                          className={[
                            "rounded-full px-4 py-2 text-sm font-black ring-1",
                            parcoursAtelierStatus.toneClass,
                          ].join(" ")}
                        >
                          {parcoursAtelierStatus.label}
                        </span>

                        <span className="text-sm font-semibold text-slate-600">
                          {parcoursAtelierStatus.nextAction}
                        </span>
                      </div>

                      <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-600">
                        {parcoursAtelierStatus.description}
                      </p>
                    </div>

                    <div className="grid min-w-[360px] flex-1 gap-3 sm:grid-cols-4">
                      {parcoursAtelierStatus.steps.map((step) => (
                        <div
                          key={step.label}
                          className={[
                            "rounded-2xl p-4 ring-1",
                            step.done
                              ? "bg-emerald-50 text-emerald-800 ring-emerald-200"
                              : "bg-slate-50 text-slate-500 ring-slate-200",
                          ].join(" ")}
                        >
                          <p className="text-[10px] font-black uppercase tracking-wide">
                            {step.label}
                          </p>
                          <p className="mt-2 text-sm font-bold">
                            {step.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>`;

  if (!after.includes(sectionAnchor)) {
    fail("Could not find PARCOURS OPÉRATIONNEL SectionTitle anchor.");
  }

  after = after.replace(sectionAnchor, banner);
}

const checks = [
  ["component changed", after !== before],
  ["status memo added", after.includes("const parcoursAtelierStatus = useMemo")],
  ["status banner added", after.includes('data-amarkhys-parcours-atelier-status="SUMMARY"')],
  ["RDV step added", after.includes('label: "RDV"')],
  ["intervention step added", after.includes('label: "Intervention"')],
  ["invoice step added", after.includes('label: "Facture"')],
  ["payment step added", after.includes('label: "Paiement"')],
  ["sold status added", after.includes("Parcours soldé")],
  ["partial payment status added", after.includes("Paiement partiel")],
  ["rdv modal preserved", after.includes("RENDEZVOUS_DETAIL_MODAL")],
  ["intervention block preserved", after.includes("Interventions liées au rendez-vous")],
];

const okCount = checks.filter(([, passed]) => passed).length;
const failCount = checks.length - okCount;

if (failCount > 0) {
  const failed = checks
    .filter(([, passed]) => !passed)
    .map(([name]) => name)
    .join(", ");
  fail(`Checks failed before write: ${failed}`);
}

write(TARGET, after);
ok(`Written: ${path.relative(ROOT, TARGET)}`);

const report = [
  "# AMARKHYS-HUB-PARCOURS-ATELIER-STATUS",
  "",
  `Target: \`${path.relative(ROOT, TARGET)}\``,
  `Backup: \`${path.relative(ROOT, BACKUP)}\``,
  "",
  "## Goal",
  "",
  "Display a synthetic workshop journey status in the client operational hub.",
  "",
  "## Journey",
  "",
  "- RDV",
  "- Intervention",
  "- Facture",
  "- Paiement",
  "",
  "## Statuses",
  "",
  "- Aucun parcours sélectionné",
  "- RDV planifié",
  "- Intervention en cours",
  "- Intervention terminée",
  "- Facturé à encaisser",
  "- Paiement partiel",
  "- Parcours soldé",
  "- Parcours annulé",
  "",
  "## Notes",
  "",
  "This pass computes the status from already loaded hub records and does not modify persistence, workflow transitions or runtime writes.",
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
write(REPORT, report);

console.log(`[REPORT] ${path.relative(ROOT, REPORT)}`);
console.log(`[OK] ${okCount}`);
console.log(`[FAIL] ${failCount}`);
console.log("[AMARKHYS-HUB-PARCOURS-ATELIER-STATUS] DONE");
console.log("[NEXT] pnpm build");