package com.pet.Pet.Component;

import com.pet.Pet.Model.React;
import com.pet.Pet.Model.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ReactStrategyFactory {
    @Autowired
    private PetReactStrategy petReactStrategy;
    @Autowired
    private BlogReactStrategy blogReactStrategy;
    @Autowired
    private CommentReactStrategy commentReactStrategy;

    public ReactStrategy getStrategy(int postType) {
        return switch (postType) {
            case 0 -> petReactStrategy;
            case 1 -> blogReactStrategy;
            case 2 -> commentReactStrategy;
            default -> throw new IllegalArgumentException("Invalid post type: " + postType);
        };
    }

    public React createReact(Long postId, int postType, int reactType, Boolean isSaved, Users user){
        React react = new React();
        react.setPostId(postId);
        react.setPostType(postType);
        react.setReactType(reactType);
        react.setTimestamp(System.currentTimeMillis());
        react.setSaved(isSaved);
        react.setUser(user);
        return react;
    }
}
