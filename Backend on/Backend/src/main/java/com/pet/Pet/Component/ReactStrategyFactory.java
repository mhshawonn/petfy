package com.pet.Pet.Component;

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
}
