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
        max-h-[90vh]
        overflow-auto

        rounded-3xl

        border
        border-white/10

        bg-white/5
      "
    >


      <table
        className="
          w-full
          min-w-max
          text-left
        "
      >


        <thead
          className="
            sticky
            top-0
            z-10

            bg-gray-900
            text-gray-400
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

                hover:bg-white/5
              "
            >


              {columns.map((column) => (


                <td

                  key={column.column}

                  className="
                    px-6
                    py-4

                    whitespace-nowrap

                    text-gray-200
                  "
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