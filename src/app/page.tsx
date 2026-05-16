import {

  PublicHero,

  PublicLayout,

  PublicServices,

}
from "@/components/public";

export default
function HomePage(){

 return(

  <PublicLayout>

   <PublicHero/>

   <PublicServices/>

  </PublicLayout>

 );

}