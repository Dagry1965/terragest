"use client";

import { ERPPage }
from "@/components/erp/page/ERPPage";

import { ERPFormSection }
from "@/components/erp/forms/ERPFormSection";

import { ERPInput }
from "@/components/erp/forms/ERPInput";

import { ERPButton }
from "@/components/erp/forms/ERPButton";

export default function NouveauMaterielPage() {

  return (

    <ERPPage
      title="Nouveau matériel"
      subtitle="Création d’un équipement dans le runtime ERP."
    >

      <div className="max-w-4xl">

        <ERPFormSection
          title="Informations générales"
          description="Données principales du matériel."
        >

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

            <ERPInput
              label="Nom du matériel"
              placeholder="Ex: Tracteur New Holland"
            />

            <ERPInput
              label="Référence"
              placeholder="TR-204"
            />

            <ERPInput
              label="Type"
              placeholder="Tracteur"
            />

            <ERPInput
              label="Statut"
              placeholder="Actif"
            />

          </div>

        </ERPFormSection>

        <div className="mt-6 flex justify-end">

          <ERPButton>
            Créer le matériel
          </ERPButton>

        </div>

      </div>

    </ERPPage>
  );
}
