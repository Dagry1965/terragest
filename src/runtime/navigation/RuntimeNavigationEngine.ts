import {
  RuntimeRelationsEngine,
}
from "@/runtime/relations/RuntimeRelationsEngine";

import {
  RuntimeNavigationLink,
}
from "@/runtime/navigation/RuntimeNavigationLink";

export class RuntimeNavigationEngine {

  static getLinks(
    module: string,
    entityId?: string
  ): RuntimeNavigationLink[] {

    const relations =
      RuntimeRelationsEngine
        .getChildren(
          module
        );

    return relations.map(
      (relation) => ({

        label:
          relation.target,

        source:
          relation.source,

        target:
          relation.target,

        relationType:
          relation.type,

        href:
          entityId
            ? `/${
                relation.target
              }?${relation.foreignKey}=${
                entityId
              }`
            : `/${
                relation.target
              }`,
      })
    );
  }
}
