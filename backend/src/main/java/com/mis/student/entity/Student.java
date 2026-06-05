package com.mis.student.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

import com.mis.department.entity.Department;


@Entity
@Table(name = "student")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Student {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "student_id")
    private Long studentId;



    @Column(name = "student_roll_no")
    private String studentRollNo;



    @Column(name = "student_name")
    private String studentName;



    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id")
    private Department department;



    private Integer semester;



    @Column(name = "admission_datetime")
    private LocalDateTime admissionDatetime;




    @OneToMany(
            mappedBy = "student",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY
    )
    private List<StudentCourse> courses;

}