package com.mis.student.service;

import com.mis.student.dto.*;
import com.mis.student.repository.StudentRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class StudentService {
    
        private String clean(String value){

                if (value == null || value.isBlank()){
                        return null;
                }      
                return value.toLowerCase() + "%";          
        }


    private final StudentRepository studentRepository;


    public Page<StudentResponseDTO> search(
            StudentFilterDTO dto
    ) {


        int page = dto.getPage() == null
                ? 0
                : dto.getPage();


        int size = dto.getSize() == null
                ? 10
                : dto.getSize();


        Pageable pageable =
                PageRequest.of(
                        page,
                        size,
                        Sort.by("studentId")
                                .descending()
                );


        return studentRepository.searchStudents(

                clean(dto.getStudent_name()),

                dto.getStudent_roll_no(),

                dto.getDepartment_id(),

                dto.getCourse_id(),

                dto.getSemester(),

                pageable
        );
    }
}