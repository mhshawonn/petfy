package com.pet.Pet.Component;

import com.pet.Pet.Model.Blog;
import com.pet.Pet.Model.Tags;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class BlogFactory {
    public Blog configureBlog(Blog blog, List<String> media, boolean isFeatured, List<Tags> tags) {
        blog.setMedia(media);
        blog.setPublicationDate(System.currentTimeMillis());
        blog.setLastUpdate(System.currentTimeMillis());
        blog.setFeatured(isFeatured);
        blog.setNumberOfComments(0L);
        blog.setNumberOfReports(0L);
        blog.setReactCount(0L);
        blog.setTags(tags);
        return blog;
    }
}
