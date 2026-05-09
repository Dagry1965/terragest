import { coreERPModules }
from "../definitions/coreModules";

export class ERPRelationDataLoader {

  static async load(
    moduleKey: string
  ) {

    const module =
      coreERPModules.find(
        (item) =>
          item.metadata.key === moduleKey
      );

    if (!module) {
      return [];
    }

    /*
     * TEMPORAIRE
     * Plus tard :
     * Firestore
     * API
     * cache
     * realtime
     */

    return [
      {
        id: "demo_1",
        label: `${module.metadata.label} 1`,
      },
      {
        id: "demo_2",
        label: `${module.metadata.label} 2`,
      },
    ];
  }
}