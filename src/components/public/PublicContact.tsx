"use client";

import {
 ERPCard,
 ERPSection,
}
from "@/components/erp/ui";

export function PublicContact(){

 return(

  <ERPSection

   title="Contact"

   description="
   Retrouvez-nous ou contactez-nous.
   "

  >

   <div
    className="
    grid
    gap-6
    md:grid-cols-3
    "
   >

    <ERPCard title="Téléphone">

      +000000000

    </ERPCard>


    <ERPCard title="WhatsApp">

      Disponible

    </ERPCard>


    <ERPCard title="Adresse">

      Adresse garage

    </ERPCard>

   </div>

  </ERPSection>

 );

}