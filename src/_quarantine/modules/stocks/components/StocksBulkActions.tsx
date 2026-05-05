"use client";

interface Props {
  selectedIds: string[];

  onDeleteSelected: () => void;
}

export function StocksBulkActions({
  selectedIds,
  onDeleteSelected,
}: Props) {
  if (selectedIds.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 p-4 border-b bg-gray-50">
      <span>
        {selectedIds.length} sÃ©lectionnÃ©(s)
      </span>

      <button
        onClick={onDeleteSelected}
        className="border px-3 py-1 rounded"
      >
        Supprimer
      </button>
    </div>
  );
}
