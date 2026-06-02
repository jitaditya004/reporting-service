export type FilterValue =
  | string
  | number;


export type FilterOption = {
  value: FilterValue;

  label: string;
};


export type InputFilter = {
  name: string;

  label: string;

  type:
    | "textbox"
    | "dropdown"
    | "date"
    | "number";


  options?: FilterOption[];
};


export type OutputColumn = {
  column: string;

  label: string;
};


export type DynamicReportResponse = {
  reportId: number;

  reportName: string;

  inputFilters: string;

  outputColumns: string;
};


export type DynamicReport = {
  reportId: number;

  reportName: string;

  input_filters: InputFilter[];

  output_columns: OutputColumn[];
};


export type SearchFilters = Record<
  string,
  FilterValue
>;


export type StudentRecord = {
  student_roll_no: string;

  student_name: string;

  department_name: string;

  course_name: string;

  marks: number;
};


export type ReportRow = Record<
  string,
  string | number | null
>;