const fs = require("fs");
const path = require("path");

const root = process.cwd();
const target = path.join(
  root,
  "src/components/erp/runtime/ERPRuntimeDetails.tsx"
);

if (!fs.existsSync(target)) {
  console.error("Missing:", target);
  process.exit(1);
}

let content = fs.readFileSync(target, "utf8");

/**
 * PASS 2N-Q11C
 * Afficher les lignes liées dans le détail intervention.
 *
 * Scope strict :
 * - ERPRuntimeDetails uniquement
 * - pas de cockpit
 * - pas de sidebar
 * - pas d'automatisation stock
 */

if (!content.includes("function formatInterventionLineMoney(")) {
  content = content.replace(
    `function buildInterventionLineHref(
  data: Record<string, unknown>
): string {`,
    `function formatInterventionLineMoney(value: unknown): string {
  const amount = Number(value ?? 0);

  if (!Number.isFinite(amount)) {
    return "0 FCFA";
  }

  return amount.toLocaleString("fr-FR") + " FCFA";
}

function getInterventionLineTitle(line: Record<string, unknown>): string {
  return String(
    line.designation ??
    line.produitId ??
    line.typeLigne ??
    line.id ??
    "Ligne intervention"
  );
}

function getInterventionLineStatus(line: Record<string, unknown>): string {
  const value = String(line.statut ?? "brouillon");

  const labels: Record<string, string> = {
    brouillon: "Brouillon",
    validee: "Validée",
    facturee: "Facturée",
    annulee: "Annulée",
  };

  return labels[value] ?? value;
}

function buildInterventionLineHref(
  data: Record<string, unknown>
): string {`
  );
}

if (!content.includes("const [interventionLines, setInterventionLines]")) {
  content = content.replace(
    `  const amountSummary =
    getInvoiceAmountSummary(data);`,
    `  const amountSummary =
    getInvoiceAmountSummary(data);

  const [interventionLines, setInterventionLines] =
    useState<Record<string, unknown>[]>([]);

  const [interventionLinesLoading, setInterventionLinesLoading] =
    useState(false);`
  );
}

if (!content.includes("AMARKHYS_INTERVENTION_LINES_LOADER")) {
  content = content.replace(
    `  useEffect(() => {
    let mounted = true;

    async function loadTimeline() {`,
    `  useEffect(() => {
    // AMARKHYS_INTERVENTION_LINES_LOADER
    if (!isIntervention || !entityId) {
      setInterventionLines([]);
      return;
    }

    let mounted = true;

    async function loadInterventionLines() {
      setInterventionLinesLoading(true);

      try {
        const [
          coreModules,
          dataBinding,
        ] = await Promise.all([
          import("@/runtime/modules/definitions/coreModules"),
          import("@/runtime/data-binding"),
        ]);

        const linesModule =
          coreModules.allERPModules.find(
            (item) => item.metadata.key === "lignesinterventionauto"
          );

        if (!linesModule) {
          if (mounted) {
            setInterventionLines([]);
          }

          return;
        }

        const records =
          await dataBinding.RuntimeDataBinding.list(linesModule);

        const relatedLines =
          records
            .filter((item) => String(item.interventionId ?? "") === entityId)
            .sort((left, right) =>
              String(left.designation ?? "").localeCompare(
                String(right.designation ?? ""),
                "fr"
              )
            );

        if (mounted) {
          setInterventionLines(relatedLines);
        }
      } catch (error) {
        console.error("[AMARKHYS_INTERVENTION_LINES_ERROR]", error);

        if (mounted) {
          setInterventionLines([]);
        }
      } finally {
        if (mounted) {
          setInterventionLinesLoading(false);
        }
      }
    }

    loadInterventionLines();

    return () => {
      mounted = false;
    };
  }, [isIntervention, entityId]);

  useEffect(() => {
    let mounted = true;

    async function loadTimeline() {`
  );
}

if (!content.includes("const interventionLinesTotal =")) {
  content = content.replace(
    `  return (
    <div className="space-y-6">`,
    `  const interventionLinesTotal =
    interventionLines.reduce(
      (sum, line) => sum + Number(line.montantTotal ?? 0),
      0
    );

  return (
    <div className="space-y-6">`
  );
}

if (!content.includes("data-intervention-lines-list")) {
  content = content.replace(
    `          </div>
        </ERPCard>
      ) : null}

      {isInvoice ? (`,
    `          </div>

          <div
            data-intervention-lines-list
            className="mt-5 rounded-2xl border border-[var(--erp-border)] bg-[var(--erp-surface)] p-4"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-black text-[var(--erp-text)]">
                  Lignes existantes
                </p>
                <p className="mt-1 text-sm text-[var(--erp-text-muted)]">
                  {interventionLines.length} ligne(s) · total {formatInterventionLineMoney(interventionLinesTotal)}
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {interventionLinesLoading ? (
                <div className="rounded-2xl border border-[var(--erp-border)] bg-[var(--erp-surface-soft)] p-4 text-sm text-[var(--erp-text-muted)]">
                  Chargement des lignes...
                </div>
              ) : interventionLines.length > 0 ? (
                interventionLines.map((line) => {
                  const lineId =
                    String(line.id ?? line._id ?? "");

                  return (
                    <a
                      key={lineId || getInterventionLineTitle(line)}
                      href={
                        lineId
                          ? "/lignesinterventionauto/" + lineId
                          : "/lignesinterventionauto"
                      }
                      className="block rounded-2xl border border-[var(--erp-border)] bg-[var(--erp-surface-soft)] p-4 transition hover:border-[var(--erp-primary)]"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-sm font-black text-[var(--erp-text)]">
                            {getInterventionLineTitle(line)}
                          </p>
                          <p className="mt-1 text-xs text-[var(--erp-text-muted)]">
                            Quantité {String(line.quantite ?? 1)} · PU {formatInterventionLineMoney(line.prixUnitaire)} · {getInterventionLineStatus(line)}
                          </p>
                        </div>

                        <p className="text-sm font-black text-[var(--erp-text)]">
                          {formatInterventionLineMoney(line.montantTotal)}
                        </p>
                      </div>
                    </a>
                  );
                })
              ) : (
                <div className="rounded-2xl border border-dashed border-[var(--erp-border-strong)] bg-[var(--erp-surface-soft)] p-4 text-sm text-[var(--erp-text-muted)]">
                  Aucune ligne n’est encore rattachée à cette intervention.
                </div>
              )}
            </div>
          </div>
        </ERPCard>
      ) : null}

      {isInvoice ? (`
  );
}

fs.writeFileSync(target, content, "utf8");

console.log("PASS 2N-Q11C OK: intervention related lines displayed.");