interface InputProps {

  placeholder?: string;

  value?: string;

  onChange?: any;
}

export const Input = ({
  placeholder,
  value,
  onChange,
}: InputProps) => {

  return (

    <input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="
        w-full
        border
        rounded-xl
        px-4
        py-3
        outline-none
      "
    />

  );
}
