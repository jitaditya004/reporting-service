package com.mis.dynamic_report.controller;


import com.mis.dynamic_report.dto.*;
import com.mis.dynamic_report.service.*;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class DynamicReportController {


    private final DynamicReportService service;



    @GetMapping("/{id}")
    public DynamicReportDTO getReport(
            @PathVariable Long id
    ) throws Exception {


        return service.getReport(id);
    }
}