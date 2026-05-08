import {
  GeneratedRuntimeTopology,
} from "../generated/GeneratedRuntimeTopology";

export interface RuntimeTopologyNode {
  emits: string[];
  listensTo: string[];
}

export class RuntimeEventTopology {

  private topology =
    new Map<
      string,
      RuntimeTopologyNode
    >();

  initialize() {

    for (
      const [moduleId, topology]
      of Object.entries(
        GeneratedRuntimeTopology
      )
    ) {

      this.topology.set(
        moduleId,
        topology
      );
    }
  }

  getModuleTopology(
    moduleId: string
  ) {

    return this.topology.get(
      moduleId
    );
  }

  getAllTopologies() {

    return Array.from(
      this.topology.entries()
    );
  }
}

export const runtimeEventTopology =
  new RuntimeEventTopology();

runtimeEventTopology.initialize();