"use client";

import { useEffect, useState } from "react";
import { db } from "@/infrastructure/firebase/firebase";

import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import { formatDisplayValue } from "@/core/utils/formatFirestoreDate";
import { ERPDynamicForm } from "@/components/erp/forms/ERPDynamicForm";

import "@/runtime/listeners/MaintenanceNotificationListener";
import "@/runtime/listeners/MaintenanceAuditListener";

import { runtimeEventBus } from "@/runtime/bus/RuntimeEventBus";
import { MAINTENANCE_INCIDENT_CREATED } from "@/runtime/events/MaintenanceEvents";

export default function MaintenancePage() {
  const [incidents, setIncidents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadIncidents() {
    const snapshot = await getDocs(collection(db, "maintenance"));

    setIncidents(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    );
  }

  useEffect(() => {
    loadIncidents();
  }, []);

  async function createIncident() {
    setLoading(true);

    const payload = {
      materiel: "Tracteur Démo",
      type: "panne",
      criticite: "moyenne",
      statut: "ouverte",
      description: "Panne moteur détectée pendant exploitation.",
      createdAt: serverTimestamp(),
    };

    await addDoc(collection(db, "maintenance"), payload);

    await runtimeEventBus.emit(
      MAINTENANCE_INCIDENT_CREATED,
      {
        materiel: "Tracteur Démo",
        type: "panne",
        criticite: "moyenne",
      }
    );

    setLoading(false);
    await loadIncidents();
  }

  return (
    <div className="p-10 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Maintenance</h1>
          <p className="mt-2 text-gray-500">
            Gestion des incidents matériels ERP
          </p>
        </div>

        <button
          onClick={createIncident}
          disabled={loading}
          className="rounded-xl bg-red-600 px-4 py-2 text-white"
        >
          {loading ? "Création..." : "Déclarer une panne"}
        </button>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold">
          Formulaire dynamique ERP
        </h2>

        <ERPDynamicForm
          module="maintenance"
          context={{
            role: "superviseur",
            criticite: "critical",
            materielType: "tracteur",
          }}
        />
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold">
          Incidents déclarés
        </h2>

        {incidents.length === 0 ? (
          <p className="text-gray-500">Aucun incident déclaré.</p>
        ) : (
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b">
                <th className="p-3">Matériel</th>
                <th className="p-3">Type</th>
                <th className="p-3">Criticité</th>
                <th className="p-3">Statut</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>

            <tbody>
              {incidents.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="p-3">{formatDisplayValue(item.materiel)}</td>
                  <td className="p-3">{formatDisplayValue(item.type)}</td>
                  <td className="p-3">{formatDisplayValue(item.criticite)}</td>
                  <td className="p-3">{formatDisplayValue(item.statut)}</td>
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
