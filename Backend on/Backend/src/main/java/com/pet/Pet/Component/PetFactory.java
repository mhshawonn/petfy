package com.pet.Pet.Component;

import com.pet.Pet.Model.*;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class PetFactory {
    public Pet createPet(
            Pet pet,
            Users owner,
            Address address,
            List<String> media,
            Animal animal,
            List<Category> categories
    ) {
        pet.setOwner(owner);
        pet.setAddress(address);
        pet.setMedia(media);
        pet.setAnimal(animal);
        pet.setCategories(categories);
        pet.setTimeStamp(System.currentTimeMillis());
        pet.setReportCount(Optional.ofNullable(pet.getReportCount()).orElse(0L));
        pet.setNumberOfRequests(Optional.ofNullable(pet.getNumberOfRequests()).orElse(0L));
        pet.setStatus(Optional.ofNullable(pet.getStatus()).orElse("Available"));
        return pet;
    }
}

