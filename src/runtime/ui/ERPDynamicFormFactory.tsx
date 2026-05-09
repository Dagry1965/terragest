"use client";

import {
  ERPInput,
  ERPSelect,
  ERPStack,
} from "@/components/erp/ui";

import type {
  ERPBusinessSchema,
} from "../schemas";

interface ERPDynamicFormFactoryProps {

  schema:
    ERPBusinessSchema;
}

export function ERPDynamicFormFactory({
  schema,
}: ERPDynamicFormFactoryProps) {

  return (

    <ERPStack gap="16px">

      {
        schema.fields.map(
          field => {

            if (
              field.type === "select"
            ) {

              return (

                <ERPSelect
                  key={field.key}
                  label={field.label}
                  options={[
                    {
                      label: "Option 1",
                      value: "1",
                    },
                  ]}
                />
              );
            }

            return (

              <ERPInput
                key={field.key}
                label={field.label}
                type={
                  field.type === "number"
                    ? "number"
                    : field.type === "date"
                    ? "date"
                    : "text"
                }
              />
            );
          }
        )
      }

    </ERPStack>
  );
}