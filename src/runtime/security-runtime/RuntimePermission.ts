export type RuntimePermission =
  | "module.read"
  | "module.create"
  | "module.update"
  | "module.delete"
  | "module.export"
  | "module.import"
  | "workflow.start"
  | "workflow.transition"
  | "workflow.validate"
  | "audit.read"
  | "relations.read"
  | "security.manage";