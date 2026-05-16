import {
 RuntimeDataBinding,
}
from "@/runtime/data-binding";

import {
 clientsautoModule,
}
from "@/runtime/modules/generated/clientsauto/clientsauto.module";

import {
 vehiculesModule,
}
from "@/runtime/modules/generated/vehicules/vehicules.module";

import {
 rendezvousModule,
}
from "@/runtime/modules/generated/rendezvous/rendezvous.module";

export async function
createPublicAppointment(

 data:{

  nom:string;

  telephone:string;

  vehicule:string;

  immatriculation:string;

 }

){

 const client=

 await RuntimeDataBinding.create(

  clientsautoModule,

  {

   nom:
    data.nom,

   telephone:
    data.telephone,

   statut:
    "prospect",

   codeClient:
    crypto.randomUUID(),

  }

 );


 const vehicule=

 await RuntimeDataBinding.create(

  vehiculesModule,

  {

   marque:
    data.vehicule,

   immatriculation:
    data.immatriculation,

   clientId:
    client.id,

   statut:
    "actif"

  }

 );


 return RuntimeDataBinding.create(

  rendezvousModule,

  {

   clientId:
    client.id,

   vehiculeId:
    vehicule.id,

   statut:
    "planifie",

   dateRendezVous:
    new Date(),

   typeService:
    "autre",

  }

 );

}