import { RuntimeDataBinding } from "@/runtime/data-binding";
import { resolveDashboardModule } from "./ERPDashboardModuleResolver";
import type {
  ERPDashboardConfig,
  ERPDashboardFilter,
  ERPDashboardFunnelStepConfig,
  ERPDashboardFunnelStepResult,
  ERPDashboardWidgetConfig,
  ERPDashboardWidgetResult,
} from "./ERPDashboardTypes";

function readValue(record: any, field: string): any {
  return record?.[field];
}

function toDate(value: unknown): Date | null {
  if (!value) {
    return null;
  }

  if (value instanceof Date) {
    return value;
  }

  if (
    typeof value === "object" &&
    value !== null &&
    "seconds" in value
  ) {
    return new Date((value as any).seconds * 1000);
  }

  const date =
    new Date(String(value));

  return Number.isNaN(date.getTime()) ? null : date;
}

function dateTimeValue(value: unknown): number {
  const date =
    toDate(value);

  return date ? date.getTime() : 0;
}

function daysFromNow(value: unknown): number | null {
  const date =
    toDate(value);

  if (!date) {
    return null;
  }

  const now =
    new Date();

  const diff =
    date.getTime() - now.getTime();

  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function matchFilter(record: any, filter: ERPDashboardFilter): boolean {
  const value =
    readValue(record, filter.field);

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
    const days =
      daysFromNow(value);

    return days !== null && days <= Number(filter.value);
  }

  if (filter.operator === "gteDaysFromNow") {
    const days =
      daysFromNow(value);

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

function sumRecordFields(
  records: any[],
  fields: string[] = []
): number {
  return records.reduce((total, record) => {
    for (const field of fields) {
      const value =
        Number(record[field] ?? 0);

      if (!Number.isNaN(value) && value > 0) {
        return total + value;
      }
    }

    return total;
  }, 0);
}

function getRecordLabel(
  record: any,
  widget: ERPDashboardWidgetConfig
): string {
  const labelField =
    widget.labelField ?? "nom";

  return String(
    record[labelField] ??
    record.nom ??
    record.code ??
    record.title ??
    record.motif ??
    record.message ??
    record.immatriculation ??
    record.id ??
    "Élément"
  );
}

function getRecordDescription(
  record: any,
  widget: ERPDashboardWidgetConfig
): string | undefined {
  const value =
    record.telephone ??
    record.immatriculation ??
    record.typeService ??
    record.statutPaiement ??
    record.statut ??
    record.source ??
    widget.description;

  return value ? String(value) : undefined;
}

function getRecordHref(
  record: any,
  widget: ERPDashboardWidgetConfig
): string | undefined {
  if (!widget.href) {
    return undefined;
  }

  if (!record.id) {
    return widget.href;
  }

  return widget.href + "/" + record.id;
}

async function resolveFunnelStep(
  step: ERPDashboardFunnelStepConfig,
  previousValue?: number
): Promise<ERPDashboardFunnelStepResult> {
  const module =
    resolveDashboardModule(step.moduleKey);

  if (!module) {
    return {
      key: step.key,
      label: step.label,
      value: 0,
      href: step.href,
      conversionRate: 0,
    };
  }

  const records =
    await RuntimeDataBinding.list(module);

  const filtered =
    applyFilters(records, step.filters);

  const value =
    filtered.length;

  const conversionRate =
    previousValue && previousValue > 0
      ? Math.round((value / previousValue) * 100)
      : undefined;

  return {
    key: step.key,
    label: step.label,
    value,
    href: step.href,
    conversionRate,
  };
}

async function resolveFunnelWidget(
  widget: ERPDashboardWidgetConfig
): Promise<ERPDashboardWidgetResult> {
  const results: ERPDashboardFunnelStepResult[] = [];
  let previousValue: number | undefined = undefined;

  for (const step of widget.steps ?? []) {
    const result =
      await resolveFunnelStep(
        step,
        previousValue
      );

    results.push(result);
    previousValue = result.value;
  }

  const first =
    results[0]?.value ?? 0;

  const last =
    results[results.length - 1]?.value ?? 0;

  const globalConversion =
    first > 0
      ? Math.round((last / first) * 100)
      : 0;

  return {
    key: widget.key,
    type: widget.type,
    title: widget.title,
    description: widget.description,
    value: globalConversion,
    valueSuffix: "%",
    steps: results,
  };
}

export class ERPDashboardWidgetEngine {
  static async resolveWidget(
    widget: ERPDashboardWidgetConfig
  ): Promise<ERPDashboardWidgetResult> {
    if (widget.type === "quickActions") {
      return {
        key: widget.key,
        type: widget.type,
        title: widget.title,
        description: widget.description,
        actions: widget.actions ?? [],
      };
    }

    if (widget.type === "funnel") {
      return resolveFunnelWidget(widget);
    }

    if (!widget.moduleKey) {
      return {
        key: widget.key,
        type: widget.type,
        title: widget.title,
        description: "Module non défini pour le widget.",
        value: 0,
        items: [],
      };
    }

    const module =
      resolveDashboardModule(widget.moduleKey);

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

    const records =
      await RuntimeDataBinding.list(module);

    const filtered =
      applyFilters(records, widget.filters);

    if (widget.type === "kpi") {
      const value =
        widget.aggregation === "sum"
          ? sumRecordFields(filtered, widget.sumFields)
          : filtered.length;

      return {
        key: widget.key,
        type: widget.type,
        title: widget.title,
        description: widget.description,
        href: widget.href,
        value,
        valueSuffix: widget.valueSuffix,
      };
    }

    const sorted =
      widget.dateField
        ? [...filtered].sort(
            (left, right) =>
              dateTimeValue(right[widget.dateField ?? ""]) -
              dateTimeValue(left[widget.dateField ?? ""])
          )
        : filtered;

    const items =
      sorted.slice(0, widget.limit ?? 8).map((record: any) => ({
        id: String(record.id),
        title: getRecordLabel(record, widget),
        description: getRecordDescription(record, widget),
        date: widget.dateField
          ? String(record[widget.dateField] ?? "")
          : undefined,
        level: widget.level ?? "info",
        href: getRecordHref(record, widget),
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
