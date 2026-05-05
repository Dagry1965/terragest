import {
  EnterpriseMaterielFlow
}
from "./EnterpriseMaterielFlow";

async function simulate() {

  const flow =
    new EnterpriseMaterielFlow();

  await flow.create({

    name:
      "Tracteur X900",

    type:
      "TRACTEUR",

    status:
      "ACTIVE",
  });
}

simulate();
