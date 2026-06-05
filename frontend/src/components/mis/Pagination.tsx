type Props = {
  page: number;
  totalPages: number;
  size: number;

  onPageChange: (page: number) => void;
  onSizeChange: (size: number) => void;
};


export default function Pagination({
  page,
  totalPages,
  size,
  onPageChange,
  onSizeChange,
}: Props) {

  return (

    <div
      className="
        flex
        flex-col
        sm:flex-row
        items-center
        justify-between
        gap-4
        mt-6
        px-5
        py-4
        bg-gray-900
        rounded-xl
        shadow-lg
        border
        border-gray-700
      "
    >


      <div className="flex items-center gap-2">


        <button
          disabled={page === 0}

          onClick={() =>
            onPageChange(page - 1)
          }

          className="
            px-4
            py-2
            rounded-lg
            bg-gray-800
            border
            border-gray-600
            text-gray-200
            text-sm
            font-medium

            hover:bg-gray-700

            disabled:bg-gray-900
            disabled:text-gray-600
            disabled:border-gray-800
            disabled:cursor-not-allowed

            transition
          "
        >

          Prev

        </button>



        <div className="
          flex
          gap-1
        ">

          {
            Array.from(
              { length: totalPages },
              (_, i) => i
            )
            .map((num) => (

              <button

                key={num}

                onClick={() =>
                  onPageChange(num)
                }

                className={`
                  w-9
                  h-9
                  rounded-lg
                  text-sm
                  font-semibold
                  transition

                  ${
                    page === num
                    ?
                    `
                    bg-blue-600
                    text-white
                    shadow-md
                    `
                    :
                    `
                    bg-gray-800
                    text-gray-300
                    hover:bg-gray-700
                    `
                  }
                `}
              >

                {num + 1}

              </button>

            ))
          }

        </div>




        <button

          disabled={
            page === totalPages - 1
          }

          onClick={() =>
            onPageChange(page + 1)
          }

          className="
            px-4
            py-2
            rounded-lg
            bg-gray-800
            border
            border-gray-600
            text-gray-200
            text-sm
            font-medium

            hover:bg-gray-700

            disabled:bg-gray-900
            disabled:text-gray-600
            disabled:border-gray-800
            disabled:cursor-not-allowed

            transition
          "
        >

          Next

        </button>


      </div>




      <div
        className="
          flex
          items-center
          gap-3
          text-sm
          text-gray-300
        "
      >

        <span>
          Rows:
        </span>


        <select

          name="pageSize"

          aria-label="Records per page"

          value={size}

          onChange={(e) =>
            onSizeChange(
              Number(e.target.value)
            )
          }

          className="
            px-4
            py-2
            rounded-lg

            bg-gray-800

            border
            border-gray-600

            text-gray-200

            cursor-pointer

            focus:outline-none
            focus:ring-2
            focus:ring-blue-500

          "
        >

          <option value={5}>
            5
          </option>

          <option value={10}>
            10
          </option>

          <option value={20}>
            20
          </option>

          <option value={50}>
            50
          </option>

        </select>


      </div>


    </div>
  );
}