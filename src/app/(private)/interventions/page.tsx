"use client";

import { formatDisplayValue } from "@/core/utils/formatFirestoreDate";
import { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "@/infrastructure/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function InterventionsPage() {
  const [interventions, setInterventions] = useState<any[]>([]);

  useEffect(() => {
    async function loadInterventions() {
      const snapshot = await getDocs(collection(db, "interventions"));
      setInterventions(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    }

    loadInterventions();
  }, []);

  return (
    <div className="p-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Interventions</h1>
          <p className="mt-2 text-gray-500">
            Suivi des interventions ERP Terragest
          </p>
        </div>

        <Link
          href="/interventions/nouveau"
          className="rounded-xl bg-green-600 px-4 py-2 text-white"
        >
          Nouvelle intervention
        </Link>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-md">
        {interventions.length === 0 ? (
          <p className="text-gray-500">Aucune intervention trouvée.</p>
        ) : (
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b">
                <th className="p-3">Type</th>
                <th className="p-3">Statut</th>
                <th className="p-3">Description</th>
                <th className="p-3">Créée le</th>
              </tr>
            </thead>
            <tbody>
              {interventions.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="p-3">{formatDisplayValue(item.type)}</td>
                  <td className="p-3">{formatDisplayValue(item.statut)}</td>
                  <td className="p-3">{formatDisplayValue(item.description)}</td>
                  <td className="p-3">{formatDisplayValue(item.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
