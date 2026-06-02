package com.mis.dynamic_report.service;


import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.mis.dynamic_report.dto.*;
import com.mis.dynamic_report.entity.*;
import com.mis.dynamic_report.repository.*;

import lombok.RequiredArgsConstructor;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.*;


@Service
@RequiredArgsConstructor
public class DynamicReportService {


    private final DynamicReportRepository repository;

    private final JdbcTemplate jdbcTemplate;

    private final ObjectMapper objectMapper;



    public DynamicReportDTO getReport(Long id)
            throws Exception {


        DynamicReport report =
                repository.findById(id)
                        .orElseThrow();


        List<InputFilterDTO> filters =
                objectMapper.readValue(
                        report.getInputFilters(),
                        new TypeReference<>() {}
                );


        for(InputFilterDTO filter : filters){


            if("dropdown".equals(filter.getType())){


                List<OptionDTO> options =
                        jdbcTemplate.query(
                                filter.getDropdown_query(),

                                (rs,rowNum) ->
                                        new OptionDTO(
                                                rs.getObject("value"),
                                                rs.getString("label")
                                        )
                        );


                filter.setOptions(options);
            }
        }


        return DynamicReportDTO.builder()

                .reportId(report.getReportId())

                .reportName(report.getReportName())

                .inputFilters(filters)

                .outputColumns(
                        objectMapper.readValue(
                                report.getOutputColumns(),
                                Object.class
                        )
                )

                .build();
    }
}