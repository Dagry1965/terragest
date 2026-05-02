"use client";

import * as XLSX from "xlsx";

import jsPDF from "jspdf";

import autoTable from "jspdf-autotable";

export const ExportService = {

  exportExcel(
    data: any[],
    fileName: string
  ) {

    const worksheet =
      XLSX.utils.json_to_sheet(
        data
      );

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Data"
    );

    XLSX.writeFile(
      workbook,
      `${fileName}.xlsx`
    );
  },

  exportPdf(
    data: any[],
    fileName: string
  ) {

    const doc = new jsPDF();

    if (data.length === 0) {

      doc.text(
        "Aucune donnée",
        20,
        20
      );

      doc.save(
        `${fileName}.pdf`
      );

      return;
    }

    const headers =
      Object.keys(data[0]);

    const rows =
      data.map(
        (item) =>
          headers.map(
            (header) =>
              String(
                item[header] ?? ""
              )
          )
      );

    autoTable(doc, {

      head: [headers],

      body: rows,
    });

    doc.save(
      `${fileName}.pdf`
    );
  },
};
