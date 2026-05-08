export type ERPEventRuntimeLevel =
  | "info"
  | "success"
  | "warning"
  | "danger";

export interface ERPEventRuntimeEvent {
  id: string;
  name: string;
  sourceModule: string;
  targetModules: string[];
  level: ERPEventRuntimeLevel;
  payload: Record<string, unknown>;
  createdAt: string;
}

export interface ERPEventRuntimeSubscription {
  id: string;
  moduleKey: string;
  eventName: string;
  handlerLabel: string;
}