"use client";

interface Props {
  onExportCSV: () => void;

  onExportExcel: () => void;

  onExportPDF: () => void;
}

export function MaterielsExportActions({
  onExportCSV,
  onExportExcel,
  onExportPDF,
}: Props) {
  return (
    <div className="flex gap-2 p-4 border-b">
      <button
        onClick={onExportCSV}
        className="border px-3 py-1 rounded"
      >
        Export CSV
      </button>

      <button
        onClick={onExportExcel}
        className="border px-3 py-1 rounded"
      >
        Export Excel
      </button>

      <button
        onClick={onExportPDF}
        className="border px-3 py-1 rounded"
      >
        Export PDF
      </button>
    </div>
  );
}
