$Base = "src/modules/produits"
$AppBase = "src/app/(private)/produits"

function Ensure-Dir($Path) {
  if (!(Test-Path $Path)) {
    New-Item -ItemType Directory -Path $Path -Force | Out-Null
  }
}

function Write-File($Path, $Content) {
  Ensure-Dir (Split-Path $Path)

  $Utf8NoBom = New-Object System.Text.UTF8Encoding($false)
  $FullPath = [System.IO.Path]::GetFullPath($Path)

  [System.IO.File]::WriteAllText(
    $FullPath,
    $Content,
    $Utf8NoBom
  )

  Write-Host "OK $Path"
}

Ensure-Dir "$Base"
Ensure-Dir "$AppBase"
Ensure-Dir "$AppBase/nouveau"
Ensure-Dir "$AppBase/[id]"
Ensure-Dir "$AppBase/[id]/edit"

Write-File "$Base/produit.model.ts" @'
export type ProduitCategory =
  | "agricole"
  | "animal"
  | "piscicole"
  | "immobilier";

export type ProduitType =
  | "igname"
  | "manioc"
  | "arachide"
  | "mais"
  | "viande"
  | "oeufs"
  | "lait"
  | "tilapia"
  | "silure"
  | "maison"
  | "appartement";

export type ProduitStatus = "active" | "inactive";

export type ProduitStockMode = "stockable" | "non_stockable";

export type Produit = {
  id: string;
  code: string;
  name: string;
  category: ProduitCategory;
  type: ProduitType;
  status: ProduitStatus;
  stockMode: ProduitStockMode;
  unit?: string;
  minStockLevel?: number;
  purchasePrice?: number;
  salePrice?: number;
  createdAt: string;
  updatedAt: string;
};

export const PRODUIT_TYPES_BY_CATEGORY: Record<ProduitCategory, ProduitType[]> = {
  agricole: ["igname", "manioc", "arachide", "mais"],
  animal: ["viande", "oeufs", "lait"],
  piscicole: ["tilapia", "silure"],
  immobilier: ["maison", "appartement"],
};

export function getDefaultStockMode(category: ProduitCategory): ProduitStockMode {
  return category === "immobilier" ? "non_stockable" : "stockable";
}
'@

Write-File "$Base/produit.mock.ts" @'
import type { Produit } from "./produit.model";

export const produitsMock: Produit[] = [
  {
    id: "prod_igname",
    code: "AGR-IGN-001",
    name: "Igname",
    category: "agricole",
    type: "igname",
    status: "active",
    stockMode: "stockable",
    unit: "kg",
    minStockLevel: 100,
    purchasePrice: 250,
    salePrice: 350,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod_manioc",
    code: "AGR-MAN-001",
    name: "Manioc",
    category: "agricole",
    type: "manioc",
    status: "active",
    stockMode: "stockable",
    unit: "kg",
    minStockLevel: 150,
    purchasePrice: 180,
    salePrice: 280,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod_oeufs",
    code: "ANI-OEU-001",
    name: "Œufs",
    category: "animal",
    type: "oeufs",
    status: "active",
    stockMode: "stockable",
    unit: "plateau",
    minStockLevel: 20,
    purchasePrice: 1800,
    salePrice: 2500,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod_tilapia",
    code: "PIS-TIL-001",
    name: "Tilapia",
    category: "piscicole",
    type: "tilapia",
    status: "active",
    stockMode: "stockable",
    unit: "kg",
    minStockLevel: 50,
    purchasePrice: 1200,
    salePrice: 1800,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod_maison",
    code: "IMO-MAI-001",
    name: "Maison",
    category: "immobilier",
    type: "maison",
    status: "active",
    stockMode: "non_stockable",
    unit: "bien",
    minStockLevel: 0,
    purchasePrice: 0,
    salePrice: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
'@

Write-File "$Base/produit.rules.ts" @'
import type { Produit } from "./produit.model";
import { PRODUIT_TYPES_BY_CATEGORY } from "./produit.model";

export function validateProduit(produit: Partial<Produit>) {
  const errors: string[] = [];

  if (!produit.code) errors.push("Le code produit est obligatoire.");
  if (!produit.name) errors.push("Le nom du produit est obligatoire.");
  if (!produit.category) errors.push("La catégorie est obligatoire.");
  if (!produit.type) errors.push("Le type de produit est obligatoire.");

  if (
    produit.category &&
    produit.type &&
    !PRODUIT_TYPES_BY_CATEGORY[produit.category].includes(produit.type)
  ) {
    errors.push("Le type de produit ne correspond pas à la catégorie sélectionnée.");
  }

  if (produit.stockMode === "stockable" && !produit.unit) {
    errors.push("Un produit stockable doit avoir une unité.");
  }

  if (
    produit.minStockLevel !== undefined &&
    produit.minStockLevel < 0
  ) {
    errors.push("Le seuil minimum ne peut pas être négatif.");
  }

  if (
    produit.purchasePrice !== undefined &&
    produit.purchasePrice < 0
  ) {
    errors.push("Le prix d'achat ne peut pas être négatif.");
  }

  if (
    produit.salePrice !== undefined &&
    produit.salePrice < 0
  ) {
    errors.push("Le prix de vente ne peut pas être négatif.");
  }

  return errors;
}
'@

Write-File "$AppBase/page.tsx" @'
import Link from "next/link";
import { produitsMock } from "@/modules/produits/produit.mock";

export default function ProduitsPage() {
  return (
    <main className="space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Produits</h1>
          <p className="text-sm text-gray-500">
            Référentiel central des produits Terragest.
          </p>
        </div>

        <Link
          href="/produits/nouveau"
          className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white"
        >
          Nouveau produit
        </Link>
      </div>

      <section className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-4">Code</th>
              <th className="p-4">Nom</th>
              <th className="p-4">Catégorie</th>
              <th className="p-4">Type</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Statut</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {produitsMock.map((produit) => (
              <tr key={produit.id} className="border-t">
                <td className="p-4 font-medium">{produit.code}</td>
                <td className="p-4">{produit.name}</td>
                <td className="p-4 capitalize">{produit.category}</td>
                <td className="p-4 capitalize">{produit.type}</td>
                <td className="p-4">
                  {produit.stockMode === "stockable" ? "Stockable" : "Non stockable"}
                </td>
                <td className="p-4">
                  {produit.status === "active" ? "Actif" : "Inactif"}
                </td>
                <td className="p-4 text-right">
                  <Link
                    href={`/produits/${produit.id}`}
                    className="text-sm font-medium underline"
                  >
                    Voir
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
'@

Write-File "$AppBase/nouveau/page.tsx" @'
export default function NouveauProduitPage() {
  return (
    <main className="space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold">Nouveau produit</h1>
        <p className="text-sm text-gray-500">
          Création d’un produit du référentiel Terragest.
        </p>
      </div>

      <form className="grid max-w-3xl gap-6 rounded-2xl border bg-white p-6 shadow-sm">
        <div className="grid gap-2">
          <label className="text-sm font-medium">Code produit</label>
          <input className="rounded-xl border px-4 py-2" placeholder="AGR-IGN-001" />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium">Nom</label>
          <input className="rounded-xl border px-4 py-2" placeholder="Igname" />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium">Catégorie</label>
          <select className="rounded-xl border px-4 py-2">
            <option value="agricole">Agricole</option>
            <option value="animal">Animal</option>
            <option value="piscicole">Piscicole</option>
            <option value="immobilier">Immobilier</option>
          </select>
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium">Type</label>
          <select className="rounded-xl border px-4 py-2">
            <option value="igname">Igname</option>
            <option value="manioc">Manioc</option>
            <option value="arachide">Arachide</option>
            <option value="mais">Maïs</option>
            <option value="viande">Viande</option>
            <option value="oeufs">Œufs</option>
            <option value="lait">Lait</option>
            <option value="tilapia">Tilapia</option>
            <option value="silure">Silure</option>
            <option value="maison">Maison</option>
            <option value="appartement">Appartement</option>
          </select>
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium">Gestion de stock</label>
          <select className="rounded-xl border px-4 py-2">
            <option value="stockable">Stockable</option>
            <option value="non_stockable">Non stockable</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input className="rounded-xl border px-4 py-2" placeholder="Unité : kg, litre, plateau..." />
          <input className="rounded-xl border px-4 py-2" placeholder="Seuil minimum" />
          <input className="rounded-xl border px-4 py-2" placeholder="Prix achat" />
          <input className="rounded-xl border px-4 py-2" placeholder="Prix vente" />
        </div>

        <button
          type="button"
          className="rounded-xl bg-black px-4 py-2 text-white"
        >
          Enregistrer
        </button>
      </form>
    </main>
  );
}
'@

Write-File "$AppBase/[id]/page.tsx" @'
import Link from "next/link";
import { produitsMock } from "@/modules/produits/produit.mock";

export default function ProduitDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const produit =
    produitsMock.find((item) => item.id === params.id) ?? produitsMock[0];

  return (
    <main className="space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{produit.name}</h1>
          <p className="text-sm text-gray-500">{produit.code}</p>
        </div>

        <Link
          href={`/produits/${produit.id}/edit`}
          className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white"
        >
          Modifier
        </Link>
      </div>

      <section className="grid max-w-3xl gap-4 rounded-2xl border bg-white p-6 shadow-sm">
        <p><strong>Catégorie :</strong> {produit.category}</p>
        <p><strong>Type :</strong> {produit.type}</p>
        <p><strong>Statut :</strong> {produit.status}</p>
        <p><strong>Stock :</strong> {produit.stockMode}</p>
        <p><strong>Unité :</strong> {produit.unit}</p>
        <p><strong>Seuil minimum :</strong> {produit.minStockLevel}</p>
        <p><strong>Prix achat :</strong> {produit.purchasePrice}</p>
        <p><strong>Prix vente :</strong> {produit.salePrice}</p>
      </section>
    </main>
  );
}
'@

Write-File "$AppBase/[id]/edit/page.tsx" @'
import { produitsMock } from "@/modules/produits/produit.mock";

export default function EditProduitPage({
  params,
}: {
  params: { id: string };
}) {
  const produit =
    produitsMock.find((item) => item.id === params.id) ?? produitsMock[0];

  return (
    <main className="space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold">Modifier {produit.name}</h1>
        <p className="text-sm text-gray-500">{produit.code}</p>
      </div>

      <form className="grid max-w-3xl gap-6 rounded-2xl border bg-white p-6 shadow-sm">
        <input className="rounded-xl border px-4 py-2" defaultValue={produit.code} />
        <input className="rounded-xl border px-4 py-2" defaultValue={produit.name} />
        <input className="rounded-xl border px-4 py-2" defaultValue={produit.unit} />
        <input className="rounded-xl border px-4 py-2" defaultValue={produit.minStockLevel} />
        <input className="rounded-xl border px-4 py-2" defaultValue={produit.purchasePrice} />
        <input className="rounded-xl border px-4 py-2" defaultValue={produit.salePrice} />

        <button
          type="button"
          className="rounded-xl bg-black px-4 py-2 text-white"
        >
          Enregistrer les modifications
        </button>
      </form>
    </main>
  );
}
'@

Write-Host ""
Write-Host "Module Produits utilisable créé."
Write-Host "Lance maintenant : pnpm build"