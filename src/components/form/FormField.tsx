interface FormFieldProps {

  label: string;

  error?: string;

  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

export const FormField = ({
  label,
  error,
  inputProps,
}: FormFieldProps) => {

  return (

    <div className="space-y-2">

      <label className="block text-sm font-medium">

        {label}

      </label>

      <input
        {...inputProps}
        className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-black"
      />

      {error && (

        <p className="text-sm text-red-500">

          {error}

        </p>

      )}

    </div>
  );
};
