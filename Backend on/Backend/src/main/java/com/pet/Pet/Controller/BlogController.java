package com.pet.Pet.Controller;

import com.pet.Pet.Model.Blog;
import com.pet.Pet.Service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/blog")
public class BlogController {
    @Autowired
    private BlogService blogService;
    @PostMapping("/create")
    public String createBlog(@RequestPart Blog blog, @RequestPart List<MultipartFile> files,
                             @RequestParam List<Integer> tag) throws IOException {
        return blogService.createBlog(blog,files,tag);
    }
}

