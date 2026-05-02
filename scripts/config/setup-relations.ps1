Write-Host "Generating Terragest SelectField..." -ForegroundColor Cyan

# =====================================================
# FORM DIRECTORY
# =====================================================

mkdir "src\components\form" -Force

# =====================================================
# SELECT FIELD COMPONENT
# =====================================================

$selectField = @'
interface Option {

  label: string;

  value: string;
}

interface SelectFieldProps {

  label: string;

  value: string;

  onChange: (
    value: string
  ) => void;

  options: Option[];

  placeholder?: string;

  error?: string;
}

export const SelectField = ({
  label,
  value,
  onChange,
  options,
  placeholder = "Sélectionner",
  error,
}: SelectFieldProps) => {

  return (

    <div className="space-y-2">

      <label className="font-medium">

        {label}

      </label>

      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="
          w-full
          border
          rounded-xl
          p-3
          bg-white
        "
      >

        <option value="">
          {placeholder}
        </option>

        {options.map((option) => (

          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>

        ))}

      </select>

      {error && (

        <p className="text-red-500 text-sm">

          {error}

        </p>

      )}

    </div>
  );
}
'@

Set-Content `
"src\components\form\SelectField.tsx" `
$selectField

# =====================================================
# UPDATE TERRAIN TYPE
# =====================================================

$terrainType = @'
export interface Terrain {

  id: string;

  organisationId: string;

  nom: string;

  categorie: string;

  exploitationId: string;

  exploitationNom: string;

  createdAt: string;
}
'@

Set-Content `
"src\features\terrains\types\Terrain.ts" `
$terrainType

# =====================================================
# UPDATE TERRAIN NEW PAGE
# =====================================================

$newTerrainPage = @'
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
'@

Set-Content `
"src\app\(private)\terrains\nouveau\page.tsx" `
$newTerrainPage

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Terragest SelectField generated successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Generated:" -ForegroundColor Yellow
Write-Host "- SelectField"
Write-Host "- Terrain relation"
Write-Host "- Exploitation relation"
Write-Host "- Relational ERP base"
Write-Host ""