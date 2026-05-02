interface Option {

  label: string;

  value: string;
}

interface SelectFieldProps {

  label: string;

  value: string;

  onChange: (
    value: string
  ) => void;

  options: Option[];

  placeholder?: string;

  error?: string;
}

export const SelectField = ({
  label,
  value,
  onChange,
  options,
  placeholder = "Sélectionner",
  error,
}: SelectFieldProps) => {

  return (

    <div className="space-y-2">

      <label className="font-medium">

        {label}

      </label>

      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="
          w-full
          border
          rounded-xl
          p-3
          bg-white
        "
      >

        <option value="">
          {placeholder}
        </option>

        {options.map((option) => (

          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>

        ))}

      </select>

      {error && (

        <p className="text-red-500 text-sm">

          {error}

        </p>

      )}

    </div>
  );
}
