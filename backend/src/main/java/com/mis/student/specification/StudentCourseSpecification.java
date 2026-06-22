package com.mis.student.specification;

import com.mis.student.dto.StudentFilterDTO;
import com.mis.student.entity.StudentCourse;

import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.time.LocalTime;


public class StudentCourseSpecification {


    public static Specification<StudentCourse> filter(
        StudentFilterDTO dto
    ) {

        return (root, query, cb) -> {

            var predicate = cb.conjunction();


            if (dto.getCourse_id() != null) {

                predicate = cb.and(
                    predicate,
                    cb.equal(
                        root.get("course")
                            .get("courseId"),
                        dto.getCourse_id()
                    )
                );
            }


            if (dto.getDepartment_id() != null) {

                predicate = cb.and(
                    predicate,
                    cb.equal(
                        root.get("student")
                            .get("department")
                            .get("departmentId"),
                        dto.getDepartment_id()
                    )
                );
            }


            if (dto.getSemester() != null) {

                predicate = cb.and(
                    predicate,
                    cb.equal(
                        root.get("student")
                            .get("semester"),
                        dto.getSemester()
                    )
                );
            }


            if (
                dto.getStudent_roll_no() != null &&
                !dto.getStudent_roll_no().isBlank()
            ) {

                predicate = cb.and(
                    predicate,
                    cb.equal(
                        root.get("student")
                            .get("studentRollNo"),
                        dto.getStudent_roll_no()
                    )
                );
            }


            if (
                dto.getStudent_name() != null &&
                !dto.getStudent_name().isBlank()
            ) {

                predicate = cb.and(
                    predicate,
                    cb.like(
                        cb.lower(
                            root.get("student")
                                .get("studentName")
                        ),
                        dto.getStudent_name()
                            .toLowerCase() + "%"
                    )
                );
            }


            if (
                dto.getFrom_date() != null &&
                !dto.getFrom_date().isBlank()
            ) {

                predicate = cb.and(
                    predicate,
                    cb.greaterThanOrEqualTo(
                        root.get("student")
                            .get("admissionDatetime"),
                        LocalDate
                            .parse(dto.getFrom_date())
                            .atStartOfDay()
                    )
                );
            }


            if (
                dto.getTo_date() != null &&
                !dto.getTo_date().isBlank()
            ) {

                predicate = cb.and(
                    predicate,
                    cb.lessThanOrEqualTo(
                        root.get("student")
                            .get("admissionDatetime"),
                        LocalDate
                            .parse(dto.getTo_date())
                            .atTime(LocalTime.MAX)
                    )
                );
            }


            return predicate;
        };
    }
}