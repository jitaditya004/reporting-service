import type { DynamicReport } from "../types/report";

export const dynamicReport: DynamicReport = {

  input_filters: [

    {
      name: "from_date",
      label: "From Date",
      type: "date",
    },
    {
        name: "to_date",
        label: "To Date",
        type: "date",
    },

    {
        name: "course_id",
        label: "Course",
        type: "dropdown",

        options: [

        {
            value: 101,
            label: "DBMS",
        },

        {
            value: 102,
            label: "Operating System",
        },

        {
            value: 103,
            label: "Computer Networks",
        },

        ],
    },

    {
        name: "student_roll_no",
        label: "Student Roll Number",
        type: "textbox",
    },

    {
      name: "department_id",
      label: "Department",
      type: "dropdown",

      options: [

        {
          value: 1,
          label: "Computer Science",
        },

        {
          value: 2,
          label: "Mechanical",
        },
      ],
    },

    {
      name: "student_name",
      label: "Student Name",
      type: "textbox",
    },
  ],

  output_columns: [

    {
      column: "student_roll_no",
      label: "Roll No",
    },

    {
      column: "student_name",
      label: "Student Name",
    },

    {
      column: "department_name",
      label: "Department",
    },

    {
      column: "marks",
      label: "Marks",
    },
  ],
};