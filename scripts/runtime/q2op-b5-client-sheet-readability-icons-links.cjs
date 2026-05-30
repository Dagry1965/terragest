const fs = require("fs");
const path = require("path");

const root = process.cwd();
const filePath = "src/components/erp/hub/ERPClientOperationalSheet.tsx";
const fullPath = path.join(root, filePath);

if (!fs.existsSync(fullPath)) {
  console.error("[MISSING]", filePath);
  process.exit(1);
}

const backupPath = `${fullPath}.bak-q2op-b5-readability-icons-links`;

if (!fs.existsSync(backupPath)) {
  fs.copyFileSync(fullPath, backupPath);
  console.log("[BACKUP]", path.relative(root, backupPath));
}

let content = fs.readFileSync(fullPath, "utf8");

/**
 * 1. Reduce heavy black typography.
 */
content = content.replace(
  `className="mt-3 text-4xl font-black tracking-tight text-slate-950 xl:text-5xl"`,
  `className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 xl:text-4xl"`
);

content = content.replace(
  `className="text-3xl font-black text-slate-950"`,
  `className="text-2xl font-extrabold text-slate-950"`
);

content = content.replace(
  `className="text-xl font-black text-slate-950"`,
  `className="text-lg font-extrabold text-slate-950"`
);

content = content.replace(
  `className="mt-3 text-3xl font-black leading-tight text-slate-950"`,
  `className="mt-2 text-2xl font-extrabold leading-tight text-slate-950"`
);

content = content.replace(
  `className="text-sm font-extrabold uppercase tracking-[0.18em] text-slate-950"`,
  `className="text-xs font-extrabold uppercase tracking-[0.16em] text-slate-900"`
);

/**
 * 2. Improve KPI layout with icons and compact values.
 */
const oldKpiBlock = `{[
                  ["Véhicules", text(rootRecord, ["vehiclesCount", "vehiculesCount", "nombreVehicules"], "0")],
                  ["Interventions actives", text(rootRecord, ["activeInterventionsCount", "interventionsActives"], "0")],
                  ["Factures impayées", \`\${text(rootRecord, ["unpaidInvoicesCount", "facturesImpayees"], "0")} impayée(s) · \${money(unpaidAmount)}\`],
                  ["CA cumulé", money(revenueTotal)],
                  ["Dernière visite", text(rootRecord, ["lastVisit", "derniereVisite"])],
                  ["Prochain RDV", text(rootRecord, ["nextAppointment", "prochainRendezVous"])],
                ].map(([label, value]) => (
                  <article
                    key={label}
                    className="rounded-[1.75rem] bg-white px-5 py-5 shadow-sm ring-1 ring-slate-200"
                  >
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
                    <p className="mt-3 text-3xl font-black leading-tight text-slate-950">{value}</p>
                  </article>
                ))}`;

const newKpiBlock = `{[
                  {
                    icon: "🚗",
                    label: "Véhicules",
                    value: text(rootRecord, ["vehiclesCount", "vehiculesCount", "nombreVehicules"], "0"),
                    hint: "Parc client",
                  },
                  {
                    icon: "🔧",
                    label: "Interventions actives",
                    value: text(rootRecord, ["activeInterventionsCount", "interventionsActives"], "0"),
                    hint: "En cours",
                  },
                  {
                    icon: "🧾",
                    label: "Factures impayées",
                    value: text(rootRecord, ["unpaidInvoicesCount", "facturesImpayees"], "0"),
                    hint: money(unpaidAmount),
                  },
                  {
                    icon: "📈",
                    label: "CA cumulé",
                    value: money(revenueTotal),
                    hint: "Total client",
                  },
                  {
                    icon: "📅",
                    label: "Dernière visite",
                    value: text(rootRecord, ["lastVisit", "derniereVisite"]),
                    hint: "Historique",
                  },
                  {
                    icon: "🗓️",
                    label: "Prochain RDV",
                    value: text(rootRecord, ["nextAppointment", "prochainRendezVous"]),
                    hint: "À venir",
                  },
                ].map((kpi) => (
                  <article
                    key={kpi.label}
                    className="rounded-[1.5rem] bg-white px-5 py-4 shadow-sm ring-1 ring-slate-200"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-lg">
                        {kpi.icon}
                      </span>
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
                          {kpi.label}
                        </p>
                        <p className="mt-1 truncate text-xl font-extrabold leading-tight text-slate-950">
                          {kpi.value}
                        </p>
                        <p className="mt-0.5 truncate text-xs font-medium text-slate-500">
                          {kpi.hint}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}`;

if (content.includes(oldKpiBlock)) {
  content = content.replace(oldKpiBlock, newKpiBlock);
} else {
  console.warn("[WARN] KPI block exact replacement not applied; using fallback typography replacements only.");
}

/**
 * 3. Add contextual detail hrefs if missing.
 */
if (!content.includes("const vehicleDetailHref =")) {
  content = content.replace(
    `const paymentsHref = queryHref("/encaissementsauto", {
    clientId,
    vehiculeId: selectedVehicleRecordId,
  });`,
    `const paymentsHref = queryHref("/encaissementsauto", {
    clientId,
    vehiculeId: selectedVehicleRecordId,
  });

  const vehicleDetailHref = queryHref(href("/vehicules", selectedVehicle), {
    clientId,
    returnTo: clientReturnTo,
  });

  const interventionDetailHref = queryHref("/interventionsauto", {
    clientId,
    vehiculeId: selectedVehicleRecordId,
  });

  const invoiceDetailHref = queryHref("/facturesauto", {
    clientId,
    vehiculeId: selectedVehicleRecordId,
  });

  const paymentDetailHref = queryHref("/encaissementsauto", {
    clientId,
    vehiculeId: selectedVehicleRecordId,
  });`
  );
}

/**
 * 4. Replace navigation hrefs with filtered/detail-aware hrefs.
 */
content = content.replace(
  `href={href("/vehicules", selectedVehicle)}`,
  `href={vehicleDetailHref}`
);

content = content.replace(
  `href={interventionsHref}`,
  `href={interventionDetailHref}`
);

content = content.replace(
  `href={invoicesHref}`,
  `href={invoiceDetailHref}`
);

content = content.replace(
  `href={paymentsHref}`,
  `href={paymentDetailHref}`
);

/**
 * 5. Vehicle card button must also carry client context.
 */
content = content.replace(
  `href={href("/vehicules", vehicle)}`,
  `href={queryHref(href("/vehicules", vehicle), {
                            clientId,
                            returnTo: clientReturnTo,
                          })}`
);

/**
 * 6. Add car/jauge visual cues to vehicle section.
 */
content = content.replace(
  `<SectionTitle
                  title="VÉHICULES DU CLIENT"`,
  `<SectionTitle
                  title="🚗 VÉHICULES DU CLIENT"`
);

content = content.replace(
  `<p><span className="font-medium text-slate-900">Immatriculation :</span> {text(vehicle, ["immatriculation"])}</p>
                          <p><span className="font-medium text-slate-900">Année :</span> {text(vehicle, ["annee", "année"])}</p>
                          <p><span className="font-medium text-slate-900">Carburant :</span> {text(vehicle, ["carburant"])}</p>
                          <p><span className="font-medium text-slate-900">Kilométrage :</span> {text(vehicle, ["kilometrage", "kilométrage"])}</p>`,
  `<p>🚘 <span className="font-medium text-slate-900">Immatriculation :</span> {text(vehicle, ["immatriculation"])}</p>
                          <p>📅 <span className="font-medium text-slate-900">Année :</span> {text(vehicle, ["annee", "année"])}</p>
                          <p>⛽ <span className="font-medium text-slate-900">Carburant :</span> {text(vehicle, ["carburant"])}</p>
                          <p>🛞 <span className="font-medium text-slate-900">Kilométrage :</span> {text(vehicle, ["kilometrage", "kilométrage"])}</p>`
);

/**
 * 7. Add icons to navigation labels.
 */
content = content.replace(
  `Fiche véhicule complète`,
  `🚗 Fiche véhicule complète`
);

content = content.replace(
  `Fiche intervention`,
  `🔧 Fiche intervention`
);

content = content.replace(
  `Facture complète`,
  `🧾 Facture complète`
);

content = content.replace(
  `Historique encaissements`,
  `💳 Historique encaissements`
);

/**
 * 8. Required markers.
 */
const required = [
  "🚗",
  "🔧",
  "🧾",
  "🛞",
  "vehicleDetailHref",
  "interventionDetailHref",
  "invoiceDetailHref",
  "paymentDetailHref",
  "clientId",
  "returnTo",
];

for (const marker of required) {
  if (!content.includes(marker)) {
    console.error("[PATCH_FAILED] Missing marker:", marker);
    process.exit(1);
  }
}

fs.writeFileSync(fullPath, content, "utf8");

console.log("[WRITTEN]", filePath);
console.log("[Q2-OP-B5] Readability, icons and client-filtered links applied.");
console.log("Next:");
console.log("  pnpm build");
console.log("  git status --short");