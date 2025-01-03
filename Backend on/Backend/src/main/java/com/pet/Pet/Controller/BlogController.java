package com.pet.Pet.Controller;

import com.pet.Pet.DTO.FeedDTO;
import com.pet.Pet.Model.Blog;
import com.pet.Pet.Service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
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

    @GetMapping("/get/{page}")
    public Page<Blog> getPets(@PathVariable int page){
        return blogService.getBlogs(page);
    }

    @GetMapping("/giveReact")
    public String giveReact(@RequestParam Long id,@RequestParam int type){
        return blogService.addReact(id,1,type,false);
    }

}

