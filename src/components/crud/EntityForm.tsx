"use client";

type Field = {
  name: string;
  label: string;
  type?: string;
};

type Props = {
  fields: Field[];

  values: Record<string, any>;

  onChange: (
    name: string,
    value: any
  ) => void;

  onSubmit: () => void;
};

export const EntityForm = ({
  fields,
  values,
  onChange,
  onSubmit,
}: Props) => {

  return (
    <div
      className="
        bg-white
        rounded-2xl
        border
        p-6
        space-y-4
      "
    >
      {fields.map((field) => (

        <div key={field.name}>

          <label
            className="
              block
              text-sm
              font-medium
              mb-2
            "
          >
            {field.label}
          </label>

          <input
            type={field.type || "text"}
            value={
              values[field.name] || ""
            }
            onChange={(e) =>
              onChange(
                field.name,
                e.target.value
              )
            }
            className="
              w-full
              border
              rounded-xl
              p-3
            "
          />
        </div>
      ))}

      <button
        onClick={onSubmit}
        className="
          bg-black
          text-white
          px-5
          py-3
          rounded-xl
        "
      >
        Enregistrer
      </button>
    </div>
  );
};