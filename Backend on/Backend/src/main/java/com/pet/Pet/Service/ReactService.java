package com.pet.Pet.Service;

import com.pet.Pet.Builder.ReactBuilder;
import com.pet.Pet.Component.ReactStrategy;
import com.pet.Pet.Component.ReactStrategyFactory;
import com.pet.Pet.DTO.ReactDTO;
import com.pet.Pet.Model.*;
import com.pet.Pet.Repo.*;
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
    @Autowired
    private ReactBuilder reactBuilder;
    @Autowired
    private ReactStrategyFactory reactStrategyFactory;

    public String addReact(Long postid, int postType, int reactType, Boolean isSaved) {
        Users user = userService.getUser();
        React existingReact = reactRepo.findReact(postid, postType, user.getId(), isSaved);

        if (existingReact == null) {
            React newReact = reactStrategyFactory.createReact(postid,postType,reactType,isSaved,user);

            reactRepo.save(newReact);

            ReactStrategy strategy = reactStrategyFactory.getStrategy(postType);
            strategy.processReact(postid);

            return "Reacted successfully";
        } else {
            existingReact.setReactType(reactType);
            existingReact.setTimestamp(System.currentTimeMillis());
            reactRepo.save(existingReact);
            return "React updated successfully";
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
