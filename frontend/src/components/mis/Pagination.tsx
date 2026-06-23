// type Props = {
//   page: number;
//   totalPages: number;
//   size: number;

//   onPageChange: (page: number) => void;
//   onSizeChange: (size: number) => void;
// };

// type PageItem = number | "...";

// export default function Pagination({
//   page,
//   totalPages,
//   size,
//   onPageChange,
//   onSizeChange,
// }: Props) {

//     function getPages(): PageItem[] {

//       const pages: PageItem[] = [];

//       if (totalPages <= 7) {

//         for (
//           let i = 0;
//           i < totalPages;
//           i++
//         ) {
//           pages.push(i);
//         }

//         return pages;
//       }

//       // first page
//       pages.push(0);

//       // beginning pages
//       if (page <= 3) {

//         pages.push(
//           1,
//           2,
//           3,
//           4
//         );

//         pages.push("...");

//         pages.push(
//           totalPages - 1
//         );

//         return pages;
//       }

//       // ending pages
//       if (
//         page >= totalPages - 4
//       ) {

//         pages.push("...");

//         for (
//           let i = totalPages - 5;
//           i < totalPages;
//           i++
//         ) {

//           pages.push(i);
//         }

//         return pages;
//       }

//       // middle pages
//       pages.push("...");

//       pages.push(
//         page - 1,
//         page,
//         page + 1
//       );

//       pages.push("...");

//       pages.push(
//         totalPages - 1
//       );

//       return pages;
//     }

//   return (

//     <div
//       className="
//         flex
//         flex-col
//         sm:flex-row
//         items-center
//         justify-between
//         gap-4
//         mt-6
//         px-5
//         py-4
//         bg-gray-900
//         rounded-xl
//         shadow-lg
//         border
//         border-gray-700
//       "
//     >

//       <div className="flex items-center gap-2">

//         <button
//           disabled={page === 0}

//           onClick={() =>
//             onPageChange(page - 1)
//           }

//           className="
//             px-4
//             py-2
//             rounded-lg
//             bg-gray-800
//             border
//             border-gray-600
//             text-gray-200
//             text-sm
//             font-medium

//             hover:bg-gray-700

//             disabled:bg-gray-900
//             disabled:text-gray-600
//             disabled:border-gray-800
//             disabled:cursor-not-allowed

//             transition
//           "
//         >

//           Prev

//         </button>

//         <div className="
//           flex
//           gap-1
//         ">

//           {
//             getPages().map((num,index)=>(

//               num === "..."
//               ?
//               (
//                 <span
//                   key={`dots-${index}`}
//                   className="
//                     px-3
//                     py-2
//                     text-gray-400
//                   "
//                 >

//                   ...

//                 </span>
//               )

//               :

//               (
//                 <button

//                   key={`page-${num}`}

//                   onClick={() =>
//                     onPageChange(num)
//                   }

//                   className={`
//                     w-9
//                     h-9
//                     rounded-lg
//                     text-sm
//                     font-semibold
//                     transition

//                     ${
//                       page === num
//                       ?
//                       `
//                       bg-blue-600
//                       text-white
//                       shadow-md
//                       `
//                       :
//                       `
//                       bg-gray-800
//                       text-gray-300
//                       hover:bg-gray-700
//                       `
//                     }
//                   `}
//                 >

//                   {num + 1}

//                 </button>
//               )

//             ))
//           }

//         </div>

//         <button
//           type="button"

//           disabled={
//             page === totalPages - 1
//           }

//           onClick={() =>
//             onPageChange(page + 1)
//           }

//           className="
//             px-4
//             py-2
//             rounded-lg
//             bg-gray-800
//             border
//             border-gray-600
//             text-gray-200
//             text-sm
//             font-medium

//             hover:bg-gray-700

//             disabled:bg-gray-900
//             disabled:text-gray-600
//             disabled:border-gray-800
//             disabled:cursor-not-allowed

//             transition
//           "
//         >

//           Next

//         </button>

//       </div>

//       <div
//         className="
//           flex
//           items-center
//           gap-3
//           text-sm
//           text-gray-300
//         "
//       >

//         <span>
//           Rows:
//         </span>

//         <select

//           name="pageSize"

//           aria-label="Records per page"

//           value={size}

//           onChange={(e) =>
//             onSizeChange(
//               Number(e.target.value)
//             )
//           }

//           className="
//             px-4
//             py-2
//             rounded-lg

//             bg-gray-800

//             border
//             border-gray-600

//             text-gray-200

//             cursor-pointer

//             focus:outline-none
//             focus:ring-2
//             focus:ring-blue-500

//           "
//         >

//           <option value={5}>
//             5
//           </option>

//           <option value={10}>
//             10
//           </option>

//           <option value={20}>
//             20
//           </option>

//           <option value={50}>
//             50
//           </option>

//         </select>

//       </div>

//     </div>
//   );
// }

type Props = {
  page: number;
  totalPages: number;
  size: number;

  onPageChange: (page: number) => void;
  onSizeChange: (size: number) => void;
};

type PageItem = number | "...";

export default function Pagination({
  page,
  totalPages,
  size,
  onPageChange,
  onSizeChange,
}: Props) {
  function getPages(): PageItem[] {
    const pages: PageItem[] = [];

    if (totalPages <= 7) {
      for (let i = 0; i < totalPages; i++) {
        pages.push(i);
      }

      return pages;
    }

    // first page
    pages.push(0);

    // beginning pages
    if (page <= 3) {
      pages.push(1, 2, 3, 4);

      pages.push("...");

      pages.push(totalPages - 1);

      return pages;
    }

    // ending pages
    if (page >= totalPages - 4) {
      pages.push("...");

      for (let i = totalPages - 5; i < totalPages; i++) {
        pages.push(i);
      }

      return pages;
    }

    // middle pages
    pages.push("...");

    pages.push(page - 1, page, page + 1);

    pages.push("...");

    pages.push(totalPages - 1);

    return pages;
  }

  return (
    <div
      className="
        flex flex-col sm:flex-row
        items-center justify-between

        gap-5
        mt-6

        px-6
        py-4

        rounded-2xl

        bg-white/5
        backdrop-blur-xl

        border
        border-white/10

        shadow-2xl
        shadow-black/20
      "
    >
      <div className="flex items-center gap-2">
        <button
          disabled={page === 0}
          onClick={() => onPageChange(page - 1)}
          className="
            px-4
            py-2

            rounded-xl

            bg-gray-900/80
            hover:bg-gray-800

            border
            border-white/10

            text-gray-200
            text-sm
            font-medium

            shadow-md
            shadow-black/20

            transition-all
            duration-200

            hover:-translate-y-0.5

            disabled:opacity-40
            disabled:hover:translate-y-0
            disabled:cursor-not-allowed
          "
        >
          Prev
        </button>

        <div
          className="
            flex
            gap-2
            flex-wrap
            justify-center
          "
        >
          {getPages().map((num, index) =>
            num === "..." ? (
              <span
                key={`dots-${index}`}
                className="
                  px-3 py-2
                  text-gray-500
                "
              >
                ...
              </span>
            ) : (
              <button
                key={`page-${num}`}
                onClick={() => onPageChange(num)}
                className={`
                    w-10
                    h-10

                    rounded-xl

                    text-sm
                    font-semibold

                    transition-all
                    duration-200

                    ${
                      page === num
                        ? `
                          bg-blue-600
                          text-white

                          shadow-lg
                          shadow-blue-600/30

                          scale-105
                        `
                        : `
                          bg-gray-900/70

                          border
                          border-white/10

                          text-gray-300

                          hover:bg-gray-800
                          hover:text-white
                          hover:-translate-y-0.5
                        `
                    }
                  `}
              >
                {num + 1}
              </button>
            ),
          )}
        </div>

        <button
          type="button"
          disabled={page === totalPages - 1}
          onClick={() => onPageChange(page + 1)}
          className="
            px-4
            py-2

            rounded-xl

            bg-gray-900/80
            hover:bg-gray-800

            border
            border-white/10

            text-gray-200
            text-sm
            font-medium

            shadow-md
            shadow-black/20

            transition-all
            duration-200

            hover:-translate-y-0.5

            disabled:opacity-40
            disabled:hover:translate-y-0
            disabled:cursor-not-allowed
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
        <span>Rows:</span>

        <select
          name="pageSize"
          aria-label="Records per page"
          value={size}
          onChange={(e) => onSizeChange(Number(e.target.value))}
          className="
            px-4
            py-2

            rounded-xl

            bg-gray-900/80

            border
            border-white/10

            text-gray-200

            cursor-pointer

            outline-none

            transition-all
            duration-200

            hover:border-blue-500/40

            focus:ring-2
            focus:ring-blue-500/30
          "
        >
          <option value={5}>5</option>

          <option value={10}>10</option>

          <option value={20}>20</option>

          <option value={50}>50</option>
        </select>
      </div>
    </div>
  );
}
