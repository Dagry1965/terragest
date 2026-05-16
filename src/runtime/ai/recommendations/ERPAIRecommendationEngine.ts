import type {
 ERPAIRecommendation,
}
from "./ERPAIRecommendation";

import {
 ERPTenantMetricsStore,
}
from "@/runtime/tenant/metrics/ERPTenantMetricsStore";

import {
 ERPTenantRegistry,
}
from "@/runtime/tenant";

function createId(
 prefix:
  string
){

 return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;

}

export function generateERPAIRecommendations():

 ERPAIRecommendation[] {

 const recommendations:
   ERPAIRecommendation[]=[];


 for(

  const tenant

  of

  ERPTenantRegistry

 ){

  const metrics=

   ERPTenantMetricsStore
    .byTenant(

      tenant.id

    );


  if(
   !metrics
  ){

   continue;

  }


  const storageForecast=

   ERPTenantMetricsStore
    .forecast(

      tenant.id,

      "storage",

      3

    );


  if(

   storageForecast>

   metrics.storage*

   1.2

  ){

   recommendations.push({

    id:
      createId(
        "ai_reco"
      ),

    title:
      "Prévoir augmentation stockage",

    description:

      `Le tenant ${tenant.name} montre une croissance stockage importante.`,

    module:
      "tenant",

    impact:
      "medium",

    actionLabel:

      "Proposer upgrade plan",

    createdAt:

      new Date()
       .toISOString(),

   });

  }


  const usersForecast=

   ERPTenantMetricsStore
    .forecast(

      tenant.id,

      "activeUsers",

      3

    );


  if(

   usersForecast>

   metrics.activeUsers*

   1.5

  ){

   recommendations.push({

    id:
      createId(
        "ai_reco"
      ),

    title:
      "Prévoir montée en charge",

    description:

      `Croissance utilisateurs prévue pour ${tenant.name}.`,

    module:
      "tenant",

    impact:
      "high",

    actionLabel:

      "Préparer scaling",

    createdAt:

       new Date()
        .toISOString(),

   });

  }

 }


 return recommendations;

}