export interface ERPGeneratedMenu {

  label: string;

  href: string;

  icon?: string;
}

export class ERPMenuGenerationEngine {

  generateMenu(
    module: string,
    label: string
  ): ERPGeneratedMenu {

    return {

      label,

      href: `/${module}`,

      icon: "layout-grid",
    };
  }
}

export const erpMenuGenerationEngine =
  new ERPMenuGenerationEngine();