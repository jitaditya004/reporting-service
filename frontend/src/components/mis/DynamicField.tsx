import type {
  InputFilter,
  FilterValue
} from "../../types/report";

type Props = {
  field: InputFilter;

  value: FilterValue;

  onChange: (
    name: string,
    value: FilterValue
  ) => void;
};



export default function DynamicField({
  field,
  value,
  onChange,
}: Props) {

  if(field.type === "dropdown") {

    return (
      <select
        aria-label={field.label}
        value={value}
        onChange={(e) =>
          onChange(field.name,Number(e.target.value) || e.target.value)
        }
        className="
          bg-[#1f2937]
          border
          border-white/10
          rounded-xl
          px-4
          py-3
          outline-none
        "
      >

        <option value="">
          Select {field.label}
        </option>

        {field.options?.map((option) => (

          <option
            key={option.value}
            value={option.value}
          >
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
          : "text"
      }
      value={value}
      onChange={(e) =>
        onChange(field.name, e.target.value)
      }
      placeholder={field.label}
      className="
        bg-[#1f2937]
        border
        border-white/10
        rounded-xl
        px-4
        py-3
        outline-none
      "
    />
  );
}