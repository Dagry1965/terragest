export interface ERPBusinessAlert {

  id: string;

  level:
    | "info"
    | "warning"
    | "critical";

  title: string;

  message: string;

  entityType?: string;

  entityId?: string;
}