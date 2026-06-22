import { useState } from "react";
import type { OutputColumn } from "../../types/report";

type Props = {
  columns: OutputColumn[];
  data: Record<string, unknown>[];

  onExportCSV: () => Promise<void>;
  onExportPDF: () => Promise<void>;
};

export default function ResultTable({
  columns,
  data,
  onExportCSV,
  onExportPDF,
}: Props) {
  const [csvLoading, setCsvLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);

  async function handleCSVExport() {
    try {
      setCsvLoading(true);

      await onExportCSV();
    } finally {
      setCsvLoading(false);
    }
  }

  async function handlePDFExport() {
    try {
      setPdfLoading(true);

      await onExportPDF();
    } finally {
      setPdfLoading(false);
    }
  }

  return (
    <div>
      {data.length > 0 && (
        <div className="flex justify-end gap-3 mb-4">
          <button
            disabled={csvLoading}
            onClick={handleCSVExport}
            className="
              px-4 py-2
              rounded-xl
              bg-green-600 hover:bg-green-700
              text-white font-medium
              transition
            "
          >
            {csvLoading ? "Exporting..." : "Export CSV"}
          </button>

          <button
            disabled={pdfLoading}
            onClick={handlePDFExport}
            className="
              px-4 py-2
              rounded-xl
              bg-red-600 hover:bg-red-700
              text-white font-medium
              transition
            "
          >
            {pdfLoading ? "Exporting..." : "Export PDF"}
          </button>
        </div>
      )}

      <div
        className="
          max-h-[90vh] overflow-auto
          rounded-3xl
          border border-white/10
          bg-white/5
        "
      >
        <table className="w-full min-w-max text-left">
          <thead
            className="
              sticky top-0 z-10
              bg-gray-900
              text-gray-400
            "
          >
            <tr>
              {columns.map((column) => (
                <th
                  key={column.column}
                  className="
                    px-6 py-4
                    whitespace-nowrap
                  "
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                className="
                  border-t border-white/5
                  hover:bg-white/5
                "
              >
                {columns.map((column) => (
                  <td
                    key={column.column}
                    className="
                      px-6 py-4
                      whitespace-nowrap
                      text-gray-200
                    "
                  >
                    {row[column.column] ? String(row[column.column]) : "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
