package com.pet.Pet.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Blog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String  title;
    @Lob
    private String content;
    private Long publicationDate;
    @OrderBy("lastUpdate DESC")
    private Long lastUpdate;
    private boolean featured;
    private List<String> media;
    private Long numberOfReports;
    private boolean isBanned;
    private Long numberOfComments;
    private Long reactCount;
    private int reactType;

    @ManyToOne
    @JoinColumn(name = "author_id", referencedColumnName = "id")
    private Users author;

    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "blog_tags",
            joinColumns = @JoinColumn(name = "blog_id",referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id",referencedColumnName = "id")
    )
    private List<Tags> tags;

    @JsonIgnore
    @OneToMany(mappedBy="blog",cascade = CascadeType.ALL)
    private List<Comment> comments;
}
