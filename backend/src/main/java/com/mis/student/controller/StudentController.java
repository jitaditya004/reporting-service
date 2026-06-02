package com.mis.student.controller;

import com.mis.student.dto.*;
import com.mis.student.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

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
}