import { RuntimeDataBinding } from "@/runtime/data-binding";
import { allERPModules } from "@/runtime/modules/definitions/coreModules";

export async function recalculateTerrainSurfaceDisponible(
  terrainId: string
) {
  const terrainsModule =
    allERPModules.find(
      m => m.metadata.key === "terrains"
    );

  const exploitationsModule =
    allERPModules.find(
      m => m.metadata.key === "exploitations"
    );

  if (
    !terrainsModule ||
    !exploitationsModule
  ) {
    return;
  }

  const terrain =
    await RuntimeDataBinding.detail(
      terrainsModule,
      terrainId
    );

  if (!terrain) {
    return;
  }

  const exploitations =
    await RuntimeDataBinding.list(
      exploitationsModule
    );

  const terrainExploitations =
    exploitations.filter(
      e =>
        e.terrainId === terrainId &&
        e.statut === "actif"
    );

  const totalExploite =
    terrainExploitations.reduce(
      (sum, e) =>
        sum +
        Number(
          e.surfaceExploitee ?? 0
        ),
      0
    );

  const surfaceDisponible =
    Number(
      terrain.surfaceTotale ?? 0
    ) -
    totalExploite;

  await RuntimeDataBinding.update(
    terrainsModule,
    terrainId,
    {
      ...terrain,
      surfaceDisponible,
    }
  );

  console.log(
    "SURFACE DISPONIBLE RECALCULÉE",
    {
      terrainId,
      surfaceDisponible,
    }
  );
}