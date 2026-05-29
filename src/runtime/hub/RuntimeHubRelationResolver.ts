import type {
  ERPRecordHubConfig,
  ERPRecordHubRelationDescriptor,
} from "./RuntimeHubTypes";

export class RuntimeHubRelationResolver {
  static resolve(config: ERPRecordHubConfig): ERPRecordHubRelationDescriptor[] {
    return (config.selectedRecordDetails ?? []).map((section) => ({
      key: section.key,
      label: section.label,
      moduleKey: section.moduleKey,
      foreignKey: section.foreignKey,
      layout: section.layout ?? "collapsible-list",
      labelFields: section.labelFields,
      subtitleFields: section.subtitleFields,
      actions: section.actions,
    }));
  }
}
