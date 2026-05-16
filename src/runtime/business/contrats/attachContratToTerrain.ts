import {
  RuntimeDataBinding,
} from "@/runtime/data-binding";

import {
  allERPModules,
} from "@/runtime/modules/definitions/coreModules";


export async function attachContratToTerrain(
  contrat: Record<string, unknown>
) {

  const terrainId =
    String(
      contrat.terrainId ??
      ""
    );

  if (!terrainId) {
    return;
  }

  const terrainsModule =
    allERPModules.find(
      module =>
        module.metadata.key ===
        "terrains"
    );

  if (!terrainsModule) {
    return;
  }

  await RuntimeDataBinding.update(

    terrainsModule,

    terrainId,

    {

      contratId:
        contrat.id,

    }

  );

}