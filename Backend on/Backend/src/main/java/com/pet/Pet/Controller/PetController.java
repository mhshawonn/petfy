package com.pet.Pet.Controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pet.Pet.DTO.AdoptionDTO;
import com.pet.Pet.DTO.FeedDTO;
import com.pet.Pet.DTO.ReactDTO;
import com.pet.Pet.DTO.Result;
import com.pet.Pet.Model.AdoptionRequest;
import com.pet.Pet.Model.Pet;
import com.pet.Pet.Service.PetService;
import com.pet.Pet.Service.SavedService;
import io.swagger.v3.oas.models.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/pet")
public class PetController {
    @Autowired
    private PetService petService;
    @Autowired
    private SavedService savedService;


@PostMapping(value = "/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
public Result<Pet> addPet(
        @RequestPart(value = "pet") String petJson,
        @RequestPart(value = "multipartFiles") List<MultipartFile> files,
        @RequestParam Long animal_id,
        @RequestParam(required = false) List<Long> category_ids,
        @RequestParam(required = false) Long address_id) {
    try {
        ObjectMapper mapper = new ObjectMapper();
        Pet pet = mapper.readValue(petJson, Pet.class);
        System.out.println(files);
        String result = petService.addPet(pet, files, animal_id, category_ids, address_id);
        return new Result<>(true,"Pet added successfully",null);
    } catch (IOException e) {
        return new Result<>(false,"Some thing error happen",null);
    }
}

    @GetMapping("/get/{page}")
    public Page<FeedDTO> getPets(@PathVariable int page, @RequestParam(required = false) String sort,
                                 @RequestParam(defaultValue = "0", required = false) int order){
        Page<FeedDTO> feedDTOS =  petService.getAllPets(page,sort,order);

        System.out.println(feedDTOS);

        return feedDTOS;
    }

    @GetMapping("/giveReact")
    public String giveReact(@RequestParam Long id,@RequestParam int type){
        return petService.addReact(id,0,type,false);
    }

    @GetMapping("/getReact/{id}")
    public List<ReactDTO> getReact(@PathVariable Long id){
        return petService.getReactByPostIdAndPostType(id,0);
    }

    @GetMapping("/getPet/{id}")
    public Pet getPet(@PathVariable Long id){
        return petService.getPet(id);
    }

    @PostMapping("/request/{id}")
    public String request(@PathVariable Long id, @RequestPart AdoptionRequest adoptionRequest,
                          @RequestPart List<MultipartFile> files) throws IOException {
        return petService.requestPet(id,adoptionRequest,files);
    }

    @PostMapping("/updateStatus/{id}")
    public String updateStatus(@PathVariable Long id){
        return petService.updateStatus(id);
    }

    @GetMapping("/getAdoptionRequest/{id}/{page}")
    public Page<AdoptionRequest> getAdoptionRequest(@PathVariable Long id,@PathVariable int page,
                                                    @RequestParam(defaultValue = "0") int order
    ){
        return petService.getAdoptionRequest(id,page,order);
    }

    @GetMapping("/save/{id}")
    public String SavePet(@PathVariable Long id){
        return savedService.save(id,0);
    }

    @GetMapping("/saved/{page}")
    public Page<?> savedPets(@PathVariable int page, @RequestParam(defaultValue = "0") int order){
        return savedService.getSaved(0,page,"id",order);
    }

    @GetMapping("/myRequest/{page}")
    public Page<AdoptionRequest> getMyRequest(@PathVariable int page, @RequestParam(defaultValue = "0") int order
    ){
        return petService.getMyRequest(page,order);
    }

    @GetMapping("/myRequestByPet/{id}")
    public List<AdoptionRequest> getMyRequestByPet(@PathVariable Long id){
        return petService.getMyRequestByPet(id);
    }
}
