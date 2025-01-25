package com.pet.Pet.Component;

import com.pet.Pet.Model.Blog;
import com.pet.Pet.Model.Tags;
import com.pet.Pet.Model.Users;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class BlogFactory {
    public Blog configureBlog(Blog blog, List<String> media, boolean isFeatured, List<Tags> tags, Users author) {
        blog.setMedia(media);
        blog.setPublicationDate(System.currentTimeMillis());
        blog.setLastUpdate(System.currentTimeMillis());
        blog.setFeatured(isFeatured);
        blog.setNumberOfComments(0L);
        blog.setNumberOfReports(0L);
        blog.setReactCount(0L);
        blog.setTags(tags);
        blog.setAuthor(author);
        return blog;
    }
}
