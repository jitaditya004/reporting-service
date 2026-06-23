



package com.mis.student.service;

import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Table;
import com.mis.student.dto.*;
import com.mis.student.entity.Student;
import com.mis.student.entity.StudentCourse;
import com.mis.student.repository.StudentCourseRepository;
// import com.mis.student.repository.StudentRepository;
import com.mis.student.specification.StudentCourseSpecification;
// import com.mis.student.specification.StudentSpecification;

import lombok.RequiredArgsConstructor;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.PrintWriter;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentService {

    // private final StudentRepository studentRepository;
    private final StudentCourseRepository studentCourseRepository;

    private void sortRecords(
        List<StudentCourse> records
    ) {

        records.sort(
            Comparator

                .comparing(
                    (StudentCourse sc) ->
                        sc.getStudent()
                            .getDepartment()
                            .getDepartmentName()
                )

                .thenComparing(
                    sc ->
                        sc.getStudent()
                            .getSemester()
                )

                .thenComparing(
                    sc ->
                        sc.getStudent()
                            .getStudentRollNo()
                )

                .thenComparing(
                    StudentCourse::getMarks,
                    Comparator.reverseOrder()
                )
        );
    }

    // public Page<StudentResponseDTO> search(StudentFilterDTO dto) {

    //     int page = dto.getPage() == null ? 0 : dto.getPage();
    //     int size = dto.getSize() == null ? 10 : dto.getSize();

    //     Pageable pageable = PageRequest.of(
    //         page,
    //         size,
    //         Sort.by(
    //             Sort.Order.asc("department.departmentName"),
    //             Sort.Order.asc("semester"),
    //             Sort.Order.asc("studentRollNo")
    //         )
    //     );

    //     return studentRepository
    //         .findAll(StudentSpecification.filter(dto), pageable)
    //         .map(this::convertToDTO);
    // }

    // private StudentResponseDTO convertToDTO(Student student) {

    //     StudentCourse sc = student.getCourses().isEmpty()
    //         ? null
    //         : student.getCourses().get(0);

    //     return StudentResponseDTO.builder()
    //         .student_roll_no(student.getStudentRollNo())
    //         .student_name(student.getStudentName())
    //         .department_name(
    //             student.getDepartment().getDepartmentName()
    //         )
    //         .course_name(
    //             sc == null ? null : sc.getCourse().getCourseName()
    //         )
    //         .semester(student.getSemester())
    //         .marks(
    //             sc == null ? null : sc.getMarks()
    //         )
    //         .attendance_percentage(
    //             sc == null ? null : sc.getAttendancePercentage()
    //         )
    //         .admission_datetime(student.getAdmissionDatetime())
    //         .build();
    // }

    public Page<StudentResponseDTO> search(StudentFilterDTO dto) {


        int page =
            dto.getPage() == null ? 0 : dto.getPage();

        int size =
            dto.getSize() == null ? 10 : dto.getSize();


        Pageable pageable = PageRequest.of(
            page,
            size,
            Sort.by(
                Sort.Order.asc(
                    "student.department.departmentName"
                ),
                Sort.Order.asc(
                    "student.semester"
                ),
                Sort.Order.asc(
                    "student.studentRollNo"
                ),
                Sort.Order.desc("marks")
            )
        );


        return studentCourseRepository
            .findAll(
                StudentCourseSpecification.filter(dto),
                pageable
            )
            .map(this::convertToDTO);
    }

    private StudentResponseDTO convertToDTO(
        StudentCourse sc
    ) {

        Student student = sc.getStudent();


        return StudentResponseDTO.builder()
            .student_roll_no(
                student.getStudentRollNo()
            )
            .student_name(
                student.getStudentName()
            )
            .department_name(
                student.getDepartment()
                    .getDepartmentName()
            )
            .course_name(
                sc.getCourse()
                    .getCourseName()
            )
            .semester(
                student.getSemester()
            )
            .marks(
                sc.getMarks()
            )
            .attendance_percentage(
                sc.getAttendancePercentage()
            )
            .admission_datetime(
                student.getAdmissionDatetime()
            )
            .build();
    }

    public byte[] exportCSV(StudentFilterDTO dto) {

        try {

            List<StudentCourse> records = studentCourseRepository.findAll(
                StudentCourseSpecification.filter(dto)
            );

            sortRecords(records);

            ByteArrayOutputStream output = new ByteArrayOutputStream();

            try (
                CSVPrinter printer = new CSVPrinter(
                    new PrintWriter(output),
                    CSVFormat.DEFAULT.builder()
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
            ) {

                for (StudentCourse sc : records) {
                    Student student = sc.getStudent();
                
                    printer.printRecord(
                        student.getStudentRollNo(),
                        student.getStudentName(),
                        student.getDepartment().getDepartmentName(),
                        sc.getCourse().getCourseName(),
                        student.getSemester(),
                        sc.getMarks(),
                        sc.getAttendancePercentage()
                    );
                    
                }

                printer.flush();
            }

            return output.toByteArray();

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public byte[] exportPDF(StudentFilterDTO dto) {

        try {

            List<StudentCourse> records =
                studentCourseRepository.findAll(
                    StudentCourseSpecification.filter(dto)
                );

            sortRecords(records);

            ByteArrayOutputStream output = new ByteArrayOutputStream();

            PdfWriter writer = new PdfWriter(output);
            PdfDocument pdf = new PdfDocument(writer);
            Document document = new Document(pdf);

            Table table = new Table(7);

            String[] headers = {
                "Roll No",
                "Name",
                "Department",
                "Course",
                "Semester",
                "Marks",
                "Attendance"
            };

            for (String h : headers) {
                table.addCell(h);
            }

            for (StudentCourse sc : records) {

                    Student student =sc.getStudent();

                    table.addCell(student.getStudentRollNo());
                    table.addCell(student.getStudentName());

                    table.addCell(
                        student.getDepartment().getDepartmentName()
                    );

                    table.addCell(
                        sc.getCourse().getCourseName()
                    );

                    table.addCell(
                        String.valueOf(student.getSemester())
                    );

                    table.addCell(
                        String.valueOf(sc.getMarks())
                    );

                    table.addCell(
                        String.valueOf(sc.getAttendancePercentage())
                    );
                
            }

            document.add(table);
            document.close();

            return output.toByteArray();

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}