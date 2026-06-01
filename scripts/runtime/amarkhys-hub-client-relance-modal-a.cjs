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
  "AMARKHYS-HUB-CLIENT-RELANCE-MODAL-A.md"
);

const BACKUP = `${TARGET}.bak-client-relance-modal-a`;

function fail(message) {
  console.error(`[FAIL] ${message}`);
  process.exit(1);
}

function ok(message) {
  console.log(`[OK] ${message}`);
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, "utf8");
}

console.log("[AMARKHYS-HUB-CLIENT-RELANCE-MODAL-A] Install relance modal");

if (!fs.existsSync(TARGET)) {
  fail(`Missing target: ${TARGET}`);
}

const before = read(TARGET);
write(BACKUP, before);
ok(`Backup written: ${path.relative(ROOT, BACKUP)}`);

let after = before;

const requiredMarkers = [
  "hubActions.map((action)",
  "RuntimeHubActionContextAdapter",
  "function hubActionIcon",
  "function hubActionClassName",
  "const hubActions = useMemo",
  'SectionTitle title="ACTIONS CLIENT"',
];

for (const marker of requiredMarkers) {
  if (!after.includes(marker)) {
    fail(`Missing marker before patch: ${marker}`);
  }
}

/**
 * 1. Add communication helpers.
 */
if (!after.includes("function normalizeRelancePhone")) {
  const anchor = `function hubActionIcon(actionKey: string): string {`;

  const helpers = `function normalizeRelancePhone(value: string): string {
  return value.replace(/[^0-9]/g, "");
}

function buildRelanceWhatsAppHref(phone: string, message: string): string {
  const normalizedPhone = normalizeRelancePhone(phone);

  return normalizedPhone
    ? \`https://wa.me/\${normalizedPhone}?text=\${encodeURIComponent(message)}\`
    : "";
}

function buildRelanceSmsHref(phone: string, message: string): string {
  const normalizedPhone = normalizeRelancePhone(phone);

  return normalizedPhone
    ? \`sms:\${normalizedPhone}?body=\${encodeURIComponent(message)}\`
    : "";
}

function buildRelanceMailHref(email: string, subject: string, message: string): string {
  const cleanEmail = email.trim();

  return cleanEmail
    ? \`mailto:\${cleanEmail}?subject=\${encodeURIComponent(subject)}&body=\${encodeURIComponent(message)}\`
    : "";
}

`;

  if (!after.includes(anchor)) {
    fail("hubActionIcon anchor not found.");
  }

  after = after.replace(anchor, helpers + anchor);
}

/**
 * 2. Add state for modal.
 */
if (!after.includes("const [openedRelanceActionKey, setOpenedRelanceActionKey]")) {
  const stateAnchor =
    "  const [openedRendezvousDetailId, setOpenedRendezvousDetailId] = useState<string | null>(null);";

  if (!after.includes(stateAnchor)) {
    fail("openedRendezvousDetailId state anchor not found.");
  }

  after = after.replace(
    stateAnchor,
    `${stateAnchor}
  const [openedRelanceActionKey, setOpenedRelanceActionKey] = useState<string | null>(null);`
  );
}

/**
 * 3. Add modal context after hubActions.
 */
if (!after.includes("const openedRelanceAction = useMemo(() => {")) {
  const anchor = `  const isCardMode = !["flotte", "entreprise"].includes(clientType.toLowerCase());`;

  const block = `  const openedRelanceAction = useMemo(() => {
    if (!openedRelanceActionKey) {
      return null;
    }

    return hubActions.find((action) => action.key === openedRelanceActionKey) ?? null;
  }, [hubActions, openedRelanceActionKey]);

  const relanceModalContext = useMemo(() => {
    const isFactureRelance =
      openedRelanceAction?.key.includes("relancer-facture") ?? false;

    const selectedFacture = facturesForSelectedIntervention[0] ?? null;
    const amount = isFactureRelance
      ? parcoursAtelierStatus.remainingAmount
      : unpaidAmount;

    const clientLabel = text(
      rootRecord,
      ["displayLabel", "raisonSociale", "nomComplet", "nom", "prenom"],
      "Client"
    );

    const phone = text(rootRecord, ["telephone", "phone", "mobile", "whatsapp"], "");
    const email = text(rootRecord, ["email"], "");
    const factureLabel = text(selectedFacture, ["numero", "numeroFacture", "code"], "-");
    const vehiculeLabel = text(selectedVehicle, ["displayLabel", "immatriculation", "marque"], "-");

    const message = isFactureRelance
      ? [
          "Bonjour " + clientLabel + ",",
          "AMARKHYS Garage vous informe qu'un solde de " + money(amount) + " reste à régler sur votre facture " + factureLabel + ".",
          "Merci de bien vouloir procéder au règlement ou nous contacter pour toute précision.",
        ].join(" ")
      : [
          "Bonjour " + clientLabel + ",",
          "AMARKHYS Garage vous informe que votre compte présente un impayé de " + money(amount) + ".",
          "Merci de bien vouloir procéder au règlement ou nous contacter pour régulariser la situation.",
        ].join(" ");

    const subject = isFactureRelance
      ? "Relance facture AMARKHYS Garage"
      : "Relance compte client AMARKHYS Garage";

    return {
      isFactureRelance,
      amount,
      clientLabel,
      phone,
      email,
      factureLabel,
      vehiculeLabel,
      message,
      subject,
      whatsappHref: buildRelanceWhatsAppHref(phone, message),
      smsHref: buildRelanceSmsHref(phone, message),
      mailHref: buildRelanceMailHref(email, subject, message),
      telHref: normalizeRelancePhone(phone) ? "tel:" + normalizeRelancePhone(phone) : "",
    };
  }, [
    openedRelanceAction,
    facturesForSelectedIntervention,
    parcoursAtelierStatus.remainingAmount,
    unpaidAmount,
    rootRecord,
    selectedVehicle,
  ]);

  const isCardMode = !["flotte", "entreprise"].includes(clientType.toLowerCase());`;

  if (!after.includes(anchor)) {
    fail("isCardMode anchor not found.");
  }

  after = after.replace(anchor, block);
}

/**
 * 4. Intercept relance actions in premium panel.
 */
if (!after.includes("const isRelanceAction = action.key.includes")) {
  const actionMapAnchor = `                  {hubActions.map((action) => {
                    const content = (`;

  const replacement = `                  {hubActions.map((action) => {
                    const isRelanceAction = action.key.includes("relancer-client") || action.key.includes("relancer-facture");

                    const content = (`;

  if (!after.includes(actionMapAnchor)) {
    fail("hubActions.map content anchor not found.");
  }

  after = after.replace(actionMapAnchor, replacement);
}

if (!after.includes("setOpenedRelanceActionKey(action.key)")) {
  const linkBranchAnchor = `                    if (action.href && !action.disabled) {
                      return (`;

  const relanceBranch = `                    if (isRelanceAction) {
                      return (
                        <button
                          key={action.key}
                          type="button"
                          disabled={action.disabled}
                          className={[
                            hubActionClassName(action.key),
                            action.disabled ? "cursor-not-allowed opacity-50" : "",
                          ].join(" ")}
                          title={action.description}
                          onClick={() => setOpenedRelanceActionKey(action.key)}
                        >
                          {content}
                        </button>
                      );
                    }

                    if (action.href && !action.disabled) {
                      return (`;

  if (!after.includes(linkBranchAnchor)) {
    fail("Link branch anchor not found.");
  }

  after = after.replace(linkBranchAnchor, relanceBranch);
}

/**
 * 5. Add modal before closing main.
 */
if (!after.includes('data-amarkhys-relance-modal="CLIENT_RELANCE_MODAL"')) {
  const closingAnchor = `      </div>
    </main>`;

  const modal = `      </div>

      {openedRelanceAction ? (
        <div
          data-amarkhys-relance-modal="CLIENT_RELANCE_MODAL"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4 py-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-3xl overflow-hidden rounded-[2rem] bg-white shadow-2xl ring-1 ring-slate-200">
            <div className="border-b border-orange-100 bg-gradient-to-r from-orange-50 to-white px-6 py-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-orange-700">
                    Relance AMARKHYS
                  </p>
                  <h3 className="mt-2 text-2xl font-black text-slate-950">
                    {openedRelanceAction.label}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Choisissez le canal de relance et gardez le contexte client.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setOpenedRelanceActionKey(null)}
                  className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
                >
                  Fermer
                </button>
              </div>
            </div>

            <div className="grid gap-4 p-6 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
                <p className="text-xs font-bold uppercase text-slate-400">Client</p>
                <p className="mt-2 font-semibold text-slate-950">
                  {relanceModalContext.clientLabel}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
                <p className="text-xs font-bold uppercase text-slate-400">Téléphone</p>
                <p className="mt-2 font-semibold text-slate-950">
                  {relanceModalContext.phone || "Non renseigné"}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
                <p className="text-xs font-bold uppercase text-slate-400">Véhicule</p>
                <p className="mt-2 font-semibold text-slate-950">
                  {relanceModalContext.vehiculeLabel}
                </p>
              </div>

              <div className="rounded-2xl bg-orange-50 p-4 ring-1 ring-orange-200">
                <p className="text-xs font-bold uppercase text-orange-500">
                  {relanceModalContext.isFactureRelance ? "Reste à encaisser" : "Impayés client"}
                </p>
                <p className="mt-2 text-xl font-black text-orange-800">
                  {money(relanceModalContext.amount)}
                </p>
              </div>
            </div>

            <div className="px-6 pb-6">
              <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
                <p className="text-xs font-black uppercase tracking-wide text-slate-500">
                  Message proposé
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-700">
                  {relanceModalContext.message}
                </p>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <a
                  href={relanceModalContext.whatsappHref || undefined}
                  target="_blank"
                  rel="noreferrer"
                  className={[
                    "rounded-2xl px-4 py-3 text-center text-sm font-bold ring-1",
                    relanceModalContext.whatsappHref
                      ? "bg-emerald-50 text-emerald-800 ring-emerald-200 hover:bg-emerald-100"
                      : "pointer-events-none bg-slate-50 text-slate-400 ring-slate-200",
                  ].join(" ")}
                >
                  WhatsApp
                </a>

                <a
                  href={relanceModalContext.smsHref || undefined}
                  className={[
                    "rounded-2xl px-4 py-3 text-center text-sm font-bold ring-1",
                    relanceModalContext.smsHref
                      ? "bg-blue-50 text-blue-800 ring-blue-200 hover:bg-blue-100"
                      : "pointer-events-none bg-slate-50 text-slate-400 ring-slate-200",
                  ].join(" ")}
                >
                  SMS
                </a>

                <a
                  href={relanceModalContext.telHref || undefined}
                  className={[
                    "rounded-2xl px-4 py-3 text-center text-sm font-bold ring-1",
                    relanceModalContext.telHref
                      ? "bg-slate-50 text-slate-800 ring-slate-200 hover:bg-slate-100"
                      : "pointer-events-none bg-slate-50 text-slate-400 ring-slate-200",
                  ].join(" ")}
                >
                  Appel
                </a>

                <a
                  href={relanceModalContext.mailHref || undefined}
                  className={[
                    "rounded-2xl px-4 py-3 text-center text-sm font-bold ring-1",
                    relanceModalContext.mailHref
                      ? "bg-white text-slate-800 ring-slate-200 hover:bg-slate-50"
                      : "pointer-events-none bg-slate-50 text-slate-400 ring-slate-200",
                  ].join(" ")}
                >
                  Email
                </a>

                <button
                  type="button"
                  onClick={() => navigator.clipboard?.writeText(relanceModalContext.message)}
                  className="rounded-2xl bg-white px-4 py-3 text-center text-sm font-bold text-slate-800 ring-1 ring-slate-200 hover:bg-slate-50"
                >
                  Copier message
                </button>

                <button
                  type="button"
                  onClick={() => setOpenedRelanceActionKey(null)}
                  className="rounded-2xl bg-slate-950 px-4 py-3 text-center text-sm font-bold text-white hover:bg-slate-800"
                >
                  Terminer
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </main>`;

  if (!after.includes(closingAnchor)) {
    fail("Closing main anchor not found.");
  }

  after = after.replace(closingAnchor, modal);
}

/**
 * 6. Checks.
 */
const checks = [
  ["component changed", after !== before],
  ["modal state added", after.includes("openedRelanceActionKey")],
  ["modal context added", after.includes("relanceModalContext")],
  ["relance actions intercepted", after.includes("isRelanceAction")],
  ["modal rendered", after.includes('data-amarkhys-relance-modal="CLIENT_RELANCE_MODAL"')],
  ["whatsapp action added", after.includes("WhatsApp")],
  ["sms action added", after.includes("SMS")],
  ["appel action added", after.includes("Appel")],
  ["email action added", after.includes("Email")],
  ["copy action added", after.includes("Copier message")],
  ["runtime adapter preserved", after.includes("RuntimeHubActionContextAdapter")],
  ["premium panel preserved", after.includes("hubActionClassName(action.key)")],
];

const failed = checks.filter(([, passed]) => !passed);

if (failed.length > 0) {
  fail(`Checks failed: ${failed.map(([name]) => name).join(", ")}`);
}

write(TARGET, after);
ok(`Written: ${path.relative(ROOT, TARGET)}`);

const report = [
  "# AMARKHYS-HUB-CLIENT-RELANCE-MODAL-A",
  "",
  "## Objectif",
  "",
  "Créer une modale de relance AMARKHYS et brancher les actions Relancer client / Relancer facture dessus.",
  "",
  "## Résultat attendu",
  "",
  "- Relancer le client ouvre une modale.",
  "- Relancer cette facture ouvre une modale.",
  "- La modale affiche client, téléphone, véhicule, montant et message proposé.",
  "- Canaux disponibles : WhatsApp, SMS, Appel, Email, Copier message.",
  "- Les actions restent alimentées par RuntimeHubActionContextAdapter.",
  "",
  "## Checks",
  "",
  ...checks.map(([name, passed]) => `- ${passed ? "OK" : "FAIL"} — ${name}`),
  "",
].join("\n");

write(REPORT, report);
ok(`Report: ${path.relative(ROOT, REPORT)}`);

console.log("[AMARKHYS-HUB-CLIENT-RELANCE-MODAL-A] DONE");
console.log("[NEXT] pnpm build");