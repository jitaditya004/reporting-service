type Props = {

  page:number;

  totalPages:number;

  size:number;

  onPageChange:
    (page:number)=>void;


  onSizeChange:
    (size:number)=>void;
};



export default function Pagination({
  page,
  totalPages,
  size,
  onPageChange,
  onSizeChange

}:Props){


  return (

    <div className="
      flex
      items-center
      justify-between
      mt-6
    ">


      <div className="flex gap-2">


        <button
          disabled={page===0}

          onClick={() =>
            onPageChange(page-1)
          }
        >

          Prev

        </button>



        {
          Array.from(
            {length:totalPages},
            (_,i)=>i
          )
          .map((num)=>(

            <button

              key={num}


              onClick={()=>
                onPageChange(num)
              }

            >

              {num+1}

            </button>
          ))
        }



        <button

          disabled={
            page===totalPages-1
          }


          onClick={() =>
            onPageChange(page+1)
          }

        >

          Next

        </button>


      </div>


      <select
        name="pageSize"
        aria-label="Records per page"
        value={size}

        onChange={(e)=>
          onSizeChange(
            Number(e.target.value)
          )
        }

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
  );
}