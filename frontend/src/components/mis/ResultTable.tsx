import type {
  OutputColumn,
} from "../../types/report";

type Props = {
  columns: OutputColumn[];

  data: Record<string, unknown>[];
};

export default function ResultTable({
  columns,
  data,
}: Props) {

  return (
    <div
      className="
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-white/5
      "
    >

      <table className="w-full text-left">

        <thead className="bg-white/5 text-gray-400">

          <tr>

            {columns.map((column) => (

              <th
                key={column.column}
                className="px-6 py-4"
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
                hover:bg-white/5
              "
            >

              {columns.map((column) => (

                <td
                  key={column.column}
                  className="px-6 py-4"
                >
                  {
                    row[column.column] 
                      ? String(row[column.column])
                      : "-"
                  }
                </td>

              ))}

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}