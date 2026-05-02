Write-Host "Generating Terragest ERP CRUD Module Generator..." -ForegroundColor Cyan

# =====================================================
# CONFIGURATION
# =====================================================

$moduleName = Read-Host "Module name (example: ressources)"

$moduleLabel = Read-Host "Module label (example: Ressources)"

$moduleTypeName = Read-Host "Type name (example: Ressource)"

# =====================================================
# PATHS
# =====================================================

$basePath =
"src\app\(private)\$moduleName"

$typePath =
"src\features\$moduleName\types"

$servicePath =
"src\features\$moduleName\services"

# =====================================================
# DIRECTORIES
# =====================================================

mkdir $basePath -Force
mkdir "$basePath\nouveau" -Force
mkdir "$basePath\[id]" -Force
mkdir "$basePath\[id]\edit" -Force

mkdir $typePath -Force
mkdir $servicePath -Force

# =====================================================
# TYPE
# =====================================================

$typeContent = @"
export interface $moduleTypeName {

  id: string;

  organisationId: string;

  nom: string;

  categorie: string;

  createdAt: string;
}
"@

Set-Content `
"$typePath\$moduleTypeName.ts" `
$typeContent

# =====================================================
# SERVICE
# =====================================================

$serviceContent = @"
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase/firebase";

import { COLLECTIONS } from "@/constants/collections";

export const ${moduleTypeName}Service = {

  async create(data: any) {

    return addDoc(
      collection(
        db,
        COLLECTIONS.$($moduleName.ToUpper())
      ),
      data
    );
  },

  async getById(id: string) {

    const snapshot = await getDoc(
      doc(
        db,
        COLLECTIONS.$($moduleName.ToUpper()),
        id
      )
    );

    if (!snapshot.exists()) {
      return null;
    }

    return {
      id: snapshot.id,
      ...snapshot.data(),
    };
  },

  async update(
    id: string,
    data: any
  ) {

    return updateDoc(
      doc(
        db,
        COLLECTIONS.$($moduleName.ToUpper()),
        id
      ),
      data
    );
  },

  async delete(id: string) {

    return deleteDoc(
      doc(
        db,
        COLLECTIONS.$($moduleName.ToUpper()),
        id
      )
    );
  },

  async getAllByOrganisation(
    organisationId: string
  ) {

    const q = query(
      collection(
        db,
        COLLECTIONS.$($moduleName.ToUpper())
      ),
      where(
        "organisationId",
        "==",
        organisationId
      )
    );

    const snapshot =
      await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },
};
"@

Set-Content `
"$servicePath\$($moduleTypeName)Service.ts" `
$serviceContent

# =====================================================
# LIST PAGE
# =====================================================

$listPage = @"
"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { DataTable } from "@/components/data-table/DataTable";

import { useAuth } from "@/providers/AuthProvider";

import { UtilisateurService } from "@/services/UtilisateurService";

import { ${moduleTypeName}Service } from "@/features/$moduleName/services/${moduleTypeName}Service";

import { $moduleTypeName } from "@/features/$moduleName/types/$moduleTypeName";

export default function ${moduleTypeName}Page() {

  const router = useRouter();

  const { user } = useAuth();

  const [items, setItems] =
    useState<$moduleTypeName[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    if (user) {
      loadItems();
    }

  }, [user]);

  const loadItems = async () => {

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
        await ${moduleTypeName}Service.getAllByOrganisation(
          utilisateur.organisationId
        );

      setItems(data as $moduleTypeName[]);

    } catch (err) {

      console.error(err);

      toast.error(
        "Erreur chargement"
      );

    } finally {

      setLoading(false);

    }
  };

  const handleDelete = async (
    id: string
  ) => {

    const confirmed =
      window.confirm(
        "Supprimer ?"
      );

    if (!confirmed) {
      return;
    }

    try {

      await ${moduleTypeName}Service.delete(id);

      toast.success(
        "Suppression effectuée"
      );

      setItems((prev) =>
        prev.filter(
          (item) => item.id !== id
        )
      );

    } catch (err) {

      console.error(err);

      toast.error(
        "Erreur suppression"
      );
    }
  };

  if (loading) {

    return (
      <main className="p-10">
        Chargement...
      </main>
    );
  }

  return (

    <div className="p-10 space-y-6">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            $moduleLabel
          </h1>

        </div>

        <Link
          href="/$moduleName/nouveau"
          className="bg-black text-white px-4 py-3 rounded-xl"
        >
          Nouveau
        </Link>

      </div>

      <DataTable
        columns={[
          {
            key: "nom",
            label: "Nom",
          },
          {
            key: "categorie",
            label: "Catégorie",
          },
        ]}
        data={items}
        actions={[
          {
            label: "Voir",
            onClick: (row) =>
              router.push(
                "/$moduleName/" + row.id
              ),
          },
          {
            label: "Modifier",
            onClick: (row) =>
              router.push(
                "/$moduleName/" +
                row.id +
                "/edit"
              ),
            className:
              "px-3 py-2 rounded-lg bg-blue-600 text-white",
          },
          {
            label: "Supprimer",
            onClick: (row) =>
              handleDelete(row.id),
            className:
              "px-3 py-2 rounded-lg bg-red-600 text-white",
          },
        ]}
      />

    </div>
  );
}
"@

Set-Content `
"$basePath\page.tsx" `
$listPage

# =====================================================
# NEW PAGE
# =====================================================

$newPage = @"
"use client";

export default function Nouveau${moduleTypeName}Page() {

  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold">
        Nouveau $moduleLabel
      </h1>

    </div>
  );
}
"@

Set-Content `
"$basePath\nouveau\page.tsx" `
$newPage

# =====================================================
# DETAIL PAGE
# =====================================================

$detailPage = @"
"use client";

export default function ${moduleTypeName}DetailPage() {

  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold">
        Detail $moduleLabel
      </h1>

    </div>
  );
}
"@

Set-Content `
-LiteralPath "$basePath\[id]\page.tsx" `
-Value $detailPage

# =====================================================
# EDIT PAGE
# =====================================================

$editPage = @"
"use client";

export default function Edit${moduleTypeName}Page() {

  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold">
        Modifier $moduleLabel
      </h1>

    </div>
  );
}
"@

Set-Content `
-LiteralPath "$basePath\[id]\edit\page.tsx" `
-Value $editPage

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Terragest CRUD Module generated successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Generated module:" -ForegroundColor Yellow
Write-Host "- $moduleName"
Write-Host "- list"
Write-Host "- create"
Write-Host "- detail"
Write-Host "- edit"
Write-Host "- delete"
Write-Host ""