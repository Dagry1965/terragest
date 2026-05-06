import {
  runtimeRelations,
}
from "@/runtime/relations/runtimeRelations";

export class RuntimeRelationsEngine {

  static getRelations(
    module: string
  ) {

    return runtimeRelations.filter(

      (relation) =>

        relation.source ===
          module ||

        relation.target ===
          module
    );
  }

  static getChildren(
    module: string
  ) {

    return runtimeRelations.filter(

      (relation) =>

        relation.source ===
          module
    );
  }

  static getParents(
    module: string
  ) {

    return runtimeRelations.filter(

      (relation) =>

        relation.target ===
          module
    );
  }
}
