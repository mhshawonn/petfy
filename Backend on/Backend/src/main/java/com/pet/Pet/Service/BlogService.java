package com.pet.Pet.Service;

import com.pet.Pet.Component.BlogFactory;
import com.pet.Pet.Component.MediaLinkFactory;
import com.pet.Pet.DTO.ReactDTO;
import com.pet.Pet.DTO.Result;
import com.pet.Pet.Model.*;
import com.pet.Pet.Repo.BlogRepo;
import com.pet.Pet.Repo.TagRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class BlogService {
    @Autowired
    private UserService userService;
    @Autowired
    private BlogRepo blogRepo;
    @Autowired
    private TagRepo tagRepo;
    @Autowired
    private ReactService reactService;
    @Autowired
    private BlogFactory blogFactory;
    @Autowired
    private MediaLinkFactory mediaLinkFactory;

    public String createBlog(Blog blog, List<MultipartFile> files, List<Long> tags) throws IOException {
        Users user = userService.getUser();
        if (user == null) {
            return "Only logged in users can create a blog";
        }

        List<String> urls = mediaLinkFactory.uploadFirebase(files);

        List<Tags> tagsList = getTags(tags);

        blog = blogFactory.configureBlog(blog, urls, Objects.equals(user.getRole(), "ADMIN"), tagsList);

        Blog savedBlog = blogRepo.save(blog);
        return "Blog created successfully";
    }

    private List<Tags> getTags(List<Long> tags){
        List<Tags> tagsList = new ArrayList<>();
        for (Long tagId : tags) {
            tagRepo.findById(tagId).ifPresent(tagsList::add);
        }
        return tagsList;
    }

    public Page<Blog> getBlogs(int page) {
        UserPrincipal userDetails = userService.getUserPrincipal();
        Long userId = userDetails != null ? userDetails.getId() : null;

        Pageable pageable = PageRequest.of(page, 10, Sort.by(Sort.Order.desc("id")));
        return fetchAndProcessBlogs(pageable, userId);
    }

    private Page<Blog> fetchAndProcessBlogs(Pageable pageable, Long userId) {
        Page<Blog> blogs = blogRepo.findAll(pageable);
        return processBlog(blogs, userId);
    }

    public Page<Blog> processBlog(Page<Blog> blogs, Long userId) {
        if (userId != null) {
            for (Blog blog : blogs) {
                blog.setReactType(reactService.findReactTypeByPostIdAndPostTypeAndUserIdAndIsSavedFalse(blog.getId(), 1, userId));
            }
        }
        return blogs;
    }


    public String addReact(Long id, int postType, int type, boolean isSaved) {
        return reactService.addReact(id,postType,type,isSaved);
    }

    public List<ReactDTO> getReact(Long id, int postType) {
        return reactService.getReactByPostIdAndPostType(id,postType);
    }

    public List<ReactDTO> getReactType(Long id, int postType, int reactType) {
        return reactService.getReactByPostIdAndPostTypeAndReactType(id,postType,reactType);
    }
}
