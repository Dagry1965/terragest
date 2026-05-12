import { RuntimeDataBinding } from "@/runtime/data-binding";
import { resolveDashboardModule } from "./ERPDashboardModuleResolver";
import type {
  ERPDashboardConfig,
  ERPDashboardFilter,
  ERPDashboardWidgetConfig,
  ERPDashboardWidgetResult,
} from "./ERPDashboardTypes";

function readValue(record: any, field: string): any {
  return record?.[field];
}

function toDate(value: unknown): Date | null {
  if (!value) return null;

  if (value instanceof Date) return value;

  if (
    typeof value === "object" &&
    value !== null &&
    "seconds" in value
  ) {
    return new Date((value as any).seconds * 1000);
  }

  const date = new Date(String(value));
  return Number.isNaN(date.getTime()) ? null : date;
}

function daysFromNow(value: unknown): number | null {
  const date = toDate(value);
  if (!date) return null;

  const now = new Date();
  const diff = date.getTime() - now.getTime();

  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function matchFilter(record: any, filter: ERPDashboardFilter): boolean {
  const value = readValue(record, filter.field);

  if (filter.operator === "equals") {
    return value === filter.value;
  }

  if (filter.operator === "notEquals") {
    return value !== filter.value;
  }

  if (filter.operator === "exists") {
    return value !== undefined && value !== null && value !== "";
  }

  if (filter.operator === "lteDaysFromNow") {
    const days = daysFromNow(value);
    return days !== null && days <= Number(filter.value);
  }

  if (filter.operator === "gteDaysFromNow") {
    const days = daysFromNow(value);
    return days !== null && days >= Number(filter.value);
  }

  return true;
}

function applyFilters(
  records: any[],
  filters?: ERPDashboardFilter[]
): any[] {
  if (!filters || filters.length === 0) {
    return records;
  }

  return records.filter((record) =>
    filters.every((filter) => matchFilter(record, filter))
  );
}

function getRecordLabel(
  record: any,
  widget: ERPDashboardWidgetConfig
): string {
  const labelField = widget.labelField ?? "nom";

  return (
    record[labelField] ??
    record.nom ??
    record.code ??
    record.title ??
    record.id ??
    "Element"
  );
}

export class ERPDashboardWidgetEngine {
  static async resolveWidget(
    widget: ERPDashboardWidgetConfig
  ): Promise<ERPDashboardWidgetResult> {
    const module = resolveDashboardModule(widget.moduleKey);

    if (!module) {
      return {
        key: widget.key,
        type: widget.type,
        title: widget.title,
        description: "Module introuvable : " + widget.moduleKey,
        value: 0,
        items: [],
      };
    }

    const records = await RuntimeDataBinding.list(module);
    const filtered = applyFilters(records, widget.filters);

    if (widget.type === "kpi") {
      return {
        key: widget.key,
        type: widget.type,
        title: widget.title,
        description: widget.description,
        href: widget.href,
        value: filtered.length,
      };
    }

    const items = filtered.map((record: any) => ({
      id: String(record.id),
      title: getRecordLabel(record, widget),
      description: widget.description,
      date: widget.dateField ? String(record[widget.dateField] ?? "") : undefined,
      level: widget.level ?? "info",
    }));

    return {
      key: widget.key,
      type: widget.type,
      title: widget.title,
      description: widget.description,
      href: widget.href,
      items,
    };
  }

  static async resolveDashboard(
    config: ERPDashboardConfig
  ): Promise<ERPDashboardWidgetResult[]> {
    return Promise.all(
      config.widgets.map((widget) => this.resolveWidget(widget))
    );
  }
}