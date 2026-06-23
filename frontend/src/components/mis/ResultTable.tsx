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

  const exporting = csvLoading || pdfLoading;

  return (
    <div className="space-y-4">
      {data.length > 0 && (
        <div className="flex justify-end gap-3 mb-4">
          <button
            disabled={exporting}
            onClick={handleCSVExport}
            className="
              px-5
              py-2.5

              rounded-xl

              bg-green-600
              hover:bg-green-500

              text-white
              text-sm
              font-semibold

              shadow-lg
              shadow-green-600/20

              transition-all
              duration-200

              hover:-translate-y-0.5

              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {csvLoading ? "Exporting..." : "Export CSV"}
          </button>

          <button
            disabled={exporting}
            onClick={handlePDFExport}
            className="
              px-5
              py-2.5

              rounded-xl

              bg-red-600
              hover:bg-red-500

              text-white
              text-sm
              font-semibold

              shadow-lg
              shadow-red-600/20

              transition-all
              duration-200

              hover:-translate-y-0.5

              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {pdfLoading ? "Exporting..." : "Export PDF"}
          </button>
        </div>
      )}

      <div
        className="
          max-h-[90vh]
          overflow-auto

          rounded-3xl

          bg-white/5
          backdrop-blur-xl

          border
          border-white/10

          shadow-2xl
          shadow-black/20
        "
      >
        <table className="w-full min-w-max text-left">
          <thead
            className="
              
              top-0
              z-10

              bg-gray-950/95
              backdrop-blur

              text-gray-400

              border-b
              border-white/10
            "
          >
            <tr>
              {columns.map((column) => (
                <th
                  key={column.column}
                  className="
                    px-6
                    py-4

                    whitespace-nowrap

                    text-xs
                    uppercase
                    tracking-wider
                    font-semibold
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
                  border-t
                  border-white/5

                  transition

                  hover:bg-white/10
                "
              >
                {columns.map((column) => (
                  <td
                    key={column.column}
                    className="
                      px-6
                      py-4

                      whitespace-nowrap

                      text-sm
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
