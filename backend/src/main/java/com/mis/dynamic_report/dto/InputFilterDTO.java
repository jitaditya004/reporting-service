package com.mis.dynamic_report.dto;

import lombok.*;
import java.util.*;

@Getter
@Setter
public class InputFilterDTO {

    private String name;

    private String type;

    private String label;

    private String dropdown_query;

    private List<OptionDTO> options;
}