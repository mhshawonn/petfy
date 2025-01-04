package com.pet.Pet.Controller;

import com.pet.Pet.DTO.CommentDTO;
import com.pet.Pet.DTO.FeedDTO;
import com.pet.Pet.DTO.ReactDTO;
import com.pet.Pet.Model.Blog;
import com.pet.Pet.Service.BlogService;
import com.pet.Pet.Service.CommentService;
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
    @Autowired
    private CommentService commentService;
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
}

