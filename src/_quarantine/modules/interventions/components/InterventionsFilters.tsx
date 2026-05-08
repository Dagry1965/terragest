"use client";

interface Props {
  search: string;

  onSearchChange: (
    value: string
  ) => void;
}

export function InterventionsFilters({
  search,
  onSearchChange,
}: Props) {
  return (
    <div className="p-4 border-b">
      <input
        value={search}
        onChange={(e) =>
          onSearchChange(
            e.target.value
          )
        }
        placeholder="Recherche..."
        className="border p-2 rounded w-full"
      />
    </div>
  );
}
