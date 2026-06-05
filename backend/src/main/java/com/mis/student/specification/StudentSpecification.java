package com.mis.student.specification;

import com.mis.student.dto.StudentFilterDTO;
import com.mis.student.entity.Student;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;

import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.time.LocalTime;


public class StudentSpecification {


    public static Specification<Student> filter(
            StudentFilterDTO dto
    ) {


        return (root, query, cb) -> {
            query.distinct(true);

            var predicate = cb.conjunction();


            if (dto.getFrom_date() != null &&
                    !dto.getFrom_date().isBlank()) {


                predicate = cb.and(

                        predicate,


                        cb.greaterThanOrEqualTo(

                                root.get("admissionDatetime"),


                                LocalDate
                                        .parse(dto.getFrom_date())
                                        .atStartOfDay()

                        )
                );
            }


            if(dto.getSemester()!=null){


                predicate = cb.and(

                        predicate,


                        cb.equal(

                                root.get("semester"),

                                dto.getSemester()
                        )
                );
            }


            if (dto.getTo_date() != null &&
                    !dto.getTo_date().isBlank()) {


                predicate = cb.and(

                        predicate,


                        cb.lessThanOrEqualTo(

                                root.get("admissionDatetime"),


                                LocalDate
                                        .parse(dto.getTo_date())
                                        .atTime(LocalTime.MAX)

                        )
                );
            }





            if (dto.getDepartment_id() != null) {


                predicate = cb.and(

                        predicate,


                        cb.equal(

                                root
                                .get("department")
                                .get("departmentId"),


                                dto.getDepartment_id()
                        )
                );
            }







            if (dto.getCourse_id() != null) {


                Join<Object,Object> studentCourse =
                        root.join(
                                "courses",
                                JoinType.INNER
                        );


                predicate = cb.and(

                        predicate,


                        cb.equal(

                                studentCourse
                                        .get("course")
                                        .get("courseId"),


                                dto.getCourse_id()
                        )

                );
            }







            if (dto.getStudent_roll_no() != null &&
                    !dto.getStudent_roll_no().isBlank()) {



                predicate = cb.and(

                        predicate,


                        cb.equal(

                                root.get("studentRollNo"),

                                dto.getStudent_roll_no()

                        )
                );
            }








            if (dto.getStudent_name() != null &&
                        !dto.getStudent_name().isBlank()) {


                predicate = cb.and(

                        predicate,


                        cb.like(

                                cb.lower(
                                        root.get("studentName")
                                ),


                                dto
                                .getStudent_name()
                                .toLowerCase()
                                + "%"

                        )
                );
            }



            return predicate;
        };
    }
}