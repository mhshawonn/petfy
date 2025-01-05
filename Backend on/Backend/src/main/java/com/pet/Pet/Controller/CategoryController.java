package com.pet.Pet.Controller;


import com.pet.Pet.Model.Animal;
import com.pet.Pet.Service.AnimalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/animal")
public class CategoryController {
    @Autowired
    private AnimalService animalService;
    @PostMapping("/addAnimal")
    public String addAnimal(@RequestBody String animalName){
        return animalService.addAnimal(animalName);
    }

    @PostMapping("/addCategory")
    public String addCategory(@RequestBody String categoryName,@RequestParam Long animalId){
        return animalService.addCategory(categoryName,animalId);
    }

    @GetMapping("/getAnimal")
    public List<Animal> getAnimal(){
        return animalService.getAnimals();
    }
}
