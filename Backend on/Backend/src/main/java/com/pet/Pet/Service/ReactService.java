package com.pet.Pet.Service;

import com.pet.Pet.DTO.ReactDTO;
import com.pet.Pet.Model.React;
import com.pet.Pet.Model.UserPrincipal;
import com.pet.Pet.Repo.ReactRepo;
import com.pet.Pet.Repo.UsersRepo;
import org.checkerframework.checker.units.qual.A;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReactService {
    @Autowired
    private ReactRepo reactRepo;
    @Autowired
    private UserService userService;
    @Autowired
    private UsersRepo usersRepo;

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
            return "Reacted successfully";
        }
        else{
            react.setReactType(type);
            react.setSaved(isSaved);
            react.setTimestamp(System.currentTimeMillis());
            reactRepo.save(react);
            if(isSaved) return "Saved";
            return "React updated successfully";
        }
    }

    public List<ReactDTO> getReactByPostIdAndPostType(Long id, int i) {
        return reactRepo.findByPostIdAndPostTypeAndIsSavedFalse(id, i);
    }
}
