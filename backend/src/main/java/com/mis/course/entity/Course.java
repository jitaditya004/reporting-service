package com.mis.course.entity;


import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name = "course")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Course {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "course_id")
    private Long courseId;



    @Column(name = "course_name")
    private String courseName;



    @Column(name = "department_id")
    private Long departmentId;



    @Column(name = "teacher_id")
    private Long teacherId;



    private Integer credits;

}