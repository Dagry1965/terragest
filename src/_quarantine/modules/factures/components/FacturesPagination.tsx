"use client";

interface Props {
  page: number;

  totalPages: number;

  onPageChange: (
    page: number
  ) => void;
}

export function FacturesPagination({
  page,
  totalPages,
  onPageChange,
}: Props) {
  return (
    <div className="flex items-center gap-2 p-4">
      <button
        className="border px-3 py-1 rounded"
        disabled={page <= 1}
        onClick={() =>
          onPageChange(page - 1)
        }
      >
        PrÃ©cÃ©dent
      </button>

      <span>
        Page {page} / {totalPages}
      </span>

      <button
        className="border px-3 py-1 rounded"
        disabled={page >= totalPages}
        onClick={() =>
          onPageChange(page + 1)
        }
      >
        Suivant
      </button>
    </div>
  );
}
