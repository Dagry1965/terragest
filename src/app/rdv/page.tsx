import {
  PublicLayout,
} from "@/components/public";

import {
  ERPPageHero,
} from "@/components/erp/layout/ERPPageHero";

import {
  ERPButton,
  ERPCard,
} from "@/components/erp/ui";

export default function RDVPage() {

  return (

    <PublicLayout>

      <ERPPageHero
        category="Rendez-vous"

        title="
        Réserver une intervention
        "

        description="
        Prenez rendez-vous
        rapidement avec
        AMARKHYS.
        "
      />

      <ERPCard
        title="
        Demande rendez-vous
        "
      >

        <div
          className="
          flex
          flex-col
          gap-4
          "
        >

          <input
            placeholder="Nom"
            className="
            border
            p-3
            rounded
            "
          />


          <input
            placeholder="Téléphone"
            className="
            border
            p-3
            rounded
            "
          />


          <input
            placeholder="Véhicule"
            className="
            border
            p-3
            rounded
            "
          />


          <ERPButton>

            Envoyer demande

          </ERPButton>

        </div>

      </ERPCard>

    </PublicLayout>

  );

}