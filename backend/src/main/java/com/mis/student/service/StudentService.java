package com.mis.student.service;


import com.mis.student.dto.*;
import com.mis.student.entity.Student;
import com.mis.student.entity.StudentCourse;
import com.mis.student.repository.StudentRepository;
import com.mis.student.specification.StudentSpecification;

import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;


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

}