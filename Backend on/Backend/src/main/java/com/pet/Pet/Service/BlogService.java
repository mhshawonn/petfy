package com.pet.Pet.Service;

import com.google.firebase.auth.UserProvider;
import com.pet.Pet.Model.Blog;
import com.pet.Pet.Model.Tags;
import com.pet.Pet.Model.UserPrincipal;
import com.pet.Pet.Model.Users;
import com.pet.Pet.Repo.BlogRepo;
import com.pet.Pet.Repo.TagRepo;
import org.springframework.beans.factory.annotation.Autowired;
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
    private ReactService reactService;
    @Autowired
    private FirebaseService firebaseService;
    @Autowired
    private TagRepo tagRepo;

    public String createBlog(Blog blog, List<MultipartFile> files, List<Integer> tags) throws IOException {
        Users user = userService.getUser();
        if (user == null) {
            return "Only logged in users can create a blog";
        }
        blog.setAuthor(user);
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
        blog.setNumberOfReact(0L);
        List<Tags> tagsList = new ArrayList<>();
        for(Integer tagId: tags){
            Tags tag = tagRepo.findById(tagId).orElse(null);
            if(tag == null) continue;
            tagsList.add(tag);
        }
        blog.setTags(tagsList);
        blogRepo.save(blog);
        return "Blog created successfully";
    }
}
