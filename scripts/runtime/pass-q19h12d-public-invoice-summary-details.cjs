const fs = require("fs");
const path = require("path");

const root = process.cwd();

function p(rel) {
  return path.join(root, rel);
}

function ensureDir(rel) {
  fs.mkdirSync(p(rel), { recursive: true });
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
  ensureDir(path.dirname(rel));
  fs.writeFileSync(p(rel), content, "utf8");
  console.log("[WRITTEN]", rel);
}

const invoicePage =
  "src/app/facture/[token]/page.tsx";

backup(invoicePage, ".bak-q19h12d-summary-details");

let content =
  fs.readFileSync(p(invoicePage), "utf8");

/**
 * 1) Ajouter l'import ArrowRight si absent.
 */
if (!content.includes("ArrowRight,")) {
  content = content.replace(
    "ArrowLeft,",
    "ArrowLeft,\n  ArrowRight,"
  );
}

/**
 * 2) Remplacer les cartes d'information facture par une version regroupée.
 * On cible le bloc entre "Informations facture" et "Paiement".
 */
const startMarker =
  `<p className="mb-4 text-xs font-black uppercase tracking-[0.26em] text-[#8a640f]">
                    Informations facture
                  </p>`;

const paymentMarker =
  `<p className="mb-4 text-xs font-black uppercase tracking-[0.26em] text-[#8a640f]">
                    Paiement
                  </p>`;

const startIndex =
  content.indexOf(startMarker);

const paymentIndex =
  content.indexOf(paymentMarker);

if (startIndex !== -1 && paymentIndex !== -1 && paymentIndex > startIndex) {
  const before =
    content.slice(0, startIndex);

  const after =
    content.slice(paymentIndex);

  const newSummaryBlock = String.raw`<p className="mb-4 text-xs font-black uppercase tracking-[0.26em] text-[#8a640f]">
                    Synthèse facture
                  </p>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-[1.25rem] border border-[#e8dcc0] bg-white p-5 shadow-sm">
                      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#e8dcc0] bg-[#fffaf0]">
                        <FileText className="h-5 w-5 text-[#0f766e]" />
                      </div>

                      <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                        Facture
                      </p>

                      <p className="mt-3 text-lg font-black text-[#0f172a]">
                        {summary.numero}
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-600">
                        Date : {summary.date || "-"}
                      </p>
                    </div>

                    <div className="rounded-[1.25rem] border border-[#e8dcc0] bg-white p-5 shadow-sm">
                      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#e8dcc0] bg-[#fffaf0]">
                        <Car className="h-5 w-5 text-[#0f766e]" />
                      </div>

                      <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                        Client & véhicule
                      </p>

                      <p className="mt-3 text-lg font-black text-[#0f172a]">
                        {buildClientLabel(client)}
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-600">
                        {buildVehicleLabel(vehicule)}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="mb-4 text-xs font-black uppercase tracking-[0.26em] text-[#8a640f]">
                    Intervention
                  </p>

                  <div className="rounded-[1.25rem] border border-[#e8dcc0] bg-white p-5 shadow-sm">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-lg font-black text-[#0f172a]">
                          {buildInterventionLabel(intervention)}
                        </p>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                          Cette facture présente la synthèse financière. Le détail des actes,
                          prestations, quantités et prix est disponible dans une page dédiée.
                        </p>
                      </div>

                      <Link
                        href={"/facture/" + token + "/details"}
                        className="inline-flex shrink-0 items-center justify-center gap-3 rounded-xl border border-[#0f766e]/20 bg-[#0f766e] px-5 py-3 text-sm font-black text-white shadow-[0_18px_40px_rgba(15,118,110,0.22)] transition hover:bg-[#115e59]"
                      >
                        Voir le détail
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>

                <div>
                  `;

  content =
    before +
    newSummaryBlock +
    after;
}

write(invoicePage, content);

/**
 * 3) Créer la page détail facture.
 */
const detailsPage =
  "src/app/facture/[token]/details/page.tsx";

backup(detailsPage, ".bak-q19h12d-summary-details");

write(detailsPage, String.raw`"use client";

import Link from "next/link";
import {
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  ArrowLeft,
  Car,
  FileText,
  MessageCircle,
  Phone,
  Receipt,
  Wrench,
} from "lucide-react";

import {
  RuntimeDataBinding,
} from "@/runtime/data-binding";

import {
  facturesautoModule,
} from "@/runtime/modules/generated/facturesauto";

import {
  clientsautoModule,
} from "@/runtime/modules/generated/clientsauto";

import {
  vehiculesModule,
} from "@/runtime/modules/generated/vehicules";

import {
  interventionsautoModule,
} from "@/runtime/modules/generated/interventionsauto";

import {
  lignesinterventionautoModule,
} from "@/runtime/modules/generated/lignesinterventionauto";

import {
  buildAmarkhysTelHref,
  buildAmarkhysWhatsAppHref,
} from "@/runtime/workspaces/amarkhys/amarkhysBusinessIdentity";

type RecordData = Record<string, unknown>;

interface PublicInvoiceDetailsPageProps {
  params: Promise<{
    token: string;
  }>;
}

function value(
  record: RecordData | null | undefined,
  key: string,
  fallback = ""
): string {
  const raw =
    record?.[key];

  if (
    raw === null ||
    raw === undefined
  ) {
    return fallback;
  }

  return String(raw);
}

function amount(
  record: RecordData | null | undefined,
  key: string
): number {
  return Number(record?.[key] ?? 0);
}

function formatMoney(
  value: number
): string {
  return value.toLocaleString("fr-FR") + " FCFA";
}

function buildInvoiceNumber(
  invoice: RecordData
): string {
  return value(
    invoice,
    "numeroFacture",
    value(invoice, "reference", "Facture")
  );
}

function buildClientLabel(
  client: RecordData | null
): string {
  if (!client) {
    return "Client non renseigné";
  }

  return [
    value(client, "prenom"),
    value(client, "nom"),
  ]
    .filter(Boolean)
    .join(" ")
    .trim() ||
    value(client, "raisonSociale", "Client");
}

function buildVehicleLabel(
  vehicule: RecordData | null
): string {
  if (!vehicule) {
    return "Véhicule non renseigné";
  }

  return [
    [value(vehicule, "marque"), value(vehicule, "modele")]
      .filter(Boolean)
      .join(" ")
      .trim(),
    value(vehicule, "immatriculation"),
  ]
    .filter(Boolean)
    .join(" • ") || "Véhicule";
}

function buildLineLabel(
  line: RecordData
): string {
  return (
    value(line, "designation") ||
    value(line, "produitNom") ||
    value(line, "libelle") ||
    value(line, "nom") ||
    "Acte atelier"
  );
}

function buildLineType(
  line: RecordData
): string {
  return (
    value(line, "typeLigne") ||
    value(line, "typeArticle") ||
    value(line, "categorie") ||
    "Prestation"
  );
}

async function findInvoiceByToken(
  token: string
): Promise<RecordData | null> {
  const invoices =
    await RuntimeDataBinding.list(facturesautoModule);

  return (
    invoices.find((invoice) => {
      return (
        value(invoice, "publicToken") === token ||
        value(invoice, "token") === token ||
        value(invoice, "id") === token ||
        value(invoice, "_id") === token
      );
    }) ?? null
  );
}

async function loadRelatedRecord(
  module: any,
  id: string
): Promise<RecordData | null> {
  if (!id) {
    return null;
  }

  try {
    return await RuntimeDataBinding.detail(
      module,
      id
    );
  } catch {
    return null;
  }
}

async function loadInterventionLines(
  interventionId: string
): Promise<RecordData[]> {
  if (!interventionId) {
    return [];
  }

  try {
    const lines =
      await RuntimeDataBinding.list(lignesinterventionautoModule);

    return lines.filter((line) => {
      return value(line, "interventionId") === interventionId;
    });
  } catch {
    return [];
  }
}

export default function PublicInvoiceDetailsPage({
  params,
}: PublicInvoiceDetailsPageProps) {
  const [token, setToken] =
    useState("");

  const [invoice, setInvoice] =
    useState<RecordData | null>(null);

  const [client, setClient] =
    useState<RecordData | null>(null);

  const [vehicule, setVehicule] =
    useState<RecordData | null>(null);

  const [intervention, setIntervention] =
    useState<RecordData | null>(null);

  const [lines, setLines] =
    useState<RecordData[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    let mounted = true;

    async function resolveParams() {
      const resolved =
        await params;

      if (mounted) {
        setToken(resolved.token);
      }
    }

    resolveParams();

    return () => {
      mounted = false;
    };
  }, [params]);

  useEffect(() => {
    if (!token) {
      return;
    }

    let mounted = true;

    async function loadData() {
      setLoading(true);

      const loadedInvoice =
        await findInvoiceByToken(token);

      if (!mounted) {
        return;
      }

      setInvoice(loadedInvoice);

      if (!loadedInvoice) {
        setLoading(false);
        return;
      }

      const interventionId =
        value(loadedInvoice, "interventionId");

      const [
        loadedClient,
        loadedVehicule,
        loadedIntervention,
        loadedLines,
      ] =
        await Promise.all([
          loadRelatedRecord(
            clientsautoModule,
            value(loadedInvoice, "clientId")
          ),
          loadRelatedRecord(
            vehiculesModule,
            value(loadedInvoice, "vehiculeId")
          ),
          loadRelatedRecord(
            interventionsautoModule,
            interventionId
          ),
          loadInterventionLines(
            interventionId
          ),
        ]);

      if (mounted) {
        setClient(loadedClient);
        setVehicule(loadedVehicule);
        setIntervention(loadedIntervention);
        setLines(loadedLines);
        setLoading(false);
      }
    }

    loadData().catch(() => {
      if (mounted) {
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
    };
  }, [token]);

  const totals =
    useMemo(() => {
      const montantHT =
        lines.reduce(
          (sum, line) =>
            sum + amount(line, "montantHT"),
          0
        );

      const montantTVA =
        lines.reduce(
          (sum, line) =>
            sum + amount(line, "montantTVA"),
          0
        );

      const montantTTC =
        lines.reduce(
          (sum, line) =>
            sum + amount(line, "montantTTC"),
          0
        );

      return {
        montantHT:
          montantHT || amount(invoice, "montantHT"),
        montantTVA:
          montantTVA || amount(invoice, "montantTVA"),
        montantTTC:
          montantTTC || amount(invoice, "montantTTC"),
      };
    }, [invoice, lines]);

  const whatsappText =
    invoice
      ? [
          "Bonjour,",
          "",
          "Je consulte le détail de ma facture AMARKHYS : " +
            buildInvoiceNumber(invoice),
        ].join("\n")
      : "";

  if (loading) {
    return (
      <main className="min-h-screen bg-[#020807] px-5 py-8 text-white">
        <div className="mx-auto max-w-5xl rounded-[1.6rem] border border-[#23ead4]/24 bg-white/[0.045] p-8 shadow-[0_38px_110px_rgba(0,0,0,0.55)] backdrop-blur-xl">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-[#23ead4]">
            AMARKHYS
          </p>
          <h1 className="mt-4 text-3xl font-black">
            Chargement du détail...
          </h1>
        </div>
      </main>
    );
  }

  if (!invoice) {
    return (
      <main className="min-h-screen bg-[#020807] px-5 py-8 text-white">
        <div className="mx-auto max-w-5xl rounded-[1.6rem] border border-red-400/25 bg-red-500/10 p-8 shadow-[0_38px_110px_rgba(0,0,0,0.55)] backdrop-blur-xl">
          <h1 className="text-3xl font-black">
            Détail introuvable
          </h1>

          <Link
            href="/"
            className="mt-6 inline-flex rounded-xl bg-gradient-to-r from-[#f5c04a] via-[#d7a83f] to-[#9a6a17] px-5 py-3 text-sm font-black uppercase tracking-wide text-[#0b0b05]"
          >
            Retour au site AMARKHYS
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020807] px-5 py-7 text-white sm:px-8 lg:px-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_10%,rgba(35,234,212,0.10),transparent_30%),radial-gradient(circle_at_84%_8%,rgba(215,168,63,0.10),transparent_24%),radial-gradient(circle_at_70%_80%,rgba(7,95,83,0.34),transparent_34%),linear-gradient(135deg,#020807_0%,#03130f_50%,#020807_100%)]" />
      <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:46px_46px]" />

      <section className="relative mx-auto max-w-[1240px]">
        <header className="mb-7">
          <Link
            href={"/facture/" + token}
            className="mb-5 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.045] px-4 py-2 text-xs font-black text-slate-200 transition hover:border-[#23ead4]/30 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour à la facture
          </Link>

          <div className="flex items-end gap-4">
            <h1 className="text-4xl font-black uppercase tracking-tight text-white sm:text-5xl">
              AMARKHYS
            </h1>

            <span className="pb-1 text-xl font-black text-slate-300">
              Garage
            </span>
          </div>

          <h2 className="mt-6 text-3xl font-black text-white sm:text-4xl">
            Détail de l’intervention
          </h2>

          <p className="mt-2 max-w-2xl text-base leading-7 text-slate-300">
            Actes, prestations, quantités et prix liés à la facture {buildInvoiceNumber(invoice)}.
          </p>
        </header>

        <div className="grid gap-5 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="overflow-hidden rounded-[1.6rem] border border-[#d7a83f]/24 bg-[#fffaf0] text-[#0f172a] shadow-[0_38px_110px_rgba(0,0,0,0.58)] ring-1 ring-[#d7a83f]/18">
              <div className="border-b border-[#e8dcc0] bg-gradient-to-br from-white via-[#fffaf0] to-[#f5eddc] p-6 sm:p-8">
                <div className="flex gap-4">
                  <span className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[#d7a83f]/45 bg-[#2b2208] text-[#f8d479] shadow-[0_0_35px_rgba(215,168,63,0.16)]">
                    <Wrench className="h-8 w-8" />
                  </span>

                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.28em] text-[#0f766e]">
                      Détail atelier
                    </p>

                    <h3 className="mt-2 text-3xl font-black text-[#0f172a]">
                      {value(intervention, "typeIntervention", "Intervention")}
                    </h3>

                    <p className="mt-1 text-sm font-semibold text-slate-600">
                      {buildClientLabel(client)} • {buildVehicleLabel(vehicule)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <div className="mb-6 grid gap-4 md:grid-cols-3">
                  <div className="rounded-[1.25rem] border border-[#e8dcc0] bg-white p-5">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
                      Total HT
                    </p>
                    <p className="mt-3 text-xl font-black text-[#0f172a]">
                      {formatMoney(totals.montantHT)}
                    </p>
                  </div>

                  <div className="rounded-[1.25rem] border border-[#e8dcc0] bg-white p-5">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
                      TVA
                    </p>
                    <p className="mt-3 text-xl font-black text-[#0f172a]">
                      {formatMoney(totals.montantTVA)}
                    </p>
                  </div>

                  <div className="rounded-[1.25rem] border border-[#d7a83f]/45 bg-[#fff6d8] p-5">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
                      Total TTC
                    </p>
                    <p className="mt-3 text-xl font-black text-[#8a640f]">
                      {formatMoney(totals.montantTTC)}
                    </p>
                  </div>
                </div>

                <div className="overflow-hidden rounded-[1.25rem] border border-[#e8dcc0] bg-white">
                  <div className="grid grid-cols-12 gap-3 border-b border-[#e8dcc0] bg-[#fffaf0] px-5 py-4 text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                    <div className="col-span-5">Acte</div>
                    <div className="col-span-2 text-right">Qté</div>
                    <div className="col-span-2 text-right">PU HT</div>
                    <div className="col-span-3 text-right">Total TTC</div>
                  </div>

                  {lines.length > 0 ? (
                    lines.map((line) => (
                      <div
                        key={value(line, "id", value(line, "_id", buildLineLabel(line)))}
                        className="grid grid-cols-12 gap-3 border-b border-[#f1e7d2] px-5 py-4 last:border-b-0"
                      >
                        <div className="col-span-5">
                          <p className="text-sm font-black text-[#0f172a]">
                            {buildLineLabel(line)}
                          </p>
                          <p className="mt-1 text-xs font-semibold text-slate-500">
                            {buildLineType(line)}
                          </p>
                        </div>

                        <div className="col-span-2 text-right text-sm font-black text-[#0f172a]">
                          {amount(line, "quantite") || 1}
                        </div>

                        <div className="col-span-2 text-right text-sm font-black text-[#0f172a]">
                          {formatMoney(amount(line, "prixUnitaireHT") || amount(line, "prixUnitaire"))}
                        </div>

                        <div className="col-span-3 text-right text-sm font-black text-[#8a640f]">
                          {formatMoney(amount(line, "montantTTC") || amount(line, "montantTotal"))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="px-5 py-6">
                      <p className="text-sm font-bold leading-6 text-slate-600">
                        Le détail ligne par ligne n’est pas encore exposé pour cette facture.
                        AMARKHYS peut vous communiquer le détail technique complet si nécessaire.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-7 space-y-5">
              <div className="rounded-[1.6rem] border border-[#d7a83f]/32 bg-gradient-to-br from-[#241d08]/86 via-[#06231f]/92 to-[#04110f] p-6 text-white shadow-[0_34px_100px_rgba(0,0,0,0.48)] ring-1 ring-[#23ead4]/10">
                <p className="text-xs font-black uppercase tracking-[0.26em] text-[#f8d479]">
                  Actions rapides
                </p>

                <div className="mt-5 grid gap-3">
                  <a
                    href={buildAmarkhysWhatsAppHref(whatsappText)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#f5c04a] via-[#d7a83f] to-[#9a6a17] px-5 py-4 text-sm font-black uppercase tracking-wide text-[#0b0b05]"
                  >
                    <MessageCircle className="h-5 w-5" />
                    WhatsApp
                  </a>

                  <a
                    href={buildAmarkhysTelHref()}
                    className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#23ead4]/24 bg-black/18 px-5 py-4 text-sm font-black text-white"
                  >
                    <Phone className="h-5 w-5 text-[#37ffe4]" />
                    Appeler
                  </a>

                  <Link
                    href={"/facture/" + token}
                    className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#23ead4]/24 bg-black/18 px-5 py-4 text-sm font-black text-white"
                  >
                    <Receipt className="h-5 w-5 text-[#37ffe4]" />
                    Synthèse facture
                  </Link>
                </div>
              </div>

              <div className="rounded-[1.35rem] border border-[#23ead4]/35 bg-gradient-to-br from-[#087264] via-[#065147] to-[#04211d] p-6 text-white shadow-[0_34px_100px_rgba(0,0,0,0.48)] ring-1 ring-[#23ead4]/16">
                <FileText className="h-8 w-8 text-[#37ffe4]" />
                <p className="mt-5 text-sm font-black uppercase tracking-[0.16em] text-[#37ffe4]">
                  Détail client
                </p>

                <p className="mt-3 text-sm leading-6 text-cyan-50/85">
                  Cette page détaille les actes et prix liés à l’intervention.
                  Elle peut évoluer vers un relevé complet de diagnostic.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
`);

console.log("");
console.log("[Q19H12D_DONE] Public invoice summary grouped and detail page created.");
console.log("");
console.log("Next:");
console.log("  pnpm build");