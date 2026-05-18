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
  onFieldChange?: (key: string, value: unknown) => void;
  fieldErrors?: Record<string, string>;
  lockedFields?: string[];
}

export function ERPFormTabs({
  module,
  initialData = {},
  formValues = {},
  onFieldChange,
  fieldErrors = {},
  lockedFields = [],
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

  const activeTabFieldKeys =
    activeTabConfig?.sections?.length
      ? activeTabConfig.sections.flatMap(
          (section) => section.fields
        )
      : activeTabConfig?.fields ?? [];

  const visibleFields =
    fields.filter(
      (field: ERPModuleField) =>
        activeTabFieldKeys.includes(field.key) &&
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
                rounded-lg
                px-5
                py-3
                text-sm
                font-bold
                transition
                ${
                  active
                    ? "bg-slate-950 text-white"
                    : "bg-slate-100 text-[var(--erp-text)] hover:bg-slate-200"
                }
              `}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="rounded-2xl border border-[var(--erp-border)] bg-[var(--erp-surface)] p-6 shadow-sm">

        {activeTabConfig?.sections?.length ? (
  <div className="grid grid-cols-12 gap-6">
            {activeTabConfig.sections.map((section) => {

              // -----------------------------------------------------
              // AJOUT : VISIBILITÉ DES SECTIONS
              // -----------------------------------------------------
              const sectionVisible =
                !section.visibility ||
                (
                  section.visibility.equals !== undefined
                    ? formValues[
                        section.visibility.field
                      ] === section.visibility.equals
                    : true
                ) &&
                (
                  section.visibility.notEquals !== undefined
                    ? formValues[
                        section.visibility.field
                      ] !== section.visibility.notEquals
                    : true
                );

              if (!sectionVisible) {
                return null;
              }
              // -----------------------------------------------------

              const sectionFields =
                visibleFields.filter((field) =>
                  section.fields.includes(field.key)
                );

              if (sectionFields.length === 0) {
                return null;
              }

              return (
         <section
  key={section.key}
  className={`
    col-span-12
    ${
      (section as { grid?: { cols?: number } }).grid?.cols
        ? `xl:col-span-${(section as { grid?: { cols?: number } }).grid?.cols}`
        : ""
    }
    rounded-2xl
    border
    border-slate-200
    bg-slate-50
    p-6
  `}
>
                  <div className="mb-6">
                    <h3 className="text-lg font-black text-[var(--erp-text)]">
                      {section.title}
                    </h3>

                    {section.description && (
                      <p className="mt-1 text-sm text-[var(--erp-text-muted)]">
                        {section.description}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-12 gap-6">
                    {sectionFields.map((field) => (
                   <ERPFormField
                        key={field.key}
                        field={field}
                        value={formValues[field.key]}
                        onChange={onFieldChange}
                        error={fieldErrors[field.key]}
                        lockedFields={lockedFields}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-6">
            {visibleFields.map((field) => (
              <ERPFormField
                        key={field.key}
                        field={field}
                        value={formValues[field.key]}
                        onChange={onFieldChange}
                        error={fieldErrors[field.key]}
                        lockedFields={lockedFields}
                      />
            ))}
          </div>
        )}

        {visibleFields.length === 0 ? (
          <p className="text-sm text-[var(--erp-text-muted)]">
            Aucun champ à afficher pour cet onglet.
          </p>
        ) : null}
      </div>
    </div>
  );
}
