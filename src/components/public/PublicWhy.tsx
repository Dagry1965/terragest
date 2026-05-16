"use client";

import {
  ERPCard,
  ERPSection,
}
from "@/components/erp/ui";

const reasons = [

 "Expertise",

 "Suivi véhicule",

 "Rappels automatiques",

 "Interventions rapides"

];

export function PublicWhy(){

 return(

  <ERPSection

   title="Pourquoi choisir AMARKHYS"

   description="
   Une approche moderne
   pour l'entretien automobile.
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

     reasons.map(

      reason=>(

       <ERPCard
        key={reason}
        title={reason}
       >

        Service fiable
        et suivi intelligent.

       </ERPCard>

      )

     )

    }

   </div>

  </ERPSection>

 );

}