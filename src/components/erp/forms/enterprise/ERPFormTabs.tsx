"use client";

import { useState } from "react";

import type {
  ERPModule,
  ERPModuleField,
} from "@/runtime/modules";

import {
  RuntimeVisibilityEngine,
} from "@/runtime/visibility/RuntimeVisibilityEngine";

import { ERPFormField } from "./ERPFormField";

interface ERPFormTabsProps {
  module: ERPModule;
  initialData?: Record<string, unknown>;
  formValues?: Record<string, unknown>;
}

export function ERPFormTabs({
  module,
  initialData = {},
  formValues = {},
}: ERPFormTabsProps) {
  const [activeTab, setActiveTab] =
    useState(
      module.form?.tabs?.[0]?.key ?? ""
    );

  const tabs =
    module.form?.tabs ?? [];

  const fields =
    module.schema.fields;

  const activeTabConfig =
    tabs.find(
      (tab) =>
        tab.key === activeTab
    );

  const visibleFields =
    fields.filter(
      (field: ERPModuleField) =>
        activeTabConfig?.fields.includes(
          field.key
        ) &&
        RuntimeVisibilityEngine.isVisible(
          field,
          formValues
        )
    );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3 border-b border-slate-200 pb-4">
        {tabs.map((tab) => {
          const active =
            tab.key === activeTab;

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() =>
                setActiveTab(tab.key)
              }
              className={`
                rounded-2xl
                px-5
                py-3
                text-sm
                font-bold
                transition
                ${
                  active
                    ? "bg-slate-950 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }
              `}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-6 md:grid-cols-2">
          {visibleFields.map((field) => (
            <ERPFormField
              key={field.key}
              field={field}
              initialValue={
                initialData[field.key]
              }
            />
          ))}
        </div>

        {visibleFields.length === 0 ? (
          <p className="text-sm text-slate-500">
            Aucun champ à afficher pour cet onglet.
          </p>
        ) : null}
      </div>
    </div>
  );
}