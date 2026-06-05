package com.mis.student.dto;


import lombok.*;
import java.time.LocalDateTime;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StudentResponseDTO {


    private String student_roll_no;


    private String student_name;


    private String department_name;


    private String course_name;


    private Integer semester;


    private Double marks;


    private Double attendance_percentage;


    private LocalDateTime admission_datetime;
}