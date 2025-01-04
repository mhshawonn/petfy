package com.pet.Pet.Service;

import com.pet.Pet.DTO.ReactDTO;
import com.pet.Pet.Model.*;
import com.pet.Pet.Repo.*;
import org.checkerframework.checker.units.qual.A;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReactService {
    @Autowired
    private ReactRepo reactRepo;
    @Autowired
    private UserService userService;
    @Autowired
    private UsersRepo usersRepo;
    @Autowired
    private PetRepo petRepo;
    @Autowired
    private BlogRepo blogRepo;
    @Autowired
    private CommentRepo commentRepo;

    public String addReact(Long id, int postType, int type,Boolean isSaved) {
        UserPrincipal userPrincipal = userService.getUserPrincipal();
        React react = reactRepo.findReact(id,postType,userPrincipal.getId(),isSaved);
        if (react == null) {
            react = new React();
            react.setPostId(id);
            react.setPostType(postType);
            react.setUser(usersRepo.findById(userPrincipal.getId()).orElse(null));
            react.setReactType(type);
            react.setTimestamp(System.currentTimeMillis());
            react.setSaved(isSaved);
            reactRepo.save(react);
            processReact(id,postType);
            return "Reacted successfully";
        }
        else{
            react.setReactType(type);
            react.setTimestamp(System.currentTimeMillis());
            reactRepo.save(react);
            return "React updated successfully";
        }
    }

    public void processReact(Long id,int postType){
        if(postType==0){
            Pet pet = petRepo.findById(id).orElse(null);
            assert pet != null;
            pet.setReactCount(pet.getReactCount()+1);
            petRepo.save(pet);
        }
        else if(postType==1){
            Blog blog = blogRepo.findById(id).orElse(null);
            assert blog != null;
            blog.setReactCount(blog.getReactCount()+1);
            blogRepo.save(blog);
        } else if (postType==2) {
            Comment comment = commentRepo.findById(id).orElse(null);
            assert comment!= null;
            comment.setReactCount(comment.getReactCount()+1);
            commentRepo.save(comment);
        }
    }

    public List<ReactDTO> getReactByPostIdAndPostType(Long id, int postType) {
        return reactRepo.findByPostIdAndPostTypeAndIsSavedFalse(id, postType);
    }

    public List<ReactDTO> getReactByPostIdAndPostTypeAndReactType(Long id, int postType,int reactType){
        return reactRepo.findByPostIdAndPostTypeAndReactTypeAndIsSavedFalse(id,postType,reactType);
    }

    public int findReactTypeByPostIdAndPostTypeAndUserIdAndIsSavedFalse(Long id, int postType, Long userId) {
        Integer result = reactRepo.findReactTypeByPostIdAndPostTypeAndUserIdAndIsSavedFalse(id, postType, userId);
        return result != null ? result : 0;

    }
}
