package com.pet.Pet.Component;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class SaveStrategyFactory {
    private final Map<Integer, SaveStrategy> strategies;

    @Autowired
    public SaveStrategyFactory(PetSaveStrategy petSaveStrategy,
                               BlogSaveStrategy blogSaveStrategy) {
        strategies = new HashMap<>();
        strategies.put(0, petSaveStrategy);
        strategies.put(1, blogSaveStrategy);
    }

    public SaveStrategy getStrategy(int postType) {
        SaveStrategy strategy = strategies.get(postType);
        if (strategy == null) {
            throw new IllegalArgumentException("Invalid post type: " + postType);
        }
        return strategy;
    }
}
