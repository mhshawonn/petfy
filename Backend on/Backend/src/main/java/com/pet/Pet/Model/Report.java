package com.pet.Pet.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long reported_to;
    private int reviewType;
    @Column(length = 1000)
    private String content;
    private List<String> mediaUrl;
    private Long timestamp;
    private String status;

    @ManyToOne
    @JoinColumn(name = "report_by", referencedColumnName = "id")
    private Users reportBy;

    @ManyToOne
    @JoinColumn(name = "review_by", referencedColumnName = "id")
    private Users reviewBy;
}
