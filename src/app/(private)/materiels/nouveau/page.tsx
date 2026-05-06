"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { MaterielService } from "@/features/materiels/services/MaterielService";
import { EnterpriseMaterielFlow } from "@/features/materiels/runtime/EnterpriseMaterielFlow";

export default function NouveauMaterielPage() {
  const router = useRouter();

  const [nom, setNom] = useState("");
  const [categorie, setCategorie] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!nom || !categorie) {
      alert("Veuillez renseigner le nom et la catégorie.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        organisationId: "ORG-001",
        nom,
        categorie,
        createdAt: new Date().toISOString(),
      };

      await MaterielService.create(payload);

      const flow = new EnterpriseMaterielFlow();

      await flow.create(payload);

      router.push("/materiels");
    } catch (error) {
      console.error("Erreur création matériel", error);
      alert("Erreur lors de la création du matériel.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-10">
      <div className="bg-white rounded-2xl shadow-md p-6 max-w-xl">
        <h1 className="text-3xl font-bold mb-6">
          Nouveau Matériel
        </h1>

        <div className="flex flex-col gap-4">
          <input
            value={nom}
            onChange={event => setNom(event.target.value)}
            placeholder="Nom du matériel"
            className="border rounded-xl px-4 py-3"
          />

          <input
            value={categorie}
            onChange={event => setCategorie(event.target.value)}
            placeholder="Catégorie"
            className="border rounded-xl px-4 py-3"
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-green-600 text-white rounded-xl px-4 py-3 font-semibold disabled:opacity-50"
          >
            {loading ? "Création..." : "Créer le matériel"}
          </button>
        </div>
      </div>
    </div>
  );
}