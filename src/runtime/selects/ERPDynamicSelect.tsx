"use client";

import {
  useEffect,
  useState,
}
from "react";

import {
  DynamicSelectEngine,
}
from "@/runtime/selects/DynamicSelectEngine";

interface Props {

  field: string;

  context?: any;

  value?: string;

  onChange?: (
    value: string
  ) => void;
}

export function ERPDynamicSelect({

  field,

  context,

  value,

  onChange,

}: Props) {

  const [
    options,
    setOptions,
  ] = useState<any[]>([]);

  useEffect(() => {

    async function load() {

      const result =
        await DynamicSelectEngine
          .getOptions(
            field,
            context || {}
          );

      setOptions(result);
    }

    load();

  }, [
    field,
    JSON.stringify(context),
  ]);

  return (

    <select
      value={value}
      onChange={(e) =>
        onChange?.(
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
    >

      <option value="">
        Sélectionner
      </option>

      {options.map(
        (option) => (

        <option
          key={option.value}
          value={option.value}
          disabled={
            option.disabled
          }
        >
          {option.label}
        </option>
      ))}

    </select>
  );
}
