import type {
 ERPTenantMetrics,
}
from "./ERPTenantMetrics";

import {
 ERPTenantRegistry,
}
from "../registry/ERPTenantRegistry";

import {
 ERPTenantQuotaEvaluator,
}
from "./ERPTenantQuotaEvaluator";

class ERPTenantMetricsStoreClass {

 private current:
   ERPTenantMetrics[]=[];

 private history:
   ERPTenantMetrics[]=[];


 set(
   metrics:
     ERPTenantMetrics
 ){

   const snapshot={

     ...metrics,

     timestamp:
       new Date()
         .toISOString()

   };


   this.history.push(
     snapshot
   );

   this.history=
     this.history.slice(
       -5000
     );


   const exists=
     this.current.some(

       item=>

         item.tenantId===

           metrics.tenantId

     );


   if(exists){

     this.current=
       this.current.map(

         item=>

           item.tenantId===

             metrics.tenantId

           ?

           snapshot

           :

           item

       );

   }

   else{

     this.current.push(
       snapshot
     );

   }


   const tenant=

     ERPTenantRegistry.find(

       item=>

         item.id===

           metrics.tenantId

     );


   ERPTenantQuotaEvaluator
     .evaluate(

       snapshot,

       tenant?.plan ??

         "starter"

     );

 }


 all(){

   return this.current;

 }


 historyByTenant(

   tenantId:
     string

 ){

   return this.history.filter(

     item=>

       item.tenantId===

         tenantId

   );

 }


 growthRate(

   tenantId:
     string,

   metric:
     keyof ERPTenantMetrics

 ){

   const history=

     this.historyByTenant(
       tenantId
     );


   if(
     history.length<2
   ){

     return 0;

   }


   const first=
     history[0];

   const last=
     history[
       history.length-1
     ];


   return (

     Number(
       last[metric]
     )

     -

     Number(
       first[metric]
     )

   );

 }


 forecast(

   tenantId:
     string,

   metric:
     keyof ERPTenantMetrics,

   periods =
     1

 ){

   const current =
     this.byTenant(
       tenantId
     );


   if(
     !current
   ){

     return 0;

   }


   const growth =
     this.growthRate(
       tenantId,
       metric
     );


   return (

     Number(
       current[metric]
     )

     +

     growth
     *
     periods

   );

 }


 byTenant(
   tenantId:
     string
 ){

   return this.current.find(

     item=>

       item.tenantId===

         tenantId

   );

 }

}

export const
ERPTenantMetricsStore=

 new
 ERPTenantMetricsStoreClass();