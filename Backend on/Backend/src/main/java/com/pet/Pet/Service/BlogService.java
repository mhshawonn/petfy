package com.pet.Pet.Service;

import com.pet.Pet.DTO.FeedDTO;
import com.pet.Pet.DTO.ReactDTO;
import com.pet.Pet.Model.Blog;
import com.pet.Pet.Model.Tags;
import com.pet.Pet.Model.UserPrincipal;
import com.pet.Pet.Model.Users;
import com.pet.Pet.Repo.BlogRepo;
import com.pet.Pet.Repo.ReactRepo;
import com.pet.Pet.Repo.TagRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
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
                             List<Integer> tags,
                             Long userId)
            throws IOException {
        System.out.println("in blog service");
        Users user = userService.getProfile(userId);
        System.out.println(user);

        if (user == null) {
            return "Only logged in users can create a blog";
        }
        System.out.println("author : ");
        blog.setAuthor(blog.getAuthor());

        System.out.println(blog);

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
        for(Integer tagId: tags){
            Tags tag = tagRepo.findById(tagId).orElse(null);
            if(tag == null) continue;
            tagsList.add(tag);
        }
        blog.setTags(tagsList);
        Blog savedBlog = blogRepo.save(blog);

        System.out.println(savedBlog);

        return "Blog created successfully";
    }

    public Page<Blog> getBlogs(int page, Long userId) {
        Users user = userService.getProfile(userId);
        if (user == null) {
            return null;
        }
        String sortAttribute = "id";
        Sort sort = Sort.by(Sort.Order.desc(sortAttribute));

        Pageable pageable = PageRequest.of(page, 10, sort);

        Page<Blog> blogPages = processBlog(blogRepo.findAll(pageable), userId);

        System.out.println(blogPages);

        return blogPages;
    }

    private Page<Blog> processBlog(Page<Blog> blogs, Long userId) {
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
