import { useState,useEffect } from "react";

import { getReport } from "../api/dynamic_reportApi";

import DynamicFilterForm
from "../components/mis/DynamicFilterForm";

import ResultTable
from "../components/mis/ResultTable";

import type {
  StudentRecord,
  DynamicReport
} from "../types/report";

import { searchStudents } from "../api/studentApi";

import Pagination from "../components/mis/Pagination";

type FilterValue = string | number;

export default function StudentMIS() {

  const [page, setPage] = useState(0);

  const [size, setSize] = useState(10);

  const [totalPages, setTotalPages] = useState(0);

  const [filters, setFilters] =
    useState<Record<string, FilterValue>>({});

  const [data, setData] =
    useState<StudentRecord[]>([]);

    // const [loading, setLoading] = useState(false);

    const [error, setError] = useState<string | null>(null);

    const [report, setReport] = useState<DynamicReport | null>(null);

    useEffect(() => {
      async function loadReport() {
        try {
          const data = await getReport(1);

          setReport({
            reportId: data.reportId,
            reportName: data.reportName,

            input_filters:
              typeof data.inputFilters === "string"
                ? JSON.parse(data.inputFilters)
                : data.inputFilters,

            output_columns:
              typeof data.outputColumns === "string"
                ? JSON.parse(data.outputColumns)
                : data.outputColumns
          });

        } catch (error) {
          console.error(error);
          setError("Unable to load report config");
        }
      }

      loadReport();

    }, []);

    const handleSearch = async (
      pageNumber = page,
      pageSize = size
    ) => {

      try {

        setError(null);

        const response =
          await searchStudents({

            ...filters,

            page: pageNumber,

            size: pageSize
          });


        setData(response.content);

        setPage(response.number);

        setTotalPages(response.totalPages);


      } catch(error){

        console.error(error);

        setError(
          "Failed to fetch student records"
        );
      }
    };

    if (!report) {
      return <div>Loading report...</div>;
    }

  return (
    <div>

      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          Dynamic Student MIS
        </h1>

        <p className="text-gray-400 mt-2">
          Enterprise reporting engine
        </p>

      </div>

      <DynamicFilterForm
        filters={filters}
        setFilters={setFilters}
        config={report}
        onSearch={handleSearch}
      />

      {error && (
        <div className="rounded-lg bg-red-500/10 p-3 text-red-500">
          {error}
        </div>
      )}

      <ResultTable
        columns={report.output_columns}
        data={data}
      />

      <Pagination

      page={page}

      size={size}

      totalPages={totalPages}


      onPageChange={(p)=>{

          setPage(p);

          handleSearch(p,size);
      }}


      onSizeChange={(newSize)=>{

          setSize(newSize);

          setPage(0);

          handleSearch(0,newSize);
      }}/>

    </div>
  );
}