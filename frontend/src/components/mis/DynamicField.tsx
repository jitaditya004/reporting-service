import type { InputFilter, FilterValue } from "../../types/report";

type Props = {
  field: InputFilter;

  value: FilterValue;

  onChange: (name: string, value: FilterValue) => void;
};

export default function DynamicField({ field, value, onChange }: Props) {
  if (field.type === "dropdown") {
    return (
      <select
        aria-label={field.label}
        value={value}
        onChange={(e) => {
          const value = e.target.value;

          onChange(
            field.name,

            value === "" ? "" : Number(value),
          );
        }}
        className="
          w-full

          bg-gray-900/80
          text-gray-100

          border
          border-white/10

          rounded-2xl

          px-4
          py-3

          outline-none

          shadow-inner
          shadow-black/20

          transition-all
          duration-200

          hover:border-blue-500/40
          hover:bg-gray-900

          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-500/30

          cursor-pointer
        "
      >
        <option value="">Select {field.label}</option>

        {field.options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  return (
    <input
      type={
        field.type === "date"
          ? "date"
          : field.type === "number"
            ? "number"
            : "text"
      }
      value={value}
      onChange={(e) => {
        const value = e.target.value;

        onChange(
          field.name,

          field.type === "number" ? (value === "" ? "" : Number(value)) : value,
        );
      }}
      placeholder={field.label}
      className="
        w-full

        bg-gray-900/80
        text-gray-100

        placeholder:text-gray-500

        border
        border-white/10

        rounded-2xl

        px-4
        py-3

        outline-none

        shadow-inner
        shadow-black/20

        transition-all
        duration-200

        hover:border-blue-500/40
        hover:bg-gray-900

        focus:border-blue-500
        focus:ring-2
        focus:ring-blue-500/30
      "
    />
  );
}
