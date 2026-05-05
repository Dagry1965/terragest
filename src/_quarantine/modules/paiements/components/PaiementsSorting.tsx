"use client";

interface Props {
  field: string;

  direction: "asc" | "desc";

  onToggle: (
    field: string
  ) => void;
}

export function PaiementsSorting({
  field,
  direction,
  onToggle,
}: Props) {
  return (
    <button
      onClick={() =>
        onToggle(field)
      }
      className="flex items-center gap-1"
    >
      <span>{field}</span>

      <span>
        {direction === "asc"
          ? "â†‘"
          : "â†“"}
      </span>
    </button>
  );
}
