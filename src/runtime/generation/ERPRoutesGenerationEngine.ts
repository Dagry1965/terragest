export interface ERPGeneratedRoute {

  module: string;

  path: string;

  page:
    | "list"
    | "create"
    | "details"
    | "edit";
}

export class ERPRoutesGenerationEngine {

  generateRoutes(
    module: string
  ): ERPGeneratedRoute[] {

    return [
      {
        module,
        path: `/${module}`,
        page: "list",
      },
      {
        module,
        path: `/${module}/nouveau`,
        page: "create",
      },
      {
        module,
        path: `/${module}/[id]`,
        page: "details",
      },
      {
        module,
        path: `/${module}/[id]/edit`,
        page: "edit",
      },
    ];
  }
}

export const erpRoutesGenerationEngine =
  new ERPRoutesGenerationEngine();