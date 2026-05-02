# =====================================================
# TERRAGEST
# RESTORE MATERIELS SAFE SSR
# =====================================================

Set-Location `
"C:\Users\Admin\terragest"

# =====================================================
# MATERIELS PAGE
# =====================================================

New-Item `
-ItemType Directory `
-Force `
-Path `
"src\app\(private)\materiels"

$materielsPage = @'
"use client";

import Link
from "next/link";

export default function MaterielsPage() {

  return (

    <div className="p-10">

      <div
        className="
          flex
          justify-between
          items-center
          mb-8
        "
      >

        <h1
          className="
            text-4xl
            font-bold
          "
        >
          Matériels
        </h1>

        <Link
          href="/materiels/nouveau"
          className="
            bg-green-600
            text-white
            px-4
            py-2
            rounded-xl
          "
        >
          Nouveau
        </Link>

      </div>

      <div
        className="
          bg-white
          rounded-2xl
          shadow-md
          p-6
        "
      >

        Module Matériels OK

      </div>

    </div>
  );
}
'@

Set-Content `
-Path `
"src\app\(private)\materiels\page.tsx" `
-Value $materielsPage

# =====================================================
# NOUVEAU MATERIEL
# =====================================================

New-Item `
-ItemType Directory `
-Force `
-Path `
"src\app\(private)\materiels\nouveau"

$nouveauMateriel = @'
"use client";

export const dynamic =
  "force-dynamic";

export default function NouveauMaterielPage() {

  return (

    <div className="p-10">

      <div
        className="
          bg-white
          rounded-2xl
          shadow-md
          p-6
        "
      >

        <h1
          className="
            text-3xl
            font-bold
            mb-6
          "
        >
          Nouveau Matériel
        </h1>

        <p>
          Formulaire sécurisé SSR OK
        </p>

      </div>

    </div>
  );
}
'@

Set-Content `
-Path `
"src\app\(private)\materiels\nouveau\page.tsx" `
-Value $nouveauMateriel

# =====================================================
# DETAIL MATERIEL
# =====================================================

New-Item `
-ItemType Directory `
-Force `
-Path `
"src\app\(private)\materiels\`[id`]"

$materielDetail = @'
"use client";

import {
  useParams
}
from "next/navigation";

export default function MaterielDetailPage() {

  const params =
    useParams();

  return (

    <div className="p-10">

      <div
        className="
          bg-white
          rounded-2xl
          shadow-md
          p-6
        "
      >

        <h1
          className="
            text-3xl
            font-bold
            mb-6
          "
        >
          Matériel
        </h1>

        <p>
          ID :
          {params.id}
        </p>

      </div>

    </div>
  );
}
'@

Set-Content `
-LiteralPath `
"src\app\(private)\materiels\[id]\page.tsx" `
-Value $materielDetail

# =====================================================
# BUILD
# =====================================================

Write-Host ""
Write-Host "Running build..." `
-ForegroundColor Cyan

pnpm build

Write-Host ""
Write-Host "Deploy after success:" `
-ForegroundColor Green

Write-Host "firebase deploy"

Write-Host ""