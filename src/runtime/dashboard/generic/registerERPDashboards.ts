import {
  ERPDashboardRegistry,
}
from "./registry/ERPDashboardRegistry";

import {
  ERPBusinessDashboardConfig,
}
from "./configs/ERPBusinessDashboardConfig";

export function registerERPDashboards() {

  ERPDashboardRegistry.register(
    ERPBusinessDashboardConfig
  );
}