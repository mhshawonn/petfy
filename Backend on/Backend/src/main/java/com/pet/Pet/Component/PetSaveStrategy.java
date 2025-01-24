package com.pet.Pet.Component;

import com.pet.Pet.DTO.FeedDTO;
import com.pet.Pet.Model.Pet;
import com.pet.Pet.Model.Saved;
import com.pet.Pet.Repo.PetRepo;
import com.pet.Pet.Repo.SavedRepo;
import com.pet.Pet.Service.PetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

@Component
public class PetSaveStrategy implements SaveStrategy {
    private final PetRepo petRepo;
    private final PetService petService;
    private final SavedRepo savedRepo;
    private final SortingStrategy sortingStrategy;

    @Autowired
    public PetSaveStrategy(PetRepo petRepo, PetService petService,
                           SavedRepo savedRepo, SortingStrategy sortingStrategy) {
        this.petRepo = petRepo;
        this.petService = petService;
        this.savedRepo = savedRepo;
        this.sortingStrategy = sortingStrategy;
    }

    @Override
    public void processSave(Saved saved) {
        Pet pet = petRepo.findPetById(saved.getPostId());
        saved.setPet(pet);
    }

    @Override
    public Page<FeedDTO> getSaved(int page, String sortAttribute, int order, Long userId) {
        Sort sort = sortingStrategy.getSort(sortAttribute, order);
        Pageable pageable = PageRequest.of(page, 10, sort);
        return petService.processPets(savedRepo.findSavedPet(pageable, userId), userId);
    }
}
