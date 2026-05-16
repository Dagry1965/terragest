"use client";

import { useState } from "react";

import {
 PublicLayout,
}
from "@/components/public";

import {
 ERPPageHero,
}
from "@/components/erp/layout/ERPPageHero";

import {
 ERPButton,
 ERPCard,
}
from "@/components/erp/ui";

import {
 createPublicAppointment,
}
from "@/components/public/PublicAppointmentService";

export default function RDVPage(){

 const [

  form,

  setForm

 ]=

 useState({

  nom:"",

  telephone:"",

  vehicule:"",

  immatriculation:""

 });


 async function submit(){

  await createPublicAppointment(
   form
  );

  alert(
   "Demande envoyée"
  );

 }


 return(

  <PublicLayout>

   <ERPPageHero

    category="RDV"

    title="
    Réserver
    "

    description="
    Prenez rendez-vous
    avec AMARKHYS
    "

   />


   <ERPCard
    title="
    Rendez-vous
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

value={form.nom}

onChange={e=>

 setForm({

  ...form,

  nom:
   e.target.value

 })

}

placeholder="
Nom
"

/>


<input

value={form.telephone}

onChange={e=>

 setForm({

  ...form,

  telephone:
   e.target.value

 })

}

placeholder="
Téléphone
"

/>


<input

value={form.vehicule}

onChange={e=>

 setForm({

  ...form,

  vehicule:
   e.target.value

 })

}

placeholder="
Marque véhicule
"

/>


<input

value={form.immatriculation}

onChange={e=>

 setForm({

  ...form,

  immatriculation:
   e.target.value

 })

}

placeholder="
Immatriculation
"

/>


<ERPButton

onClick={
 submit
}

>

Envoyer

</ERPButton>


    </div>

   </ERPCard>

  </PublicLayout>

 );

}