"use client";

import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";

import { runtimeFirestore } from "@/runtime/firebase/runtime-firestore";

type LookupResult = {
  collection: string;
  id: string;
  exists: boolean;
  data?: Record<string, unknown>;
};

type PaymentRow = {
  id: string;
  clientId?: string;
  vehiculeId?: string;
  factureId?: string;
  montant?: unknown;
  datePaiement?: unknown;
  statut?: unknown;
};

const aliases: Record<string, string[]> = {
  clientId: ["clientsauto", "clients", "utilisateurs"],
  vehiculeId: ["vehicules", "vehiculesauto"],
  factureId: ["facturesauto", "factures"],
};

function value(record: Record<string, unknown> | undefined, key: string) {
  return String(record?.[key] ?? "").trim();
}

function formatLabel(collectionName: string, data?: Record<string, unknown>) {
  if (!data) return "";

  if (collectionName.includes("client") || collectionName === "utilisateurs") {
    return [
      value(data, "prenom"),
      value(data, "nom"),
      value(data, "raisonSociale"),
      value(data, "codeClient"),
      value(data, "telephone"),
    ].filter(Boolean).join(" · ");
  }

  if (collectionName.includes("vehicule")) {
    return [
      [value(data, "marque"), value(data, "modele")].filter(Boolean).join(" "),
      value(data, "vehicule"),
      value(data, "immatriculation"),
    ].filter(Boolean).join(" · ");
  }

  if (collectionName.includes("facture")) {
    return [
      value(data, "numeroFacture"),
      value(data, "reference"),
      value(data, "montantTTC"),
      value(data, "statutPaiement"),
    ].filter(Boolean).join(" · ");
  }

  return [
    value(data, "nom"),
    value(data, "label"),
    value(data, "code"),
    value(data, "id"),
  ].filter(Boolean).join(" · ");
}

async function lookupId(
  collections: string[],
  id: string
): Promise<LookupResult[]> {
  const results: LookupResult[] = [];

  for (const collectionName of collections) {
    try {
      const snapshot = await getDoc(
        doc(runtimeFirestore, collectionName, id)
      );

      results.push({
        collection: collectionName,
        id,
        exists: snapshot.exists(),
        data: snapshot.exists()
          ? {
              id: snapshot.id,
              ...snapshot.data(),
            }
          : undefined,
      });
    } catch (error) {
      results.push({
        collection: collectionName,
        id,
        exists: false,
        data: {
          error: String(error),
        },
      });
    }
  }

  return results;
}

export default function AmarkhysRelationDiagnosticsPage() {
  const [payments, setPayments] = useState<PaymentRow[]>([]);
  const [results, setResults] = useState<Record<string, LookupResult[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);

      const snapshot = await getDocs(
        collection(runtimeFirestore, "encaissementsauto")
      );

      const rows = snapshot.docs
        .map((item) => ({
          id: item.id,
          ...item.data(),
        })) as PaymentRow[];

      const latest = rows.slice(0, 10);
      setPayments(latest);

      const nextResults: Record<string, LookupResult[]> = {};

      for (const payment of latest) {
        for (const field of ["clientId", "vehiculeId", "factureId"] as const) {
          const id = String(payment[field] ?? "").trim();

          if (!id) continue;

          nextResults[payment.id + ":" + field] =
            await lookupId(aliases[field], id);
        }
      }

      setResults(nextResults);
      setLoading(false);
    }

    load().catch((error) => {
      console.error(error);
      setLoading(false);
    });
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 p-8 text-slate-50">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="rounded-3xl border border-white/10 bg-white/[0.05] p-6">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-emerald-300">
            Diagnostic AMARKHYS
          </p>
          <h1 className="mt-3 text-3xl font-black">
            Relations encaissements
          </h1>
          <p className="mt-3 text-sm text-slate-400">
            Cette page vérifie si les IDs client, véhicule et facture des encaissements existent réellement dans Firestore.
          </p>
        </section>

        {loading ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-6">
            Chargement diagnostic...
          </div>
        ) : null}

        <section className="space-y-5">
          {payments.map((payment) => (
            <div
              key={payment.id}
              className="rounded-3xl border border-white/10 bg-white/[0.05] p-6"
            >
              <h2 className="text-xl font-black">
                Encaissement {payment.id}
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Montant : {String(payment.montant ?? "")} · Statut : {String(payment.statut ?? "")}
              </p>

              <div className="mt-5 grid gap-4 lg:grid-cols-3">
                {(["clientId", "vehiculeId", "factureId"] as const).map((field) => {
                  const id = String(payment[field] ?? "").trim();
                  const key = payment.id + ":" + field;
                  const fieldResults = results[key] ?? [];

                  return (
                    <div
                      key={field}
                      className="rounded-2xl border border-white/10 bg-black/20 p-4"
                    >
                      <p className="text-xs font-black uppercase tracking-wide text-slate-400">
                        {field}
                      </p>

                      <p className="mt-2 break-all text-sm font-bold text-white">
                        {id || "Aucun ID"}
                      </p>

                      <div className="mt-4 space-y-3">
                        {fieldResults.map((result) => (
                          <div
                            key={result.collection}
                            className={
                              result.exists
                                ? "rounded-xl border border-emerald-300/30 bg-emerald-400/10 p-3"
                                : "rounded-xl border border-red-300/30 bg-red-500/10 p-3"
                            }
                          >
                            <p className="text-sm font-black">
                              {result.collection} : {result.exists ? "TROUVÉ" : "ABSENT"}
                            </p>

                            {result.exists ? (
                              <p className="mt-2 text-xs leading-5 text-slate-300">
                                {formatLabel(result.collection, result.data)}
                              </p>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
