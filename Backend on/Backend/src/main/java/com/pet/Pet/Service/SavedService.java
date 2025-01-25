package com.pet.Pet.Service;

import com.pet.Pet.Component.SaveStrategy;
import com.pet.Pet.Component.SaveStrategyFactory;
import com.pet.Pet.Builder.SavedBuilder;
import com.pet.Pet.Model.*;
import com.pet.Pet.Repo.SavedRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public class SavedService {
    @Autowired
    private UserService userService;
    @Autowired
    private SavedRepo savedRepo;
    @Autowired
    private SaveStrategyFactory saveStrategyFactory;
    @Autowired
    private SavedBuilder savedBuilder;

    public String save(Long id, int postType) {
        Users users = userService.getUser();

        if (savedRepo.findByUserIdAndPostIdAndPostType(users.getId(), id, postType).isPresent()) {
            return "Already saved";
        }

        Saved saved = new Saved();
        saved.setUser(users);
        saved.setPostType(postType);
        saved.setPostId(id);

        SaveStrategy strategy = saveStrategyFactory.getStrategy(postType);
        strategy.processSave(saved);
        savedRepo.save(saved);
        return "Saved successfully";
    }

    public Page<?> getSaved(int postType, int page, String sortAttribute, int order) {
        UserPrincipal userDetails = userService.getUserPrincipal();
        Long userId = userDetails != null ? userDetails.getId() : null;

        SaveStrategy strategy = saveStrategyFactory.getStrategy(postType);
        return strategy.getSaved(page, sortAttribute, order, userId);
    }
}
