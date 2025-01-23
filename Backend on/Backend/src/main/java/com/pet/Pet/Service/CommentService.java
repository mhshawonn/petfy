package com.pet.Pet.Service;

import com.pet.Pet.DTO.CommentDTO;
import com.pet.Pet.DTO.ReactDTO;
import com.pet.Pet.Model.Blog;
import com.pet.Pet.Model.Comment;
import com.pet.Pet.Model.UserPrincipal;
import com.pet.Pet.Model.Users;
import com.pet.Pet.Repo.BlogRepo;
import com.pet.Pet.Repo.CommentRepo;
import jakarta.persistence.EntityManager;
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

@Service
public class CommentService {
    @Autowired
    private UserService userService;
    @Autowired
    private FirebaseService firebaseService;
    @Autowired
    private CommentRepo commentRepo;
    @Autowired
    private EntityManager entityManager;
    @Autowired
    private ReactService reactService;
    @Autowired
    private BlogRepo blogRepo;

    public String addComment(Long blogId, Long parentId, Long user_to, String content, List<MultipartFile> files) throws IOException {
        Users userFrom = userService.getUser();
        Blog blog = blogRepo.findById(blogId).orElse(null);
        if(blog==null) return "Blog not found";
        if (userFrom == null) {
            return "Log in to comment";
        }

        Comment comment = new Comment();
        List<String> urls = new ArrayList<>();

        try {
            urls = firebaseService.uploadFiles(files);
        } catch (Exception e) {
            urls = null; // Handle file upload failure
        }
        comment.setBlog(blog);
        comment.setMedia(urls);
        comment.setNumberOfChildComments(0);
        comment.setCommentDate(System.currentTimeMillis());
        comment.setReactCount(0L);
        comment.setContent(content);
        comment.setUserFrom(userFrom);

        if(user_to!=null){
            Users userTo = entityManager.getReference(Users.class, user_to);
            comment.setUserTo(userTo);
        }

        if (parentId != null) {
            Comment parentComment = commentRepo.findById(parentId).orElse(null);
            comment.setParent(parentComment);
            assert parentComment != null;
            parentComment.setNumberOfChildComments(parentComment.getNumberOfChildComments()+1);
            commentRepo.save(parentComment);
        }
        commentRepo.save(comment);
        blog.setNumberOfComments(blog.getNumberOfComments()+1);
        blogRepo.save(blog);
        return "Comment added successfully";
    }


    public Page<CommentDTO> getComment(int page, Long blogId) {
        UserPrincipal userDetails = userService.getUserPrincipal();
        Long userId = userDetails != null ? userDetails.getId() : null;
        String sortAttribute = "id";
        Sort sort = Sort.by(Sort.Order.desc(sortAttribute));

        Pageable pageable = PageRequest.of(page, 10, sort);

        return processComment(commentRepo.findComment(pageable,blogId), userId);
    }

    private Page<CommentDTO> processComment(Page<CommentDTO> comments, Long userId) {
        if (userId != null) {
            for (CommentDTO comment : comments) {
                comment.setReactType(reactService.findReactTypeByPostIdAndPostTypeAndUserIdAndIsSavedFalse(comment.getId(), 2, userId));
            }
        }
        return comments;
    }

    public Page<CommentDTO> getReply(int page, Long blogId, Long parentId) {
        UserPrincipal userDetails = userService.getUserPrincipal();
        Long userId = userDetails != null ? userDetails.getId() : null;
        String sortAttribute = "id";
        Sort sort = Sort.by(Sort.Order.desc(sortAttribute));

        Pageable pageable = PageRequest.of(page, 10, sort);

        return processComment(commentRepo.findReply(pageable,blogId,parentId), userId);
    }

    public String addReact(Long id, int type) {
        return reactService.addReact(id,2,type,false);
    }

    public List<ReactDTO> getReact(Long id) {
        return reactService.getReactByPostIdAndPostType(id,2);
    }

    public List<ReactDTO> getReactByType(Long id,int type) {
        return reactService.getReactByPostIdAndPostTypeAndReactType(id,2,type);
    }
}
