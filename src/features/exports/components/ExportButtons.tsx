"use client";

import { ExportService } from "@/features/exports/services/ExportService";

interface ExportButtonsProps {

  data: any[];

  fileName: string;
}

export const ExportButtons = ({
  data,
  fileName,
}: ExportButtonsProps) => {

  return (

    <div className="
      flex
      items-center
      gap-3
    ">

      <button
        onClick={() =>
          ExportService.exportExcel(
            data,
            fileName
          )
        }
        className="
          px-4
          py-3
          rounded-xl
          bg-green-600
          text-white
        "
      >
        Export Excel
      </button>

      <button
        onClick={() =>
          ExportService.exportPdf(
            data,
            fileName
          )
        }
        className="
          px-4
          py-3
          rounded-xl
          bg-red-600
          text-white
        "
      >
        Export PDF
      </button>

    </div>
  );
}
