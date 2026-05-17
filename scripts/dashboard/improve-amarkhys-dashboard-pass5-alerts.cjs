const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

function save(relativePath, content) {
  fs.writeFileSync(path.join(ROOT, relativePath), content, "utf8");
  console.log("UPDATED", relativePath);
}

function fixEncoding(content) {
  return content
    .split("Ã‰lÃ©ment").join("Élément")
    .split("dÃ©fini").join("défini")
    .split("donnÃ©e").join("donnée")
    .split("vÃ©hicules").join("véhicules")
    .split("VÃ©hicules").join("Véhicules")
    .split("activitÃ©").join("activité")
    .split("financiÃ¨re").join("financière")
    .split("opÃ©rationnel").join("opérationnel")
    .split("opÃ©rations").join("opérations")
    .split("AccÃ¨s").join("Accès")
    .split("CrÃ©er").join("Créer")
    .split("crÃ©Ã©s").join("créés")
    .split("planifiÃ©s").join("planifiés")
    .split("confirmÃ©s").join("confirmés")
    .split("encaissÃ©").join("encaissé")
    .split("payÃ©es").join("payées")
    .split("rÃ©glÃ©es").join("réglées")
    .split("terminÃ©es").join("terminées")
    .split("finalisÃ©s").join("finalisés")
    .split("exÃ©cuter").join("exécuter")
    .split("DerniÃ¨res").join("Dernières")
    .split("rÃ©centes").join("récentes")
    .split("Ã ").join("à")
    .split("lâ€™").join("l’");
}

const filesToFix = [
  "src/runtime/dashboard/generic/ERPDashboardWidgetEngine.ts",
  "src/components/erp/dashboard/generic/widgets/ERPListWidget.tsx",
  "src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts",
];

for (const relativePath of filesToFix) {
  const before = read(relativePath);
  const after = fixEncoding(before);

  if (after !== before) {
    save(relativePath, after);
  }
}

const listWidgetPath =
  "src/components/erp/dashboard/generic/widgets/ERPListWidget.tsx";

save(
  listWidgetPath,
`import Link from "next/link";

import type {
  ERPDashboardWidgetProps,
} from "../registry/ERPDashboardWidgetRegistry";

function formatDashboardDate(
  value: unknown
): string {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "";
  }

  if (
    typeof value === "object" &&
    value &&
    "seconds" in value
  ) {
    const seconds =
      Number(
        (value as { seconds: number }).seconds
      );

    const date =
      new Date(seconds * 1000);

    if (!Number.isNaN(date.getTime())) {
      return date.toLocaleDateString("fr-FR");
    }
  }

  const text =
    String(value);

  const firestoreTimestampMatch =
    text.match(/seconds=(\\d+)/);

  if (firestoreTimestampMatch?.[1]) {
    const date =
      new Date(
        Number(firestoreTimestampMatch[1]) * 1000
      );

    if (!Number.isNaN(date.getTime())) {
      return date.toLocaleDateString("fr-FR");
    }
  }

  const date =
    new Date(text);

  if (!Number.isNaN(date.getTime())) {
    return date.toLocaleDateString("fr-FR");
  }

  return text;
}

function levelClassName(
  level?: "info" | "warning" | "critical"
): string {
  if (level === "critical") {
    return "border-red-400/30 bg-red-500/10 text-red-100";
  }

  if (level === "warning") {
    return "border-amber-400/30 bg-amber-500/10 text-amber-100";
  }

  return "border-white/10 bg-black/20 text-slate-100";
}

function levelLabel(
  level?: "info" | "warning" | "critical"
): string {
  if (level === "critical") {
    return "Critique";
  }

  if (level === "warning") {
    return "Attention";
  }

  return "Info";
}

export function ERPListWidget({
  widget,
}: ERPDashboardWidgetProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 shadow-2xl">
      <div className="mb-5">
        <h2 className="text-lg font-black text-white">
          {widget.title}
        </h2>

        {widget.description ? (
          <p className="mt-2 text-sm leading-6 text-slate-500">
            {widget.description}
          </p>
        ) : null}
      </div>

      <div className="space-y-3">
        {(widget.items ?? []).length === 0 ? (
          <p className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm font-semibold text-slate-400">
            Aucune donnée.
          </p>
        ) : (
          widget.items?.slice(0, 8).map((item) => {
            const formattedDate =
              formatDashboardDate(item.date);

            const content = (
              <div
                className={\`
                  rounded-2xl
                  border
                  p-4
                  text-sm
                  transition
                  hover:border-emerald-300/40
                  hover:bg-emerald-400/10
                  \${levelClassName(item.level)}
                \`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-bold text-white">
                      {item.title}
                    </div>

                    {item.description ? (
                      <div className="mt-1 text-xs font-semibold text-slate-500">
                        {item.description}
                      </div>
                    ) : null}

                    {formattedDate ? (
                      <div className="mt-1 text-xs font-semibold text-slate-500">
                        {formattedDate}
                      </div>
                    ) : null}
                  </div>

                  <span className="rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-slate-300">
                    {levelLabel(item.level)}
                  </span>
                </div>
              </div>
            );

            if (item.href) {
              return (
                <Link
                  key={item.id}
                  href={item.href}
                >
                  {content}
                </Link>
              );
            }

            return (
              <div key={item.id}>
                {content}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
`
);

const configPath =
  "src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts";

let config = read(configPath);
config = fixEncoding(config);

const alertBlock =
`    {
      key: "alertes-rdv-non-confirmes",
      type: "alert",
      moduleKey: "rendezvous",
      title: "RDV non confirmés",
      description: "Rendez-vous planifiés qui doivent être confirmés rapidement.",
      labelField: "motif",
      dateField: "dateRendezVous",
      href: "/rendezvous",
      level: "warning",
      limit: 6,
      filters: [
        {
          field: "statut",
          operator: "equals",
          value: "planifie",
        },
      ],
    },
    {
      key: "alertes-rappels-en-retard",
      type: "alert",
      moduleKey: "rappelsauto",
      title: "Rappels en retard",
      description: "Relances client à traiter aujourd’hui ou déjà dépassées.",
      labelField: "message",
      dateField: "dateRappel",
      href: "/rappelsauto",
      level: "critical",
      limit: 6,
      filters: [
        {
          field: "statut",
          operator: "notEquals",
          value: "traite",
        },
        {
          field: "dateRappel",
          operator: "lteDaysFromNow",
          value: 0,
        },
      ],
    },
    {
      key: "alertes-factures-impayees",
      type: "alert",
      moduleKey: "facturesauto",
      title: "Factures impayées",
      description: "Factures en attente ou partiellement réglées.",
      labelField: "numeroFacture",
      dateField: "dateFacture",
      href: "/facturesauto",
      level: "critical",
      limit: 6,
      filters: [
        {
          field: "statutPaiement",
          operator: "notEquals",
          value: "paye",
        },
      ],
    },
    {
      key: "alertes-interventions-ouvertes",
      type: "alert",
      moduleKey: "interventionsauto",
      title: "Interventions ouvertes",
      description: "Interventions à diagnostiquer, terminer ou facturer.",
      labelField: "typeIntervention",
      dateField: "dateIntervention",
      href: "/interventionsauto",
      level: "warning",
      limit: 6,
      filters: [
        {
          field: "statut",
          operator: "notEquals",
          value: "facturee",
        },
        {
          field: "statut",
          operator: "notEquals",
          value: "annulee",
        },
      ],
    },`;

if (!config.includes('key: "alertes-rdv-non-confirmes"')) {
  config = config.replace(
    `    {
      key: "conversion-funnel",`,
    alertBlock + `

    {
      key: "conversion-funnel",`
  );
}

save(configPath, config);

console.log("");
console.log("AMARKHYS dashboard pass 5 alerts installed.");
console.log("Done.");