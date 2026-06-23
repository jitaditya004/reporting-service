package com.mis.student.controller;

import com.mis.student.dto.*;
import com.mis.student.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;

    @PostMapping("/search")
    public Page<StudentResponseDTO> search(
            @RequestBody StudentFilterDTO dto
    ) {

        return studentService.search(dto);
    }


     @PostMapping("/export/csv")
        public ResponseEntity<byte[]> exportCSV(
                @RequestBody StudentFilterDTO dto
        ){


            byte[] file =
                    studentService.exportCSV(dto);



            return ResponseEntity.ok()


                    .header(
                        "Content-Disposition",
                        "attachment; filename=students_report.csv"
                    )


                    .header(
                        "Content-Type",
                        "text/csv"
                    )


                    .body(file);

        }







        @PostMapping("/export/pdf")
        public ResponseEntity<byte[]> exportPDF(
                @RequestBody StudentFilterDTO dto
        ){


            byte[] file =
                    studentService.exportPDF(dto);



            return ResponseEntity.ok()


                    .header(
                        "Content-Disposition",
                        "attachment; filename=students_report.pdf"
                    )


                    .header(
                        "Content-Type",
                        "application/pdf"
                    )


                    .body(file);

        }


}