import {
  bootstrapEnterpriseRuntime
}
from "./bootstrapEnterpriseRuntime";

async function start() {

  const runtime =
    await bootstrapEnterpriseRuntime();

  console.log(
    "[Terragest Runtime Started]",
    runtime
  );
}

start();
