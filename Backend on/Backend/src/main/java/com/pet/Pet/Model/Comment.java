package com.pet.Pet.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String content;
    @OrderBy("commentDate DESC")
    private Long commentDate;
    private Long reactCount;
    private int reactType;
    private int numberOfChildComments;
    private List<String> media;
    private boolean isBanned;

    @ManyToOne
    @JoinColumn(name = "user_to_id", referencedColumnName = "id")
    private Users userTo;

    @ManyToOne
    @JoinColumn(name = "user_from_id", referencedColumnName = "id")
    private Users userFrom;

    @ManyToOne
    @JoinColumn(name = "blog_id", referencedColumnName = "id")
    private Blog blog;

    @ManyToOne
    @JoinColumn(name = "parent_id", referencedColumnName = "id")
    private Comment parent;

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
    private List<Comment> childComments;
}
