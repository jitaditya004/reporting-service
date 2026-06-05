package com.mis.student.service;


import com.mis.student.dto.*;
import com.mis.student.entity.Student;
import com.mis.student.entity.StudentCourse;
import com.mis.student.repository.StudentRepository;
import com.mis.student.specification.StudentSpecification;

import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import java.io.*;
import java.util.List;


import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;


import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;

import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Table;


@Service
@RequiredArgsConstructor
public class StudentService {


    private final StudentRepository studentRepository;



    public Page<StudentResponseDTO> search(
            StudentFilterDTO dto
    ) {


        int page = dto.getPage() == null
                ? 0
                : dto.getPage();


        int size = dto.getSize() == null
                ? 10
                : dto.getSize();



        Pageable pageable =
                PageRequest.of(
                        page,
                        size,
                        Sort.by("studentId")
                                .descending()
                );



        return studentRepository
                .findAll(
                        StudentSpecification.filter(dto),
                        pageable
                )
                .map(this::convertToDTO);

    }



    private StudentResponseDTO convertToDTO(
            Student student
    ){


        StudentCourse sc =
                student
                .getCourses()
                .isEmpty()
                ? null
                : student.getCourses().get(0);



        return StudentResponseDTO
                .builder()


                .student_roll_no(
                        student.getStudentRollNo()
                )


                .student_name(
                        student.getStudentName()
                )


                .department_name(
                        student
                        .getDepartment()
                        .getDepartmentName()
                )


                .course_name(
                        sc == null
                        ? null
                        : sc.getCourse()
                          .getCourseName()
                )


                .semester(
                        student.getSemester()
                )


                .marks(
                        sc == null
                        ? null
                        : sc.getMarks()
                )


                .attendance_percentage(
                        sc == null
                        ? null
                        : sc.getAttendancePercentage()
                )


                .admission_datetime(
                        student.getAdmissionDatetime()
                )


                .build();
    }












       public byte[] exportCSV(
                        StudentFilterDTO dto
                ){


                List<Student> students =
                        studentRepository.findAll(

                                StudentSpecification.filter(dto),

                                Sort.by(

                                        Sort.Order.asc("department.departmentName"),

                                        Sort.Order.asc("semester"),

                                        Sort.Order.asc("studentRollNo")

                                )

                        );



                try {


                        ByteArrayOutputStream output =
                                new ByteArrayOutputStream();



                        try (

                        CSVPrinter printer =
                                new CSVPrinter(


                                        new PrintWriter(output),


                                        CSVFormat.DEFAULT

                                                .builder()

                                                .setHeader(

                                                        "Roll No",

                                                        "Student Name",

                                                        "Department",

                                                        "Course",

                                                        "Semester",

                                                        "Marks",

                                                        "Attendance"

                                                )

                                                .get()

                                )

                        ){





                        for(Student student : students){



                                for(StudentCourse sc :
                                        student.getCourses()
                                ){


                                printer.printRecord(


                                        student.getStudentRollNo(),


                                        student.getStudentName(),



                                        student
                                        .getDepartment()
                                        .getDepartmentName(),



                                        sc.getCourse()
                                        .getCourseName(),



                                        student.getSemester(),



                                        sc.getMarks(),



                                        sc.getAttendancePercentage()

                                );

                                }

                        }



                        printer.flush();

                        }




                        return output.toByteArray();



                }
                catch(Exception e){

                        throw new RuntimeException(e);

                }

        }










        public byte[] exportPDF(
                        StudentFilterDTO dto
                ){


                try {


                        ByteArrayOutputStream output =
                                new ByteArrayOutputStream();



                        PdfWriter writer =
                                new PdfWriter(output);



                        PdfDocument pdf =
                                new PdfDocument(writer);



                        Document document =
                                new Document(pdf);




                        Table table =
                                new Table(7);




                        table.addCell("Roll No");

                        table.addCell("Name");

                        table.addCell("Department");

                        table.addCell("Course");

                        table.addCell("Semester");

                        table.addCell("Marks");

                        table.addCell("Attendance");





                        List<Student> students =
                                studentRepository.findAll(

                                        StudentSpecification.filter(dto),

                                        Sort.by(

                                                Sort.Order.asc("department.departmentName"),

                                                Sort.Order.asc("semester"),

                                                Sort.Order.asc("studentRollNo"),

                                                

                                        )

                                );





                        for(Student student : students){



                        for(StudentCourse sc :
                                student.getCourses()
                        ){



                                table.addCell(
                                        student.getStudentRollNo()
                                );



                                table.addCell(
                                        student.getStudentName()
                                );



                                table.addCell(

                                        student
                                        .getDepartment()
                                        .getDepartmentName()

                                );



                                table.addCell(

                                        sc
                                        .getCourse()
                                        .getCourseName()

                                );



                                table.addCell(

                                        String.valueOf(
                                                student.getSemester()
                                        )

                                );



                                table.addCell(

                                        String.valueOf(
                                                sc.getMarks()
                                        )

                                );



                                table.addCell(

                                        String.valueOf(
                                                sc.getAttendancePercentage()
                                        )

                                );


                        }

                        }




                        document.add(table);


                        document.close();



                        return output.toByteArray();


                }
                catch(Exception e){

                        throw new RuntimeException(e);

                }

        }

}