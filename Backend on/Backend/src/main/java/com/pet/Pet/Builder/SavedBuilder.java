package com.pet.Pet.Builder;

import com.pet.Pet.Model.Saved;
import com.pet.Pet.Model.Users;
import org.springframework.stereotype.Component;

@Component
public class SavedBuilder {
    private final Saved saved;

    public SavedBuilder() {
        saved = new Saved();
    }

    public SavedBuilder withPostType(int postType) {
        saved.setPostType(postType);
        return this;
    }

    public SavedBuilder withPostId(Long postId) {
        saved.setPostId(postId);
        return this;
    }

    public SavedBuilder withUser(Users user) {
        saved.setUser(user);
        return this;
    }

    public Saved build() {
        return saved;
    }
}
