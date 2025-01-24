package com.pet.Pet.Component;

import com.pet.Pet.Builder.CommentBuilder;
import com.pet.Pet.Model.Blog;
import com.pet.Pet.Model.Comment;
import com.pet.Pet.Model.Users;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CommentFactory {
    public Comment createComment(Blog blog, Users userFrom, Users userTo, Comment parentComment,
                                 String content, List<String> mediaUrls) {
        return new CommentBuilder()
                .setBlog(blog)
                .setUserFrom(userFrom)
                .setUserTo(userTo)
                .setParent(parentComment)
                .setContent(content)
                .setMedia(mediaUrls)
                .setCommentDate(System.currentTimeMillis())
                .setReactCount(0L)
                .setNumberOfChildComments(0)
                .build();
    }
}

