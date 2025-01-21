package com.pet.Pet.Service;

import com.pet.Pet.DTO.ReactDTO;
import com.pet.Pet.Model.*;
import com.pet.Pet.Repo.BlogRepo;
import com.pet.Pet.Repo.TagRepo;
import org.apache.catalina.User;
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
    private FirebaseService firebaseService;
    @Autowired
    private TagRepo tagRepo;
    @Autowired
    private ReactService reactService;

    public String createBlog(Blog blog,
                             List<MultipartFile> files,
                             List<Long> tags)
            throws IOException {
        Users user = userService.getUser();
        if (user == null) {
            return "Only logged in users can create a blog";
        }

        List<String> urls = new ArrayList<String>();
        try {
            urls = firebaseService.uploadFiles(files);
        } catch (Exception e) {
          urls = null;
        }
        blog.setMedia(urls);
        blog.setPublicationDate(System.currentTimeMillis());
        blog.setLastUpdate(System.currentTimeMillis());
        if(Objects.equals(user.getRole(), "ADMIN")) blog.setFeatured(true);
        blog.setNumberOfReports(0L);
        blog.setNumberOfComments(0L);
        blog.setReactCount(0L);
        List<Tags> tagsList = new ArrayList<>();
        for(Long tagId: tags){
            Tags tag = tagRepo.findById(tagId).orElse(null);
            if(tag == null) continue;
            tagsList.add(tag);
        }
        blog.setTags(tagsList);
        Blog savedBlog = blogRepo.save(blog);

        System.out.println(savedBlog);

        return "Blog created successfully";
    }

    public Page<Blog> getBlogs(int page) {
        UserPrincipal userDetails = userService.getUserPrincipal();
        Long userId = userDetails != null ? userDetails.getId() : null;
        String sortAttribute = "id";
        Sort sort = Sort.by(Sort.Order.desc(sortAttribute));

        Pageable pageable = PageRequest.of(page, 10, sort);

        return processBlog(blogRepo.findAll(pageable), userId);
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
