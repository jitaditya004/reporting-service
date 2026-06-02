import DynamicField from "./DynamicField";

import type {
  DynamicReport,
  FilterValue
} from "../../types/report";



type Props = {
  filters: Record<string, FilterValue>;

  setFilters: React.Dispatch<
    React.SetStateAction<
      Record<string, FilterValue>
    >
  >;

  config: DynamicReport;

  onSearch: () => void;
};

export default function DynamicFilterForm({
  filters,
  setFilters,
  config,
  onSearch,
}: Props) {

  function updateField( name: string, value: FilterValue) {

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div
      className="
        bg-white/5
        border
        border-white/10
        rounded-3xl
        p-6
        mb-8
      "
    >

      <h2 className="text-3xl font-bold mb-6">
        Student MIS
      </h2>

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

          <div key={field.name}>

            <label
              className="
                block
                mb-2
                text-sm
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

      <div className="flex gap-4 mt-8">

        <button
          onClick={onSearch}
          className="
            px-6
            py-3
            rounded-xl
            bg-blue-600
            hover:bg-blue-500
            transition
          "
        >
          Search
        </button>

      </div>

    </div>
  );
}