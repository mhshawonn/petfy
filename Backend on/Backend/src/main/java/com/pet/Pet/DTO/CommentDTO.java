package com.pet.Pet.DTO;

import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CommentDTO {
    private Long id;
    @Lob
    private String content;
    private Long commentDate;
    private Long reactCount;
    private int reactType;
    private int numberOfChildComments;
    private boolean isBanned;
    private List<String> media;
    private Long userFromId;
    private String userFromUsername;
    private String userFromProfilePic;
    private String userToUsername;
}
