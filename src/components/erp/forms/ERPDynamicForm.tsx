"use client";

import {
  useMemo,
  useState,
}
from "react";

import {
  DynamicFormRegistry,
}
from "@/runtime/forms/DynamicFormRegistry";

import {
  RuntimeContextEngine,
}
from "@/runtime/context/RuntimeContextEngine";

import {
  ERPDynamicSelect,
}
from "@/runtime/selects/ERPDynamicSelect";

interface Props {

  module: string;

  context?: any;
}

export function ERPDynamicForm({

  module,

  context,

}: Props) {

  const runtimeContext =
    useMemo(() => {

      return RuntimeContextEngine
        .buildContext(
          context || {}
        );

    }, [context]);

  const fields =
    useMemo(() => {

      return DynamicFormRegistry
        .getForm(
          module,
          runtimeContext
        );

    }, [
      module,
      runtimeContext,
    ]);

  const [
    values,
    setValues,
  ] = useState<
    Record<string, any>
  >({});

  function setField(
    field: string,
    value: any
  ) {

    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  return (

    <div className="space-y-4">

      {fields.map((field) => (

        <div
          key={field.name}
          className="space-y-2"
        >

          <label
            className="
              text-sm
              font-medium
            "
          >
            {field.label}
          </label>

          {field.type ===
            "select" ? (

            <ERPDynamicSelect
              field={field.name}
              context={{
                ...runtimeContext,
                ...values,
              }}
              value={
                values[field.name]
              }
              onChange={(v) =>
                setField(
                  field.name,
                  v
                )
              }
            />

          ) : field.type ===
            "textarea" ? (

            <textarea
              value={
                values[field.name] ||
                ""
              }

              onChange={(e) =>
                setField(
                  field.name,
                  e.target.value
                )
              }

              className="
                w-full
                border
                rounded-xl
                px-3
                py-2
              "
            />

          ) : (

            <input
              type={
                field.type
              }

              value={
                values[field.name] ||
                ""
              }

              onChange={(e) =>
                setField(
                  field.name,
                  e.target.value
                )
              }

              className="
                w-full
                border
                rounded-xl
                px-3
                py-2
              "
            />

          )}

        </div>
      ))}

      <pre
        className="
          bg-slate-100
          p-4
          rounded-xl
          text-xs
          overflow-auto
        "
      >
        {JSON.stringify(
          values,
          null,
          2
        )}
      </pre>

    </div>
  );
}
