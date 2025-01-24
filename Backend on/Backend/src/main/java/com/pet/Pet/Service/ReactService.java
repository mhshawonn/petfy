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

    public String addReact(Long id, int postType, int type, Boolean isSaved) {
        UserPrincipal userPrincipal = userService.getUserPrincipal();
        React existingReact = reactRepo.findReact(id, postType, userPrincipal.getId(), isSaved);

        if (existingReact == null) {
            React newReact = reactBuilder
                    .withPostId(id)
                    .withPostType(postType)
                    .withUser(usersRepo.findById(userPrincipal.getId()).orElse(null))
                    .withReactType(type)
                    .withReactTime(System.currentTimeMillis())
                    .withSaved(isSaved)
                    .build();

            reactRepo.save(newReact);

            ReactStrategy strategy = reactStrategyFactory.getStrategy(postType);
            strategy.processReact(id);

            return "Reacted successfully";
        } else {
            existingReact.setReactType(type);
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
