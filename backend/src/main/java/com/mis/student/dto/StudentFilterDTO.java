package com.mis.student.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentFilterDTO {

    private String from_date;

    private String to_date;

    private Long course_id;

    private Long department_id;

    private String student_roll_no;

    private String student_name;

    private Integer page;

    private Integer size;
}