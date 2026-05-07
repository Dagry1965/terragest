$path = ".\src\app\(private)\materiels\nouveau\page.tsx"

@"
"use client";

import {
  ERPDynamicForm,
}
from "@/components/erp/forms/ERPDynamicForm";

export default function NouveauMaterielPage() {

  return (

    <div className="p-10">

      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          Nouveau matériel
        </h1>

        <p className="mt-2 text-gray-500">
          Création runtime d’un matériel ERP.
        </p>

      </div>

      <div className="rounded-2xl bg-white p-8 shadow-md">

        <ERPDynamicForm
          module="materiels"
          context={{
            role: "gestionnaire",
            materielType: "tracteur",
          }}
        />

      </div>

    </div>
  );
}
"@ | Set-Content $path -Encoding UTF8

Write-Host "Page materiels/nouveau corrigée."
