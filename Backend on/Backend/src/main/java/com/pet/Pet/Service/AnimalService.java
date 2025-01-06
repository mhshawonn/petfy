package com.pet.Pet.Service;

import com.pet.Pet.Model.Animal;
import com.pet.Pet.Model.Category;
import com.pet.Pet.Repo.AnimalRepo;
import com.pet.Pet.Repo.CategoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnimalService {
    @Autowired
    private AnimalRepo animalRepo;
    @Autowired
    private CategoryRepo categoryRepo;

    public String addAnimal(String animalName) {
        Animal animal = new Animal();
        animal.setName(animalName);
        animalRepo.save(animal);
        return "New Animal Add";
    }

    public String addCategory(String categoryName, Long animalId) {
        Category category = new Category();
        Animal animal = animalRepo.findById(animalId).orElse(null);
        if(animal==null) return "Select a animal";
        category.setAnimal(animal);
        category.setName(categoryName);
        return "Category listed";
    }

    public List<Animal> getAnimals() {
        return animalRepo.findAll();
    }

    public List<Category> getCategory(Long animaId) {
        return categoryRepo.findByAnimalId(animaId);
    }
}
