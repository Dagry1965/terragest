type Props = {
  value: string;

  onChange: (
    value: string
  ) => void;
};

export const SearchBar = ({
  value,
  onChange,
}: Props) => {

  return (
    <div>
      <input
        type="text"
        placeholder="Rechercher..."
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="
          w-full
          md:w-80
          border
          rounded-xl
          p-3
          bg-white
        "
      />
    </div>
  );
};