"use client";

import { useEffect, useState } from "react";

import { ERPBadge } from "@/components/erp/ui";
import type { ERPModuleField } from "@/runtime/modules";
import { ERPRelationDataLoader } from "@/runtime/modules/lifecycle/ERPRelationDataLoader";

interface Props {
  field: ERPModuleField;
  value: unknown;
}

const relationCache = new Map<string, Map<string, string>>();

function getRelationModuleKey(field: ERPModuleField) {
  const relation = field.relation as
    | string
    | {
        module?: string;
        moduleKey?: string;
        target?: string;
      }
    | undefined;

  if (!relation) {
    return null;
  }

  if (typeof relation === "string") {
    return relation;
  }

  return (
    relation.module ??
    relation.moduleKey ??
    relation.target ??
    null
  );
}

function ERPRuntimeRelationValue({
  field,
  value,
}: Props) {
  const relationId = String(value ?? "").trim();
  const relationModuleKey = getRelationModuleKey(field);

  const [label, setLabel] = useState<string>(relationId);

  useEffect(() => {
    let active = true;

    async function loadLabel() {
      if (!relationId || !relationModuleKey) {
        return;
      }

      const cachedModule = relationCache.get(relationModuleKey);
      const cachedLabel = cachedModule?.get(relationId);

      if (cachedLabel) {
        setLabel(cachedLabel);
        return;
      }

      const options = await ERPRelationDataLoader.load(relationModuleKey);

      const moduleMap = new Map<string, string>();

      for (const option of options) {
        moduleMap.set(
          String(option.id),
          String(option.label)
        );
      }

      relationCache.set(relationModuleKey, moduleMap);

      const resolvedLabel = moduleMap.get(relationId) ?? relationId;

      if (active) {
        setLabel(resolvedLabel);
      }
    }

    loadLabel();

    return () => {
      active = false;
    };
  }, [relationId, relationModuleKey]);

  return (
    <span className="font-semibold text-blue-700">
      {label}
    </span>
  );
}

export function ERPRuntimeFieldValue({
  field,
  value,
}: Props) {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return (
      <span className="text-slate-500">
        —
      </span>
    );
  }

  if (
    field.type === "date" ||
    field.type === "datetime"
  ) {
    if (
      typeof value === "object" &&
      value &&
      "seconds" in value
    ) {
      return (
        <span>
          {new Date(
            Number((value as { seconds: number }).seconds) * 1000
          ).toLocaleDateString("fr-FR")}
        </span>
      );
    }

    return (
      <span>
        {new Date(String(value)).toLocaleDateString("fr-FR")}
      </span>
    );
  }

  if (
    field.type === "relation" ||
    field.relation
  ) {
    return (
      <ERPRuntimeRelationValue
        field={field}
        value={value}
      />
    );
  }

  if (field.type === "boolean") {
    return (
      <ERPBadge tone={value ? "success" : "danger"}>
        {value ? "Oui" : "Non"}
      </ERPBadge>
    );
  }

  return (
    <span>
      {String(value)}
    </span>
  );
}