package com.mis.student.repository;

import com.mis.student.entity.StudentCourse;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

public interface StudentCourseRepository
        extends JpaRepository<StudentCourse, Long>,
        JpaSpecificationExecutor<StudentCourse> {


    @Override
    @EntityGraph(
        attributePaths = {
            "student",
            "student.department",
            "course"
        }
    )
    Page<StudentCourse> findAll(
        Specification<StudentCourse> spec,
        Pageable pageable
    );


    @Override
    @EntityGraph(
        attributePaths = {
            "student",
            "student.department",
            "course"
        }
    )
    List<StudentCourse> findAll(
        Specification<StudentCourse> spec
    );
}