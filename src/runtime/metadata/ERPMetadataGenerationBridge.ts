import {
  erpMetadataRegistry,
} from "./ERPMetadataRegistry";

import {
  erpFormGenerationEngine,
  erpTableGenerationEngine,
  erpDashboardGenerationEngine,
  erpRoutesGenerationEngine,
  erpWorkflowGenerationEngine,
  erpPermissionsGenerationEngine,
  erpMenuGenerationEngine,
} from "../generation";

export class ERPMetadataGenerationBridge {

  generateAll() {

    return erpMetadataRegistry
      .getModules()
      .map(module => ({

        module:
          module.key,

        form:
          erpFormGenerationEngine.generateForm(
            module.key,
            module.fields
          ),

        table:
          erpTableGenerationEngine.generateTable(
            module.key,

            module.fields.map(
              field => ({
                key: field.key,
                label: field.label,
              })
            )
          ),

        dashboard:
          erpDashboardGenerationEngine.generateDashboard(
            module.key,
            []
          ),

        routes:
          erpRoutesGenerationEngine.generateRoutes(
            module.key
          ),

        workflow:
          erpWorkflowGenerationEngine.generateWorkflow(
            module.key
          ),

        permissions:
          erpPermissionsGenerationEngine.generatePermissions(
            module.key
          ),

        menu:
          erpMenuGenerationEngine.generateMenu(
            module.key,
            module.label
          ),
      }));
  }
}

export const erpMetadataGenerationBridge =
  new ERPMetadataGenerationBridge();