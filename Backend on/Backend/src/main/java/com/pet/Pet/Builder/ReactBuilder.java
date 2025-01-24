package com.pet.Pet.Builder;

import com.pet.Pet.Model.React;
import com.pet.Pet.Model.Users;
import org.springframework.stereotype.Component;

@Component
public class ReactBuilder {
    private final React react;

    public ReactBuilder() {
        react = new React();
    }

    public ReactBuilder withPostId(Long id) {
        react.setPostId(id);
        return this;
    }

    public ReactBuilder withPostType(int postType) {
        react.setPostType(postType);
        return this;
    }

    public ReactBuilder withReactType(int type) {
        react.setReactType(type);
        return this;
    }

    public ReactBuilder withUser(Users user) {
        react.setUser(user);
        return this;
    }

    public ReactBuilder withReactTime(Long reactTime){
        react.setTimestamp(reactTime);
        return this;
    }

    public ReactBuilder withSaved(Boolean saved) {
        react.setSaved(saved);
        return this;
    }

    public React build() {
        react.setTimestamp(System.currentTimeMillis());
        return react;
    }
}
