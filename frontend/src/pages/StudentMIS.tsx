import { useState, useEffect, useRef } from "react";

import { getReport } from "../api/dynamic_reportApi";

import DynamicFilterForm from "../components/mis/DynamicFilterForm";

import ResultTable from "../components/mis/ResultTable";

import type { StudentRecord, DynamicReport } from "../types/report";

import {
  searchStudents,
  exportStudentCSV,
  exportStudentPDF,
} from "../api/studentApi";

import Pagination from "../components/mis/Pagination";

type FilterValue = string | number;

export default function StudentMIS() {
  const retryCount = useRef(0);

  const MAX_RETRIES = 5;

  const [loadingReport, setLoadingReport] = useState(true);

  const [page, setPage] = useState(0);

  const [size, setSize] = useState(10);

  const [totalPages, setTotalPages] = useState(0);

  const [filters, setFilters] = useState<Record<string, FilterValue>>(() => {
    try {
      const saved = localStorage.getItem("student_filters");

      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [data, setData] = useState<StudentRecord[]>([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [report, setReport] = useState<DynamicReport | null>(null);

  useEffect(() => {
    localStorage.setItem(
      "student_filters",

      JSON.stringify(filters),
    );
  }, [filters]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    async function loadReport() {
      try {
        setLoadingReport(true);

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
              : data.outputColumns,
        });

        setError(null);
      } catch (error) {
        console.error(error);

        retryCount.current += 1;

        if (retryCount.current < MAX_RETRIES) {
          setError(`Retrying ${retryCount.current}/${MAX_RETRIES}`);

          timer = setTimeout(loadReport, 5000);
        } else {
          setError("Unable to load report. Please try again later.");
        }
      } finally {
        setLoadingReport(false);
      }
    }

    loadReport();

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleSearch = async (pageNumber = page, pageSize = size) => {
    try {
      setLoading(true);
      setError(null);

      const response = await searchStudents({
        ...filters,

        page: pageNumber,

        size: pageSize,
      });

      setData(response.content);

      setPage(response.number);

      setTotalPages(response.totalPages);
    } catch (error) {
      console.error(error);

      setError("Failed to fetch student records");
    } finally {
      setLoading(false);
    }
  };

  const handleNewSearch = async () => {
    setPage(0);

    await handleSearch(0, size);
  };

  if (!report) {
    return (
      <div
        className="
            min-h-[calc(100dvh-4rem)]
            flex
            flex-col
            items-center
            justify-center
            gap-4

            text-white
          "
      >
        <div
          className="
              h-12
              w-12

              rounded-full

              border-4
              border-gray-600
              border-t-blue-500

              animate-spin
            "
        />

        <p
          className="
              text-gray-300
            "
        >
          {error ??
            (loadingReport ? "Loading report..." : "Waiting before retry...")}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Dynamic Student MIS</h1>

        <p className="text-gray-400 mt-2">Enterprise reporting engine</p>
      </div>

      <DynamicFilterForm
        filters={filters}
        setFilters={setFilters}
        config={report}
        onSearch={handleNewSearch}
      />

      {error && (
        <div className="rounded-lg bg-red-500/10 p-3 text-red-500">{error}</div>
      )}

      {loading ? (
        <div
          className="
          flex
          justify-center
          py-20
          text-gray-400
        "
        >
          Loading students...
        </div>
      ) : (
        <ResultTable
          columns={report.output_columns}
          data={data}
          onExportCSV={() => exportStudentCSV(filters)}
          onExportPDF={() => exportStudentPDF(filters)}
        />
      )}

      <Pagination
        page={page}
        size={size}
        totalPages={totalPages}
        onPageChange={(p) => {
          setPage(p);

          handleSearch(p, size);
        }}
        onSizeChange={(newSize) => {
          setSize(newSize);

          setPage(0);

          handleSearch(0, newSize);
        }}
      />
    </div>
  );
}
