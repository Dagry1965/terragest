"use client";

import Link from "next/link";

import {
 ERPButton,
 ERPSection,
}
from "@/components/erp/ui";

export function PublicCTA(){

 return(

  <ERPSection

   title="
   Besoin d'un entretien
   ou d'une vidange ?
   "

   description="
   Prenez rendez-vous
   rapidement avec AMARKHYS.
   "

  >

   <div
    className="
    flex
    gap-4
    flex-wrap
    "
   >

    <Link href="/rdv">

      <ERPButton>

       Prendre rendez-vous

      </ERPButton>

    </Link>


    <a

     href="
     https://wa.me/
     "

     target="_blank"

    >

     <ERPButton
      variant="secondary"
     >

      WhatsApp

     </ERPButton>

    </a>


    <a
     href="tel:+000000000"
    >

      <ERPButton
       variant="ghost"
      >

       Appeler

      </ERPButton>

    </a>

   </div>

  </ERPSection>

 );

}