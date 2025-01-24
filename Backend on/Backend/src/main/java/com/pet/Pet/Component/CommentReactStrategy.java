package com.pet.Pet.Component;

import com.pet.Pet.Model.Comment;
import com.pet.Pet.Repo.CommentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CommentReactStrategy implements ReactStrategy {
    @Autowired
    private CommentRepo commentRepo;

    @Override
    public void processReact(Long id) {
        Comment comment = commentRepo.findById(id).orElse(null);
        if (comment != null) {
            comment.setReactCount(comment.getReactCount() + 1);
            commentRepo.save(comment);
        }
    }
}
