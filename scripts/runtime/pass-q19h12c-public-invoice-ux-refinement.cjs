const fs = require("fs");
const path = require("path");

const root = process.cwd();

function p(rel) {
  return path.join(root, rel);
}

function backup(rel, suffix) {
  const source = p(rel);
  const target = source + suffix;

  if (fs.existsSync(source) && !fs.existsSync(target)) {
    fs.copyFileSync(source, target);
    console.log("[BACKUP]", rel + suffix);
  }
}

function write(rel, content) {
  fs.writeFileSync(p(rel), content, "utf8");
  console.log("[WRITTEN]", rel);
}

const pagePath = "src/app/facture/[token]/page.tsx";

backup(pagePath, ".bak-q19h12c-public-invoice-ux-refinement");

let content = fs.readFileSync(p(pagePath), "utf8");

/**
 * 1. Bandeau bas de facture : plus lisible, fond clair document.
 */
content = content.replace(
  'className="rounded-[1.25rem] border border-[#d7a83f]/24 bg-gradient-to-r from-[#1a1608]/78 via-[#061915]/84 to-[#041b18] p-5"',
  'className="rounded-[1.25rem] border border-[#e8dcc0] bg-[#fff6d8] p-5 shadow-sm"'
);

content = content.replace(
  'className="text-sm font-bold leading-7 text-slate-700"',
  'className="text-sm font-bold leading-7 text-[#493b16]"'
);

/**
 * 2. Remplacer la carte intervention simple par un bloc détail intervention plus scalable.
 */
const oldInterventionCard = `<InfoItem
                      icon={Wrench}
                      label="Intervention"
                      value={buildInterventionLabel(intervention)}
                    />`;

const newInterventionPlaceholder = `<InfoItem
                      icon={Wrench}
                      label="Intervention"
                      value={buildInterventionLabel(intervention)}
                    />`;

content = content.replace(oldInterventionCard, newInterventionPlaceholder);

/**
 * 3. Ajouter un vrai bloc Détail intervention après les infos facture,
 * avant la section Paiement.
 */
const paymentMarker = `<div>
                  <p className="mb-4 text-xs font-black uppercase tracking-[0.26em] text-[#8a640f]">
                    Paiement
                  </p>`;

const interventionDetailBlock = `<div>
                  <p className="mb-4 text-xs font-black uppercase tracking-[0.26em] text-[#8a640f]">
                    Détail intervention
                  </p>

                  <div className="rounded-[1.25rem] border border-[#e8dcc0] bg-white p-5 shadow-sm">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-sm font-black text-[#0f172a]">
                          {buildInterventionLabel(intervention)}
                        </p>

                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          Cette zone est prévue pour afficher le détail des prestations,
                          diagnostics, pièces, main d’œuvre et remarques liées à l’intervention.
                        </p>
                      </div>

                      <span className="inline-flex shrink-0 rounded-full border border-[#0f766e]/20 bg-[#ecfdf5] px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-[#0f766e]">
                        Suivi atelier
                      </span>
                    </div>

                    <div className="mt-5 grid gap-3">
                      <div className="flex items-start gap-3 rounded-2xl border border-[#e8dcc0] bg-[#fffaf0] p-4">
                        <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#0f766e]" />
                        <div>
                          <p className="text-sm font-black text-[#0f172a]">
                            Intervention liée à cette facture
                          </p>
                          <p className="mt-1 text-sm leading-6 text-slate-600">
                            Les opérations détaillées pourront être affichées ici sous forme
                            de liste ou de tableau lorsque les lignes d’intervention seront
                            exposées au client.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 rounded-2xl border border-[#e8dcc0] bg-[#fffaf0] p-4">
                        <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#d7a83f]" />
                        <div>
                          <p className="text-sm font-black text-[#0f172a]">
                            Document de synthèse client
                          </p>
                          <p className="mt-1 text-sm leading-6 text-slate-600">
                            Cette facture présente le résumé financier. Le détail technique
                            complet peut être communiqué par AMARKHYS si nécessaire.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                `;

if (!content.includes("Détail intervention")) {
  content = content.replace(paymentMarker, interventionDetailBlock + paymentMarker);
}

/**
 * 4. Renforcer la sidebar droite : icônes, textes, contraste.
 */
content = content.replace(
  'className="rounded-[1.6rem] border border-[#d7a83f]/24 bg-gradient-to-br from-[#1a1608]/78 via-[#061915]/84 to-[#041b18] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.38)] text-white"',
  'className="rounded-[1.6rem] border border-[#d7a83f]/32 bg-gradient-to-br from-[#241d08]/86 via-[#06231f]/92 to-[#04110f] p-6 text-white shadow-[0_34px_100px_rgba(0,0,0,0.48)] ring-1 ring-[#23ead4]/10"'
);

content = content.replace(
  'className="rounded-[1.35rem] border border-[#23ead4]/22 bg-gradient-to-br from-[#075f53] via-[#06443d] to-[#041b18] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.42)] text-white"',
  'className="rounded-[1.35rem] border border-[#23ead4]/35 bg-gradient-to-br from-[#087264] via-[#065147] to-[#04211d] p-6 text-white shadow-[0_34px_100px_rgba(0,0,0,0.48)] ring-1 ring-[#23ead4]/16"'
);

content = content.replaceAll(
  'className="h-5 w-5 text-[#23ead4]"',
  'className="h-5 w-5 text-[#37ffe4] drop-shadow-[0_0_10px_rgba(55,255,228,0.35)]"'
);

content = content.replaceAll(
  'className="h-6 w-6"',
  'className="h-6 w-6 drop-shadow-[0_0_10px_rgba(55,255,228,0.28)]"'
);

content = content.replace(
  'className="mt-3 text-sm leading-6 text-slate-600"',
  'className="mt-3 text-sm leading-6 text-cyan-50/85"'
);

/**
 * 5. Corriger les boutons sidebar si texte trop sombre après la passe ivoire.
 */
content = content.replaceAll(
  'text-[#0f172a]"',
  'text-[#0f172a]"'
);

content = content.replace(
  'className={className}',
  'className={className}'
);

write(pagePath, content);

console.log("");
console.log("[Q19H12C_DONE] Public invoice UX refined: readable note, intervention detail block, brighter sidebar.");
console.log("");
console.log("Next:");
console.log("  pnpm build");