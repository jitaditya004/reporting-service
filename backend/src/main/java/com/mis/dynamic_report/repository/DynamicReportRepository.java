package com.mis.dynamic_report.repository;

import com.mis.dynamic_report.entity.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

@Repository
public interface DynamicReportRepository
        extends JpaRepository<DynamicReport, Long> {
}