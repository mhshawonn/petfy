package com.pet.Pet.Service;

import com.pet.Pet.Component.CommentFactory;
import com.pet.Pet.Component.MediaLinkFactory;
import com.pet.Pet.DTO.CommentDTO;
import com.pet.Pet.DTO.ReactDTO;
import com.pet.Pet.Model.Blog;
import com.pet.Pet.Model.Comment;
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
import java.util.List;

@Service
public class CommentService {
    @Autowired
    private UserService userService;
    @Autowired
    private CommentRepo commentRepo;
    @Autowired
    private EntityManager entityManager;
    @Autowired
    private ReactService reactService;
    @Autowired
    private BlogRepo blogRepo;
    @Autowired
    private CommentFactory commentFactory;
    @Autowired
    private MediaLinkFactory mediaLinkFactory;

    public String addComment(Long blogId, Long parentId, Long user_to, String content, List<MultipartFile> files) throws IOException {
        Users userFrom = userService.getUser();
        Blog blog = blogRepo.findById(blogId).orElse(null);

        if (blog == null) return "Blog not found";
        if (userFrom == null) return "Log in to comment";

        List<String> mediaUrls = mediaLinkFactory.uploadFirebase(files);

        Comment parentComment = null;
        if (parentId != null) {
            parentComment = processParrentComment(parentId);
        }

        Users userTo = null;
        if (user_to != null) {
            userTo = entityManager.getReference(Users.class, user_to);
        }

        // Use the factory to create a new Comment object
        Comment comment = commentFactory.createComment(blog, userFrom, userTo, parentComment, content, mediaUrls);

        commentRepo.save(comment);
        blog.setNumberOfComments(blog.getNumberOfComments() + 1);
        blogRepo.save(blog);

        return "Comment added successfully";
    }

    private Comment processParrentComment(Long id){
        Comment parentComment = commentRepo.findById(id).orElse(null);
        if (parentComment != null) {
            parentComment.setNumberOfChildComments(parentComment.getNumberOfChildComments() + 1);
            commentRepo.save(parentComment);
        }
        return parentComment;
    }

    private Page<CommentDTO> processComment(Page<CommentDTO> comments, Long userId) {
        if (userId != null) {
            for (CommentDTO comment : comments) {
                comment.setReactType(reactService.findReactTypeByPostIdAndPostTypeAndUserIdAndIsSavedFalse(comment.getId(), 2, userId));
            }
        }
        return comments;
    }

    private Page<CommentDTO> fetchAndProcessComments(Pageable pageable, Long blogId, Long parentId) {
        Page<CommentDTO> comments;

        if (parentId == null) {
            comments = commentRepo.findComment(pageable, blogId);
        } else {
            comments = commentRepo.findReply(pageable, blogId, parentId);
        }

        Long userId = userService.getUserPrincipal() != null ? userService.getUserPrincipal().getId() : null;
        return processComment(comments, userId);
    }


    public Page<CommentDTO> getComment(int page, Long blogId) {
        Pageable pageable = PageRequest.of(page, 10, Sort.by(Sort.Order.desc("id")));
        return fetchAndProcessComments(pageable, blogId, null);
    }


    public Page<CommentDTO> getReply(int page, Long blogId, Long parentId) {
        Pageable pageable = PageRequest.of(page, 10, Sort.by(Sort.Order.desc("id")));
        return fetchAndProcessComments(pageable, blogId, parentId);
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
