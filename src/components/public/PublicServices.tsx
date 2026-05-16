"use client";

import {
  ERPCard,
  ERPSection,
}
from "@/components/erp/ui";

const services = [

  "Vidange rapide",

  "Diagnostic moteur",

  "Entretien flotte",

  "PrÃ©paration visite technique",

  "Lavage auto",

  "ParallÃ©lisme",

  "Ã‰quilibrage",

  "Plaquettes"

];

export function PublicServices(){

  return(

    <ERPSection

      title="Nos services"

      description="
      Des interventions rapides,
      fiables et suivies.
      "

    >

      <div
        className="
        grid
        md:grid-cols-4
        gap-6
        "
      >

        {

          services.map(

            service=>(

              <ERPCard
                key={service}
                title={service}
              >

                Service professionnel.

              </ERPCard>

            )

          )

        }

      </div>

    </ERPSection>

  );

}
