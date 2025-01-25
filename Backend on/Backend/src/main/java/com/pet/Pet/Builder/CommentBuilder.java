package com.pet.Pet.Builder;

import com.pet.Pet.Model.Blog;
import com.pet.Pet.Model.Comment;
import com.pet.Pet.Model.Users;

import java.util.List;

public class CommentBuilder {
    private final Comment comment;

    public CommentBuilder() {
        comment = new Comment();
    }

    public CommentBuilder setBlog(Blog blog) {
        comment.setBlog(blog);
        return this;
    }

    public CommentBuilder setMedia(List<String> media) {
        comment.setMedia(media);
        return this;
    }

    public CommentBuilder setUserFrom(Users userFrom) {
        comment.setUserFrom(userFrom);
        return this;
    }

    public CommentBuilder setUserTo(Users userTo) {
        comment.setUserTo(userTo);
        return this;
    }

    public CommentBuilder setParent(Comment parent) {
        comment.setParent(parent);
        return this;
    }

    public CommentBuilder setContent(String content) {
        comment.setContent(content);
        return this;
    }

    public CommentBuilder setCommentDate(long commentDate) {
        comment.setCommentDate(commentDate);
        return this;
    }

    public CommentBuilder setReactCount(Long reactCount) {
        comment.setReactCount(reactCount);
        return this;
    }

    public CommentBuilder setNumberOfChildComments(int count) {
        comment.setNumberOfChildComments(count);
        return this;
    }

    public Comment build() {
        return comment;
    }
}

