"use client";

import {
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { Button } from "@/components/ui/Button";

import { FormField } from "@/components/form/FormField";

import { SelectField } from "@/components/form/SelectField";

import { useAuth } from "@/providers/AuthProvider";

import { UtilisateurService } from "@/services/UtilisateurService";

import { TerrainService } from "@/features/terrains/services/TerrainService";

import { ExploitationService } from "@/features/exploitations/services/ExploitationService";

export default function NouveauTerrainPage() {

  const router = useRouter();

  const { user } = useAuth();

  const [nom, setNom] =
    useState("");

  const [categorie, setCategorie] =
    useState("");

  const [exploitationId,
    setExploitationId] =
    useState("");

  const [exploitations,
    setExploitations] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    loadExploitations();

  }, [user]);

  const loadExploitations = async () => {

    try {

      if (!user) {
        return;
      }

      const utilisateur =
        await UtilisateurService.getById(
          user.uid
        );

      if (!utilisateur) {
        return;
      }

      const data =
        await ExploitationService.getAllByOrganisation(
          utilisateur.organisationId
        );

      setExploitations(data);

    } catch (err) {

      console.error(err);

    }
  };

  const handleCreate = async () => {

    try {

      if (!user) {
        return;
      }

      setLoading(true);

      const utilisateur =
        await UtilisateurService.getById(
          user.uid
        );

      if (!utilisateur) {
        return;
      }

      const exploitation =
        exploitations.find(
          (item) =>
            item.id === exploitationId
        );

      await TerrainService.create({

        organisationId:
          utilisateur.organisationId,

        nom,

        categorie,

        exploitationId,

        exploitationNom:
          exploitation?.nom ?? "",

        createdAt:
          new Date().toISOString(),
      });

      toast.success(
        "Terrain créé"
      );

      router.push("/terrains");

    } catch (err) {

      console.error(err);

      toast.error(
        "Erreur création terrain"
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="p-10">

      <div className="
        max-w-xl
        bg-white
        rounded-2xl
        shadow-md
        p-6
        space-y-6
      ">

        <div>

          <h1 className="text-3xl font-bold">
            Nouveau Terrain
          </h1>

        </div>

        <FormField
          label="Nom"
          inputProps={{
            value: nom,
            onChange: (e) =>
              setNom(e.target.value),
          }}
        />

        <FormField
          label="Catégorie"
          inputProps={{
            value: categorie,
            onChange: (e) =>
              setCategorie(
                e.target.value
              ),
          }}
        />

        <SelectField
          label="Exploitation"
          value={exploitationId}
          onChange={setExploitationId}
          options={exploitations.map(
            (item) => ({
              label: item.nom,
              value: item.id,
            })
          )}
        />

        <Button
          onClick={handleCreate}
          disabled={loading}
          className="w-full"
        >
          {loading
            ? "Création..."
            : "Créer"}
        </Button>

      </div>

    </div>
  );
}
