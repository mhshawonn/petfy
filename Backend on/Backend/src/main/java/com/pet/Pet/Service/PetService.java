package com.pet.Pet.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pet.Pet.Component.MediaLinkFactory;
import com.pet.Pet.Component.PetFactory;
import com.pet.Pet.Component.SortingStrategy;
import com.pet.Pet.DTO.FeedDTO;
import com.pet.Pet.DTO.ReactDTO;
import com.pet.Pet.Model.*;
import com.pet.Pet.Repo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.DataInput;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class PetService {
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
    private AdoptionRepo adoptRepo;
    @Autowired
    private ReactService reactService;
    @Autowired
    private PetFactory petFactory;
    @Autowired
    private MediaLinkFactory mediaLinkFactory;
    @Autowired
    private SortingStrategy sortingStrategy;

    public String addPet(Pet pet, List<MultipartFile> multipartFiles, Long animalId, List<Long> categoryIds, Long addressId) throws IOException {
        Users user = userService.getUser();
        Address address = (addressId != null) ? addressRepo.findById(addressId).orElse(null) : user.getAddress();

        List<Category> categories = getCategory(categoryIds);

        List<String> urls = mediaLinkFactory.uploadFirebase(multipartFiles);

        Animal animal = animalRepo.findById(animalId).orElseThrow(() -> new RuntimeException("Animal not found"));

        pet = petFactory.createPet(pet, user, address, urls, animal, categories);

        petRepo.save(pet);

        return "Pet added successfully";
    }

    private List<Category> getCategory(List<Long> categoryIds){
        List<Category> categories = new ArrayList<>();
        if (categoryIds != null) {
            for (Long categoryId : categoryIds) {
                categoryRepo.findById(categoryId).ifPresent(categories::add);
            }
        }
        return categories;
    }

    public Page<FeedDTO> getAllPets(int page, String sortAttribute, int order) {
        Sort sort = sortingStrategy.getSort(sortAttribute, order);
        Pageable pageable = PageRequest.of(page, 10, sort);
        UserPrincipal userDetails = userService.getUserPrincipal();
        Long userId = (userDetails != null) ? userDetails.getId() : null;

        return processPets(petRepo.findAllPet(pageable), userId);
    }

    public Page<FeedDTO> processPets(Page<FeedDTO> allPet, Long userId) {
        if(userId!=null){
            for (FeedDTO feedDTO : allPet) {
                feedDTO.setReactType(reactService.findReactTypeByPostIdAndPostTypeAndUserIdAndIsSavedFalse(feedDTO.getId(), 0,userId));
            }
        }
        return allPet;
    }

    public Pet getPet(Long id) {
        return petRepo.findById(id).orElse(null);
    }

    public String requestPet(Long id, AdoptionRequest adoptionRequest, List<MultipartFile> files) throws IOException {
        Users user = userService.getUser();
        if(user == null) return "User not Authenticated";

        Pet pet = petRepo.findById(id).orElseThrow(() -> new RuntimeException("Pet not found"));
        List<String> urls = mediaLinkFactory.uploadFirebase(files);
        adoptionRequest.setPet(pet);
        adoptionRequest.setRequestUsers(user);
        adoptionRequest.setCertificates(urls);
        pet.setNumberOfRequests(Optional.ofNullable(pet.getNumberOfRequests()).orElse(0L) + 1);

        adoptRepo.save(adoptionRequest);
        petRepo.save(pet);
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

    public Page<AdoptionRequest> getAdoptionRequest(Long petId, int page, int order) {
        Sort sort = sortingStrategy.getSort("id",1);
        Pageable pageable = PageRequest.of(page, 10, sort);
        return adoptRepo.findAllByPetId(pageable, petId);
    }

    public Page<AdoptionRequest> getMyRequest(int page, int order) {
        Users users = userService.getUser();
        if(users==null) return null;
        Sort sort = sortingStrategy.getSort("id",1);
        Pageable pageable = PageRequest.of(page, 10, sort);
        return adoptRepo.findMyRequests(pageable,users.getId());
    }


    public String addReact(Long id, int postType, int type, boolean isSaved) {
        return reactService.addReact(id,postType,type,isSaved);
    }

    public List<ReactDTO> getReactByPostIdAndPostType(Long id, int i) {
        return reactService.getReactByPostIdAndPostType(id,i);
    }

    public List<AdoptionRequest> getMyRequestByPet(Long id) {
        Users users = userService.getUser();
        if(users==null) return null;
        return adoptRepo.findMyRequestByPet(id,users.getId());
    }
}
