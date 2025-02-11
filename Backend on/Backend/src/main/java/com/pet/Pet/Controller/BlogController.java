package com.pet.Pet.Controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pet.Pet.DTO.CommentDTO;
import com.pet.Pet.DTO.ReactDTO;
import com.pet.Pet.DTO.Result;
import com.pet.Pet.Model.Blog;
import com.pet.Pet.Service.BlogService;
import com.pet.Pet.Service.CommentService;
import com.pet.Pet.Service.SavedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RestController
@RequestMapping("/blog")
public class BlogController {
    @Autowired
    private BlogService blogService;
    @Autowired
    private CommentService commentService;
    @Autowired
    private SavedService savedService;


    @PostMapping("/create")
    public String createBlog(@RequestPart("blog") String blogJson, @RequestPart("files") List<MultipartFile> files,
                                   @RequestParam(required = false) List<Long> tag) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        Blog blog = mapper.readValue(blogJson, Blog.class);
        return blogService.createBlog(blog,files,tag);
    }

    @GetMapping("/get/{page}")
    public Page<Blog> getPets(@PathVariable int page) {
        return blogService.getBlogs(page);
    }

    @GetMapping("/giveReact")
    public String giveReact(@RequestParam Long id,@RequestParam int type){
        return blogService.addReact(id,1,type,false);
    }

    @GetMapping("/showReact")
    public List<ReactDTO> showReact(@RequestParam Long id){
        int postType = 1;
        return blogService.getReact(id,postType);
    }

    @GetMapping("/showReactByReact")
    public List<ReactDTO> showReactByType(@RequestParam Long id,@RequestParam int reactType){
        int postType = 1;
        return blogService.getReactType(id,postType,reactType);
    }

    @PostMapping("/addComment")
    public String addComment(@RequestParam Long blog_id,@RequestParam(required = false) Long parent_id,
                             @RequestParam(required = false) Long user_to,
                             @RequestPart String content,@RequestPart(required = false) List<MultipartFile> files) throws IOException {
        return commentService.addComment(blog_id,parent_id,user_to,content,files);
    }

    @GetMapping("/getComment/{page}")
    public Page<CommentDTO> getComment(@PathVariable int page,@RequestParam Long blog_id){
        return commentService.getComment(page,blog_id);
    }

    @GetMapping("/getReply/{page}")
    public Page<CommentDTO> getReply(@PathVariable int page,@RequestParam Long blog_id,@RequestParam Long parent_id){
        return commentService.getReply(page,blog_id,parent_id);
    }

    @GetMapping("/reactComment")
    public String reactComment(@RequestParam Long id,@RequestParam int type){
        return commentService.addReact(id,type);
    }

    @GetMapping("/getReactComment")
    public List<ReactDTO> getReactComment(@RequestParam Long id){
        return commentService.getReact(id);
    }

    @GetMapping("/getReactByTypeComment")
    public List<ReactDTO> getReactByTypeComment(@RequestParam Long id,@RequestParam int type){
        return commentService.getReactByType(id,type);
    }

    @GetMapping("/save/{id}")
    public String SaveBlog(@PathVariable Long id){
        return savedService.save(id,1);
    }

    @GetMapping("/saved/{page}")
    public Page<?> getSavedBlog(@PathVariable int page,@RequestParam(required = false) int order){
        return savedService.getSaved(0,page,"id",order);
    }
}

