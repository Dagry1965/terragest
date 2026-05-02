interface TextAreaFieldProps {

  label: string;

  value: string;

  error?: string;

  onChange: (
    value: string
  ) => void;
}

export const TextAreaField = ({
  label,
  value,
  error,
  onChange,
}: TextAreaFieldProps) => {

  return (

    <div className="space-y-2">

      <label className="block text-sm font-medium">

        {label}

      </label>

      <textarea
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full border rounded-xl p-3 min-h-32 outline-none focus:ring-2 focus:ring-black"
      />

      {error && (

        <p className="text-sm text-red-500">

          {error}

        </p>

      )}

    </div>
  );
};
