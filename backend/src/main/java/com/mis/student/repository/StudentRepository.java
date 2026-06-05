package com.mis.student.repository;

import com.mis.student.entity.Student;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;


@Repository
public interface StudentRepository
        extends JpaRepository<Student, Long>,
                JpaSpecificationExecutor<Student> {


}




// package com.mis.student.repository;

// import com.mis.student.dto.StudentResponseDTO;
// import com.mis.student.entity.Student;

// import org.springframework.data.domain.*;
// import org.springframework.data.jpa.repository.*;
// import org.springframework.data.repository.query.Param;
// import org.springframework.stereotype.Repository;

// @Repository
// public interface StudentRepository extends
//         JpaRepository<Student, Long>,
//         JpaSpecificationExecutor<Student> {


//     @Query("""
//         SELECT new com.mis.student.dto.StudentResponseDTO(

//             s.studentRollNo,

//             s.studentName,

//             d.departmentName,

//             c.courseName,

//             s.semester,

//             sc.marks,

//             sc.attendancePercentage,

//             s.admissionDatetime
//         )


//         FROM Student s


//         LEFT JOIN Department d
//         ON s.departmentId = d.departmentId


//         LEFT JOIN StudentCourse sc
//         ON sc.student.studentId = s.studentId


//         LEFT JOIN Course c
//         ON sc.course.courseId = c.courseId


//         WHERE

//         (
//         :studentName IS NULL
//         OR LOWER(s.studentName)
//         LIKE :studentName
//         )


//         AND
//         (
//         :studentRollNo IS NULL
//         OR s.studentRollNo = :studentRollNo
//         )


//         AND
//         (
//         :departmentId IS NULL
//         OR s.departmentId = :departmentId
//         )


//         AND
//         (
//         :courseId IS NULL
//         OR c.courseId = :courseId
//         )


//         AND
//         (
//         :semester IS NULL
//         OR s.semester = :semester
//         )

//         """)
//         Page<StudentResponseDTO> searchStudents(

//                 @Param("studentName")
//                 String studentName,


//                 @Param("studentRollNo")
//                 String studentRollNo,


//                 @Param("departmentId")
//                 Long departmentId,


//                 @Param("courseId")
//                 Long courseId,


//                 @Param("semester")
//                 Integer semester,


//                 Pageable pageable
//         );
// }