package com.pet.Pet.Controller;

import com.pet.Pet.DTO.PetDTO;
import com.pet.Pet.DTO.ReactDTO;
import com.pet.Pet.Model.AdoptionRequest;
import com.pet.Pet.Model.Pet;
import com.pet.Pet.Model.React;
import com.pet.Pet.Service.PetService;
import com.pet.Pet.Service.ReactService;
import jakarta.mail.Multipart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/pet")
public class PetController {
    @Autowired
    private PetService petService;
    @Autowired
    private ReactService reactService;
    @PostMapping("/add")
    public String add(@RequestPart Pet pet,
                      @RequestPart List<MultipartFile> multipartFiles,
                      @RequestParam Long animal_id,
                      @RequestParam List<Long> category_ids,
                      @RequestParam Long address_id) throws IOException {
        return petService.addPet(pet,multipartFiles,animal_id,category_ids,address_id);
    }
    @GetMapping("/get/{page}")
    public Page<PetDTO> getPets(@PathVariable int page, @RequestParam String sort, @RequestParam int order){
        return petService.getAllPets(page,sort,order);
    }
    @GetMapping("/giveReact/{id}")
    public String giveReact(@PathVariable Long id,@RequestParam int type){
        return reactService.addReact(id,0,type,false);
    }

    @GetMapping("/getReact/{id}")
    public List<ReactDTO> getReact(@PathVariable Long id){
        return reactService.getReactByPostIdAndPostType(id,0);
    }
    @GetMapping("/getPet/{id}")
    public Pet getPet(@PathVariable Long id){
        return petService.getPet(id);
    }
    @PostMapping("/request/{id}")
    public String request(@PathVariable Long id, @RequestParam AdoptionRequest adoptionRequest,
                          @RequestPart List<MultipartFile> files) throws IOException {
        return petService.requestPet(id,adoptionRequest,files);
    }
    @PostMapping("/updateStatus/{id}")
    public String updateStatus(@PathVariable Long id){
        return petService.updateStatus(id);
    }

    @GetMapping("/getAdoptionRequest/{id}")
    public List<AdoptionRequest> getAdoptionRequest(@PathVariable Long id){
        return petService.getAdoptionRequest(id);
    }
}
