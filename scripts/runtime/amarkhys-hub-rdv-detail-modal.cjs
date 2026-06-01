const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const TARGET = path.join(ROOT, "src", "components", "erp", "hub", "ERPClientOperationalSheet.tsx");
const REPORT = path.join(ROOT, "docs", "audits", "AMARKHYS-HUB-RDV-detail-modal.md");
const BACKUP = `${TARGET}.bak-amarkhys-rdv-detail-modal`;

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

console.log("[AMARKHYS-HUB-RDV-DETAIL-MODAL] Install RDV detail modal");

if (!fs.existsSync(TARGET)) {
  fail(`Missing target: ${TARGET}`);
}

const before = fs.readFileSync(TARGET, "utf8");
write(BACKUP, before);
ok(`Backup written: ${path.relative(ROOT, BACKUP)}`);

let after = before;

const requiredMarkers = [
  "rendezvous.map((appointment)",
  "const [selectedRendezvousId, setSelectedRendezvousId] = useState<string | null>(null);",
  "const selectedRendezvous = useMemo(() => {",
  "1. Choisir un rendez-vous",
  "Interventions liées au rendez-vous",
];

for (const marker of requiredMarkers) {
  if (!after.includes(marker)) {
    fail(`Missing marker before patch: ${marker}`);
  }
}

/**
 * 1. State modal RDV.
 */
if (!after.includes("const [openedRendezvousDetailId, setOpenedRendezvousDetailId]")) {
  after = after.replace(
    "  const [selectedRendezvousId, setSelectedRendezvousId] = useState<string | null>(null);",
    `  const [selectedRendezvousId, setSelectedRendezvousId] = useState<string | null>(null);
  const [openedRendezvousDetailId, setOpenedRendezvousDetailId] = useState<string | null>(null);`
  );
}

/**
 * 2. Memo RDV ouvert.
 */
if (!after.includes("const openedRendezvousDetail = useMemo(() => {")) {
  const selectedMemoEnd = `  }, [rendezvous, selectedRendezvousId]);

  const interventionsForSelectedRendezvous = useMemo(() => {`;

  const openedMemo = `  }, [rendezvous, selectedRendezvousId]);

  const openedRendezvousDetail = useMemo(() => {
    if (!openedRendezvousDetailId) {
      return null;
    }

    return (
      rendezvous.find((item) => recordId(item) === openedRendezvousDetailId) ??
      null
    );
  }, [rendezvous, openedRendezvousDetailId]);

  const interventionsForSelectedRendezvous = useMemo(() => {`;

  if (!after.includes(selectedMemoEnd)) {
    fail("Could not find selectedRendezvous memo end anchor.");
  }

  after = after.replace(selectedMemoEnd, openedMemo);
}

/**
 * 3. Remplacer le bouton action RDV par Détails.
 * Recherche robuste dans rendezvous.map.
 */
const detailsButton = `                                      <button
                                        type="button"
                                        onClick={(event) => {
                                          event.stopPropagation();
                                          const appointmentId = recordId(appointment);
                                          setSelectedRendezvousId(appointmentId);
                                          setSelectedInterventionId(null);
                                          setOpenedRendezvousDetailId((current) =>
                                            current === appointmentId ? null : appointmentId
                                          );
                                        }}
                                        className={[
                                          "rounded-full px-3 py-1.5 text-xs font-bold",
                                          openedRendezvousDetailId === recordId(appointment)
                                            ? "bg-emerald-700 text-white"
                                            : "bg-slate-100 text-slate-900",
                                        ].join(" ")}
                                      >
                                        Détails
                                      </button>`;

if (!after.includes(">Détails<") && !after.includes("Détails")) {
  const mapStart = after.indexOf("rendezvous.map((appointment)");
  const tbodyEnd = after.indexOf("</tbody>", mapStart);

  if (mapStart === -1 || tbodyEnd === -1) {
    fail("Could not locate RDV table body.");
  }

  const rdvSlice = after.slice(mapStart, tbodyEnd);
  const buttonRegex = /<button[\s\S]*?<\/button>/g;
  const matches = [...rdvSlice.matchAll(buttonRegex)];

  const target = matches.find((match) =>
    match[0].includes("setSelectedRendezvousId") ||
    match[0].includes("Sélectionner") ||
    match[0].includes("Selectionner") ||
    match[0].includes("Sélectionné")
  );

  if (!target) {
    fail("Could not find RDV action button block in rendezvous.map.");
  }

  const absoluteStart = mapStart + target.index;
  const absoluteEnd = absoluteStart + target[0].length;

  after = after.slice(0, absoluteStart) + detailsButton + after.slice(absoluteEnd);
} else {
  ok("Détails button already present.");
}

/**
 * 4. Supprimer ancienne carte inline RDV si elle existe.
 */
if (after.includes('data-amarkhys-rdv-detail-card="RENDEZVOUS_DETAIL_CARD"')) {
  const lines = after.split(/\r?\n/);
  const markerIndex = lines.findIndex((line) =>
    line.includes('data-amarkhys-rdv-detail-card="RENDEZVOUS_DETAIL_CARD"')
  );

  let start = markerIndex;
  while (start >= 0 && !lines[start].includes("{openedRendezvousDetail ? (")) {
    start--;
  }

  let end = markerIndex;
  while (end < lines.length && !lines[end].includes(") : null}")) {
    end++;
  }

  if (start >= 0 && end < lines.length) {
    after = [
      ...lines.slice(0, start),
      ...lines.slice(end + 1),
    ].join("\n");
  }
}

/**
 * 5. Insérer la modale après la section RDV, avant la section interventions.
 */
if (!after.includes('data-amarkhys-rdv-detail-modal="RENDEZVOUS_DETAIL_MODAL"')) {
  const rdvTitleIndex = after.indexOf("1. Choisir un rendez-vous");
  if (rdvTitleIndex === -1) {
    fail("RDV section title not found.");
  }

  const rdvSectionEnd = after.indexOf("                    </section>", rdvTitleIndex);
  if (rdvSectionEnd === -1) {
    fail("RDV section closing tag not found.");
  }

  const insertAt = rdvSectionEnd + "                    </section>".length;

  const modalBlock = `

                    {openedRendezvousDetail ? (
                      <div
                        data-amarkhys-rdv-detail-modal="RENDEZVOUS_DETAIL_MODAL"
                        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4 py-6 backdrop-blur-sm"
                        role="dialog"
                        aria-modal="true"
                      >
                        <div className="w-full max-w-3xl overflow-hidden rounded-[2rem] bg-white shadow-2xl ring-1 ring-slate-200">
                          <div className="border-b border-slate-100 bg-gradient-to-r from-emerald-50 to-white px-6 py-5">
                            <div className="flex flex-wrap items-start justify-between gap-4">
                              <div>
                                <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">
                                  Rendez-vous atelier
                                </p>
                                <h3 className="mt-2 text-2xl font-black text-slate-950">
                                  Détails du rendez-vous
                                </h3>
                                <p className="mt-1 text-sm text-slate-500">
                                  Consultation rapide du rendez-vous sélectionné.
                                </p>
                              </div>

                              <button
                                type="button"
                                onClick={() => setOpenedRendezvousDetailId(null)}
                                className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
                              >
                                Fermer
                              </button>
                            </div>
                          </div>

                          <div className="grid gap-4 p-6 sm:grid-cols-2 xl:grid-cols-5">
                            <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
                              <p className="text-xs font-bold uppercase text-slate-400">Date</p>
                              <p className="mt-2 font-semibold text-slate-950">
                                {text(openedRendezvousDetail, ["dateRendezVous", "date", "activityDate"])}
                              </p>
                            </div>

                            <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
                              <p className="text-xs font-bold uppercase text-slate-400">Heure</p>
                              <p className="mt-2 font-semibold text-slate-950">
                                {text(openedRendezvousDetail, ["heureRendezVous", "heure", "startAt"])}
                              </p>
                            </div>

                            <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
                              <p className="text-xs font-bold uppercase text-slate-400">Durée</p>
                              <p className="mt-2 font-semibold text-slate-950">
                                {text(openedRendezvousDetail, ["durationMinutes", "dureeMinutes", "duration"], "-")} min
                              </p>
                            </div>

                            <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
                              <p className="text-xs font-bold uppercase text-slate-400">Type service</p>
                              <p className="mt-2 font-semibold text-slate-950">
                                {text(openedRendezvousDetail, ["typeService", "service", "displayLabel"])}
                              </p>
                            </div>

                            <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
                              <p className="text-xs font-bold uppercase text-slate-400">Statut</p>
                              <span className="mt-2 inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                                {text(openedRendezvousDetail, ["statut", "status"], "suivi")}
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center justify-end gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4">
                            <Link
                              href={"/rendezvous/" + recordId(openedRendezvousDetail)}
                              className="rounded-full bg-white px-5 py-2.5 text-sm font-bold text-slate-900 ring-1 ring-slate-200 hover:bg-slate-100"
                            >
                              Ouvrir la fiche
                            </Link>

                            <Link
                              href={"/rendezvous/" + recordId(openedRendezvousDetail) + "/edit"}
                              className="rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-800"
                            >
                              Modifier le RDV
                            </Link>
                          </div>
                        </div>
                      </div>
                    ) : null}`;

  after = after.slice(0, insertAt) + modalBlock + after.slice(insertAt);
}

const checks = [
  ["component changed", after !== before],
  ["detail state added", after.includes("openedRendezvousDetailId")],
  ["detail memo added", after.includes("openedRendezvousDetail = useMemo")],
  ["details button added", after.includes("Détails")],
  ["modal marker added", after.includes("RENDEZVOUS_DETAIL_MODAL")],
  ["modal overlay added", after.includes("fixed inset-0 z-50")],
  ["edit button added", after.includes("Modifier le RDV")],
  ["open button added", after.includes("Ouvrir la fiche")],
  ["close button added", after.includes("Fermer")],
  ["date shown", after.includes(">Date<")],
  ["heure shown", after.includes(">Heure<")],
  ["duration shown", after.includes(">Durée<")],
  ["service shown", after.includes(">Type service<")],
  ["status shown", after.includes(">Statut<")],
  ["interventions block preserved", after.includes("Interventions liées au rendez-vous")],
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
  "# AMARKHYS-HUB-RDV-DETAIL-MODAL",
  "",
  `Target: \`${path.relative(ROOT, TARGET)}\``,
  `Backup: \`${path.relative(ROOT, BACKUP)}\``,
  "",
  "## Goal",
  "",
  "Add a clean modal for rendez-vous details with direct actions.",
  "",
  "## Fields",
  "",
  "- Date",
  "- Heure",
  "- Durée",
  "- Type service",
  "- Statut",
  "",
  "## Actions",
  "",
  "- Modifier le RDV",
  "- Ouvrir la fiche",
  "- Fermer",
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
console.log("[AMARKHYS-HUB-RDV-DETAIL-MODAL] DONE");
console.log("[NEXT] pnpm build");