package com.pet.Pet.Component;

import com.pet.Pet.Model.Pet;
import com.pet.Pet.Repo.PetRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PetReactStrategy implements ReactStrategy {
    @Autowired
    private PetRepo petRepo;

    @Override
    public void processReact(Long id) {
        Pet pet = petRepo.findById(id).orElse(null);
        if (pet != null) {
            pet.setReactCount(pet.getReactCount() + 1);
            petRepo.save(pet);
        }
    }
}
