// src/platform/security/ExecutionPolicy.ts

export interface ExecutionContext {

  user?: string;

  role?: string;

  workflow: string;
}

export class ExecutionPolicy {

  static canExecute(
    context: ExecutionContext
  ): boolean {

    if (
      context.role === "admin"
    ) {

      return true;
    }

    if (
      context.workflow.includes(
        "critical"
      )
    ) {

      console.warn(
        "[SECURITY] critical workflow denied"
      );

      return false;
    }

    return true;
  }
}