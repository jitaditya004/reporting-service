package com.mis.dynamic_report.dto;

import lombok.*;
import java.util.*;

@Getter
@Setter
@Builder
public class DynamicReportDTO {

    private Long reportId;

    private String reportName;

    private List<InputFilterDTO> inputFilters;

    private Object outputColumns;
}