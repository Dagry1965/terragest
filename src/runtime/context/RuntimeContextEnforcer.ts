import type {
  ERPModule,
} from "@/runtime/modules";

import {
  ERPSessionContext,
} from "@/runtime/security/sessions/ERPSessionContext";

import type {
  RuntimeContext,
  RuntimeContextOptions,
  RuntimeParentContext,
  RuntimeRecordContext,
} from "./RuntimeContextTypes";

type RuntimeRecord =
  Record<string, unknown>;

function valueOf(
  record: RuntimeRecord,
  key: string
): string {
  return String(record[key] ?? "").trim();
}

function cleanRuntimeRecord(
  record: RuntimeRecord
): RuntimeRecord {
  const next: RuntimeRecord = {};

  for (const [key, value] of Object.entries(record)) {
    if (value === undefined) {
      continue;
    }

    next[key] = value;
  }

  return next;
}

export class RuntimeContextEnforcer {
  static resolveModuleKey(
    module: ERPModule
  ): string {
    return (
      module.metadata?.key ??
      module.schema?.collection ??
      "unknown"
    );
  }

  static resolveWorkspace(
    module: ERPModule,
    options?: RuntimeContextOptions
  ): string {
    return (
      options?.context?.workspace ??
      module.metadata?.category ??
      "general"
    );
  }

  static getCurrentContext(
    module?: ERPModule,
    options?: RuntimeContextOptions
  ): RuntimeContext {
    const session =
      ERPSessionContext.current();

    return {
      tenantId:
        options?.context?.tenantId ??
        session.tenantId ??
        "default",

      workspace:
        options?.context?.workspace ??
        (module
          ? RuntimeContextEnforcer.resolveWorkspace(module, options)
          : "general"),

      userId:
        options?.context?.userId ??
        session.userId ??
        "system",

      source:
        options?.source ??
        options?.context?.source ??
        "unknown",
    };
  }

  static buildContextPath(
    context: RuntimeContext,
    module: ERPModule
  ): string {
    return [
      context.tenantId,
      context.workspace,
      RuntimeContextEnforcer.resolveModuleKey(module),
    ].join("/");
  }

  static buildRecordContext(
    module: ERPModule,
    options?: RuntimeContextOptions
  ): RuntimeRecordContext {
    const context =
      RuntimeContextEnforcer.getCurrentContext(
        module,
        options
      );

    const moduleKey =
      RuntimeContextEnforcer.resolveModuleKey(module);

    const recordContext: RuntimeRecordContext = {
      tenantId: context.tenantId,
      workspace: context.workspace,
      moduleKey,
      contextPath:
        RuntimeContextEnforcer.buildContextPath(
          context,
          module
        ),
      ...(context.userId
        ? { userId: context.userId }
        : {}),
      ...(options?.parent?.parentModuleKey
        ? { parentModuleKey: options.parent.parentModuleKey }
        : {}),
      ...(options?.parent?.parentRecordId
        ? { parentRecordId: options.parent.parentRecordId }
        : {}),
      ...(options?.parent?.parentForeignKey
        ? { parentForeignKey: options.parent.parentForeignKey }
        : {}),
    };

    return recordContext;
  }

  static enforceWriteContext(
    module: ERPModule,
    payload: RuntimeRecord,
    options?: RuntimeContextOptions
  ): RuntimeRecord {
    const recordContext =
      RuntimeContextEnforcer.buildRecordContext(
        module,
        options
      );

    return cleanRuntimeRecord({
      ...payload,
      ...recordContext,
    });
  }

  static inheritParentContext(
    parentRecord: RuntimeRecord,
    childModule: ERPModule,
    payload: RuntimeRecord,
    parent: RuntimeParentContext
  ): RuntimeRecord {
    return RuntimeContextEnforcer.enforceWriteContext(
      childModule,
      payload,
      {
        context: {
          tenantId:
            valueOf(parentRecord, "tenantId") ||
            undefined,
          workspace:
            valueOf(parentRecord, "workspace") ||
            undefined,
          userId:
            valueOf(parentRecord, "userId") ||
            undefined,
        },
        parent,
        source: "form",
      }
    );
  }

  static isRecordInContext(
    module: ERPModule,
    record: RuntimeRecord,
    options?: RuntimeContextOptions
  ): boolean {
    const context =
      RuntimeContextEnforcer.getCurrentContext(
        module,
        options
      );

    const moduleKey =
      RuntimeContextEnforcer.resolveModuleKey(module);

    const recordTenantId =
      valueOf(record, "tenantId");

    const recordWorkspace =
      valueOf(record, "workspace");

    const recordModuleKey =
      valueOf(record, "moduleKey");

    if (
      recordTenantId &&
      recordTenantId !== context.tenantId
    ) {
      return false;
    }

    if (
      recordWorkspace &&
      recordWorkspace !== context.workspace
    ) {
      return false;
    }

    if (
      recordModuleKey &&
      recordModuleKey !== moduleKey
    ) {
      return false;
    }

    return true;
  }

  static filterReadContext<T extends RuntimeRecord>(
    module: ERPModule,
    records: T[],
    options?: RuntimeContextOptions
  ): T[] {
    return records.filter((record) =>
      RuntimeContextEnforcer.isRecordInContext(
        module,
        record,
        options
      )
    );
  }

  static assertRecordInContext(
    module: ERPModule,
    record: RuntimeRecord,
    options?: RuntimeContextOptions
  ): void {
    if (
      RuntimeContextEnforcer.isRecordInContext(
        module,
        record,
        options
      )
    ) {
      return;
    }

    throw new Error(
      "Accès refusé : cet enregistrement n'appartient pas au contexte runtime courant."
    );
  }

  static buildEventContext(
    module: ERPModule,
    payload: RuntimeRecord,
    options?: RuntimeContextOptions
  ): RuntimeRecordContext {
    return RuntimeContextEnforcer.buildRecordContext(
      module,
      {
        ...options,
        context: {
          tenantId:
            valueOf(payload, "tenantId") ||
            options?.context?.tenantId,
          workspace:
            valueOf(payload, "workspace") ||
            options?.context?.workspace,
          userId:
            valueOf(payload, "userId") ||
            options?.context?.userId,
        },
      }
    );
  }
}
