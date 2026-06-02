package com.mis.dynamic_report.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "dynamic_report")
@Getter
@Setter
public class DynamicReport {

    @Id
    @Column(name = "report_id")
    private Long reportId;

    private String reportName;

    @Column(columnDefinition = "jsonb")
    private String inputFilters;

    @Column(columnDefinition = "jsonb")
    private String outputColumns;

    @Column(name = "query", columnDefinition = "TEXT")
    private String query;
}