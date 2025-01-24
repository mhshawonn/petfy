package com.pet.Pet.Component;

import com.pet.Pet.Model.Blog;
import com.pet.Pet.Repo.BlogRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class BlogReactStrategy implements ReactStrategy {
    @Autowired
    private BlogRepo blogRepo;

    @Override
    public void processReact(Long id) {
        Blog blog = blogRepo.findById(id).orElse(null);
        if (blog != null) {
            blog.setReactCount(blog.getReactCount() + 1);
            blogRepo.save(blog);
        }
    }
}
