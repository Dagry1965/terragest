import {

 PublicHero,

 PublicLayout,

 PublicServices,

 PublicWhy,

}
from "@/components/public";

export default
function HomePage(){

 return(

  <PublicLayout>

   <PublicHero/>

   <PublicServices/>

   <PublicWhy/>

  </PublicLayout>

 );

}