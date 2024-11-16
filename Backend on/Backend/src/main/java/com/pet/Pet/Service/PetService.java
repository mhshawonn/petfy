package com.pet.Pet.Service;

import com.pet.Pet.DTO.PetDTO;
import com.pet.Pet.Model.*;
import com.pet.Pet.Repo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Objects;

@Service
public class PetService {
    @Autowired
    private FirebaseService firebaseService;
    @Autowired
    private AnimalRepo animalRepo;
    @Autowired
    private CategoryRepo categoryRepo;
    @Autowired
    private PetRepo petRepo;
    @Autowired
    private UsersRepo usersRepo;
    @Autowired
    private AddressRepo addressRepo;
    @Autowired
    private UserService userService;
    @Autowired
    private ReactRepo reactRepo;
    @Autowired
    private AdoptionRepo adoptRepo;

    public String addPet(Pet pet, List<MultipartFile> multipartFiles, Long animalId, List<Long> categoryIds, Long addressId) throws IOException {
        UserPrincipal userDetails = userService.getUserPrincipal();
        if(userDetails == null) return "User not Authenticated";
        Users user = usersRepo.findByUsername(userDetails.getUsername());
        pet.setOwner(user);
        pet.setAddress((addressId != null ? addressRepo.findById(addressId).orElse(null) : user.getAddress()));

        for (Long categoryId : categoryIds) {
            Category category = (Category) categoryRepo.findById(categoryId).orElse(null);
            if (category == null) continue;
            pet.getCategories().add(category);
        }
        List<String> urls = firebaseService.uploadFiles(multipartFiles);
        Animal animal = animalRepo.findById(animalId).orElseThrow(() -> new RuntimeException("Animal not found"));
        pet.setAnimal(animal);
        pet.setMedia(urls);
        pet.setTimeStamp(System.currentTimeMillis());
        pet.setReportCount(0L);
        pet.setStatus("Available");
        petRepo.save(pet);
        return "Pet added successfully";
    }

    public Page<PetDTO> getAllPets(int page, String sortAttribute, int order) {
        UserPrincipal userDetails = userService.getUserPrincipal();
        Long userId = userDetails != null ? userDetails.getId() : null;
        if (sortAttribute == null) {
            sortAttribute = "id";
        }
        Sort sort = (order == 0) ? Sort.by(Sort.Order.desc(sortAttribute)) : Sort.by(Sort.Order.asc(sortAttribute));
        Pageable pageable = PageRequest.of(page, 1, sort);
        return processPets(petRepo.findAllPet(pageable), userId);
    }

    private Page<PetDTO> processPets(Page<PetDTO> allPet, Long userId) {
        if(userId!=null){
            for (PetDTO petDTO : allPet) {
                petDTO.setReactType(reactRepo.findReactTypeByPostIdAndPostTypeAndUserIdAndIsSavedFalse(petDTO.getId(), 0,userId));
                petDTO.setNumberOfReact(reactRepo.countByPostIdAndPostTypeAndIsSavedFalse(petDTO.getId(), 0));
                petDTO.setNumberOfRequests(adoptRepo.countByPetId(petDTO.getId()));
            }
        }else{
            for (PetDTO petDTO : allPet) {
                petDTO.setNumberOfReact(reactRepo.countByPostIdAndPostTypeAndIsSavedFalse(petDTO.getId(), 0));
                petDTO.setNumberOfRequests(adoptRepo.countByPetId(petDTO.getId()));
            }
        }
        return allPet;
    }

    public Pet getPet(Long id) {
        return petRepo.findById(id).orElse(null);
    }

    public String requestPet(Long id, AdoptionRequest adoptionRequest, List<MultipartFile> files) throws IOException {
        UserPrincipal userDetails = userService.getUserPrincipal();
        if(userDetails == null) return "User not Authenticated";
        Users user = usersRepo.findByUsername(userDetails.getUsername());
        Pet pet = petRepo.findById(id).orElseThrow(() -> new RuntimeException("Pet not found"));
        adoptionRequest.setPet(pet);
        adoptionRequest.setRequestUsers(user);
        List<String> urls = firebaseService.uploadFiles(files);
        adoptionRequest.setCertificates(urls);
        adoptRepo.save(adoptionRequest);
        return "Request sent successfully";
    }

    public String updateStatus(Long id) {
        UserPrincipal userPrincipal = userService.getUserPrincipal();
        if(userPrincipal == null) return "User not Authenticated";
        Long userId = adoptRepo.findPetOwnerIdByAdoptionRequestId(id);
        AdoptionRequest adoptRequest = adoptRepo.findById(id).orElseThrow(() -> new RuntimeException("Adoption Request not found"));
        if(!Objects.equals(userId, userPrincipal.getId())) return adoptRequest.getStatus();
        adoptRequest.setStatus("Approved");
        adoptRepo.save(adoptRequest);
        Pet pet = adoptRequest.getPet();
        pet.setStatus("Adopted");
        petRepo.save(pet);
        return "Status updated successfully";
    }

    public List<AdoptionRequest> getAdoptionRequest(Long id) {
        return adoptRepo.findAllByPetId(id);
    }
}
