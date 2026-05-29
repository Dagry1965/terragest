import type {
  ERPRecordHubResolveInput,
  ERPRecordHubResolveResult,
} from "./RuntimeHubTypes";
import { RuntimeHubConfigResolver } from "./RuntimeHubConfigResolver";
import { RuntimeHubLayoutResolver } from "./RuntimeHubLayoutResolver";
import { RuntimeHubKpiResolver } from "./RuntimeHubKpiResolver";
import { RuntimeHubRelationResolver } from "./RuntimeHubRelationResolver";

export class RuntimeHubEngine {
  static resolve(input: ERPRecordHubResolveInput): ERPRecordHubResolveResult {
    RuntimeHubConfigResolver.assertValid(input.config);

    const layout = RuntimeHubLayoutResolver.resolve(input.config, input.rootRecord);
    const kpis = RuntimeHubKpiResolver.resolveStatic(input.config, input.rootRecord);
    const relations = RuntimeHubRelationResolver.resolve(input.config);

    return {
      config: input.config,
      layout,
      kpis,
      relations,
    };
  }
}
