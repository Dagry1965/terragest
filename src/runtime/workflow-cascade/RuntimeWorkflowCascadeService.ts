import type { ERPModule } from "@/runtime/modules/ERPModule";

import { RuntimeDataBinding } from "@/runtime/data-binding/RuntimeDataBinding";
import { coreERPModules } from "@/runtime/modules/definitions/coreModules";

type RuntimeWorkflowCascadeContext = {
  module: ERPModule;
  entityId: string;
  record?: Record<string, unknown>;
  fromState: string;
  toState: string;
  action: string;
  user?: unknown;
  comment?: unknown;
};

function isCancellationState(value: unknown): boolean {
  const status = String(value ?? "").trim().toLowerCase();

  return (
    status === "annule" ||
    status === "annulee" ||
    status === "annulé" ||
    status === "annulée" ||
    status === "cancelled" ||
    status === "canceled"
  );
}

function resolveWorkflowActor(user: unknown): string {
  if (typeof user === "string" && user.trim()) {
    return user.trim();
  }

  if (user && typeof user === "object") {
    const source = user as Record<string, unknown>;

    return String(
      source.id ??
        source.uid ??
        source.email ??
        source.name ??
        "system"
    ).trim();
  }

  return "system";
}

function getRecordId(record: Record<string, unknown>): string {
  return String(record.id ?? record._id ?? record.uid ?? "").trim();
}

function isInterventionAlreadyClosed(record: Record<string, unknown>): boolean {
  const statut = String(record.statut ?? "").trim().toLowerCase();

  return (
    statut === "terminee" ||
    statut === "terminée" ||
    statut === "terminÃ©e" ||
    statut === "annulee" ||
    statut === "annulée" ||
    statut === "annulÃ©e" ||
    statut === "archivee" ||
    statut === "archivée" ||
    statut === "archivÃ©e"
  );
}

export class RuntimeWorkflowCascadeService {
  static async afterTransition(
    context: RuntimeWorkflowCascadeContext
  ): Promise<void> {
    if (
      context.module.metadata.key !== "rendezvous" ||
      !isCancellationState(context.toState)
    ) {
      return;
    }

    await this.cancelLinkedInterventionsFromRendezvous(context);
  }

  private static async cancelLinkedInterventionsFromRendezvous(
    context: RuntimeWorkflowCascadeContext
  ): Promise<void> {
    const interventionsModule = coreERPModules.find(
      (module) => module.metadata.key === "interventionsauto"
    );

    if (!interventionsModule) {
      return;
    }

    const consumedByInterventionId = String(
      context.record?.consumedByInterventionId ?? ""
    ).trim();

    const allInterventions =
      await RuntimeDataBinding.list(interventionsModule);

    const linkedInterventions = allInterventions.filter((intervention) => {
      const interventionId = getRecordId(intervention);

      return (
        String(intervention.rendezVousId ?? "").trim() === context.entityId ||
        (consumedByInterventionId &&
          interventionId === consumedByInterventionId)
      );
    });

    if (linkedInterventions.length === 0) {
      return;
    }

    const now = new Date().toISOString();
    const actor = resolveWorkflowActor(context.user);
    const reason =
      typeof context.comment === "string" && context.comment.trim()
        ? context.comment.trim()
        : "Annulation en cascade depuis le rendez-vous.";

    for (const intervention of linkedInterventions) {
      const interventionId = getRecordId(intervention);

      if (!interventionId || isInterventionAlreadyClosed(intervention)) {
        continue;
      }

      await RuntimeDataBinding.update(
        interventionsModule,
        interventionId,
        {
          statut: "annulee",
          cancelledAt: now,
          cancelledBy: actor,
          cancelReason: reason,
          cancelledFromModule: "rendezvous",
          cancelledFromId: context.entityId,
        }
      );
    }
  }
}
