import DynamicField from "./DynamicField";

import type { DynamicReport, FilterValue } from "../../types/report";

type Props = {
  filters: Record<string, FilterValue>;

  setFilters: React.Dispatch<React.SetStateAction<Record<string, FilterValue>>>;

  config: DynamicReport;

  onSearch: () => Promise<void>;
};

export default function DynamicFilterForm({
  filters,
  setFilters,
  config,
  onSearch,
}: Props) {
  function updateField(name: string, value: FilterValue) {
    setFilters((prev) => {
      const updated = {
        ...prev,
      };

      if (value === "") {
        delete updated[name];
      } else {
        updated[name] = value;
      }

      return updated;
    });
  }

  return (
    <div
      className="
      bg-white/5
      backdrop-blur-xl

      border
      border-white/10

      rounded-3xl

      p-6
      mb-8

      shadow-2xl
      shadow-black/20
    "
    >
      <div className="mb-8">
        <h2
          className="
          text-3xl
          font-bold
          text-white
        "
        >
          Student MIS
        </h2>

        <p
          className="
          text-sm
          text-gray-400
          mt-1
        "
        >
          Configure filters and generate reports
        </p>
      </div>

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3

        gap-6
      "
      >
        {config.input_filters.map((field) => (
          <div
            key={field.name}
            className="
            flex
            flex-col
            gap-2
          "
          >
            <label
              className="
              text-sm
              font-medium
              text-gray-300
            "
            >
              {field.label}
            </label>

            <DynamicField
              field={field}
              value={filters[field.name] || ""}
              onChange={updateField}
            />
          </div>
        ))}
      </div>

      <div
        className="
        flex
        flex-wrap
        gap-4

        mt-8
        pt-6

        border-t
        border-white/10
      "
      >
        <button
          onClick={() => onSearch()}
          className="
          px-8
          py-3

          rounded-xl

          bg-blue-600
          hover:bg-blue-500

          text-white
          font-semibold

          shadow-lg
          shadow-blue-600/20

          transition-all
          duration-200

          hover:-translate-y-0.5
        "
        >
          Search
        </button>

        <button
          onClick={() => setFilters({})}
          className="
          px-8
          py-3

          rounded-xl

          bg-gray-800
          hover:bg-red-600

          border
          border-white/10

          text-gray-200
          font-semibold

          transition-all
          duration-200

          hover:-translate-y-0.5
        "
        >
          Clear
        </button>
      </div>
    </div>
  );
}
