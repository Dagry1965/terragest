import type { ERPModule } from "../ERPModule";
import { RuntimePageFactory, type RuntimePageType } from "../factories/RuntimePageFactory";

export class ERPModuleRenderer {
  static renderPage(module: ERPModule, pageType: RuntimePageType) {
    return RuntimePageFactory.create(module, pageType);
  }

  static renderList(module: ERPModule) {
    return this.renderPage(module, "list");
  }

  static renderCreate(module: ERPModule) {
    return this.renderPage(module, "create");
  }

  static renderEdit(module: ERPModule) {
    return this.renderPage(module, "edit");
  }

  static renderDetails(module: ERPModule) {
    return this.renderPage(module, "details");
  }
}
