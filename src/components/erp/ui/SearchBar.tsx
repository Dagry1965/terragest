type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export function SearchBar({
  value,
  onChange,
  placeholder = "Rechercher...",
  className = "",
}: SearchBarProps) {
  return (
    <input
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
      className={[
        "w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm",
        "text-slate-900 shadow-sm outline-none transition",
        "placeholder:text-slate-400",
        "focus:border-slate-400 focus:ring-2 focus:ring-slate-200",
        "dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100",
        className,
      ].join(" ")}
    />
  );
}