package com.pet.Pet.Service;

import com.pet.Pet.DTO.FeedDTO;
import com.pet.Pet.Model.*;
import com.pet.Pet.Repo.BlogRepo;
import com.pet.Pet.Repo.PetRepo;
import com.pet.Pet.Repo.SavedRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class SavedService {
    @Autowired
    private UserService userService;
    @Autowired
    private SavedRepo savedRepo;
    @Autowired
    private BlogRepo blogRepo;
    @Autowired
    private PetRepo petRepo;
    @Autowired PetService petService;
    @Autowired BlogService blogService;

    public String Save(Long id, int postType) {
        Users users = userService.getUser();
        Saved saved = savedRepo.findByUserIdAndPostIdAndPostType(users.getId(),id,postType).orElse(null);
        if(saved!=null) return "Saved successfully";
        saved = new Saved();
        if(postType==0){
            Pet pet = petRepo.findPetById(id);
            saved.setPet(pet);
        }
        else if(postType == 1){
            Blog blog = blogRepo.findById(id).orElse(null);
            saved.setBlog(blog);
        }
        saved.setPostType(postType);
        saved.setPostId(id);
        saved.setUser(users);
        savedRepo.save(saved);
        return "Saved successfully";
    }

    public Page<FeedDTO> getSavedPet(int page, String sortAttribute, int order) {
        UserPrincipal userDetails = userService.getUserPrincipal();
        Long userId = userDetails != null ? userDetails.getId() : null;
        if (sortAttribute == null) {
            sortAttribute = "id";
        }
        Sort sort = (order == 0) ? Sort.by(Sort.Order.desc(sortAttribute)) : Sort.by(Sort.Order.asc(sortAttribute));
        Pageable pageable = PageRequest.of(page, 10, sort);
        return petService.processPets(savedRepo.findSavedPet(pageable,userId), userId);
    }

    public Page<Blog> getSavedBlogs(int page) {
        UserPrincipal userDetails = userService.getUserPrincipal();
        Long userId = userDetails != null ? userDetails.getId() : null;
        String sortAttribute = "id";
        Sort sort = Sort.by(Sort.Order.desc(sortAttribute));

        Pageable pageable = PageRequest.of(page, 10, sort);

        return blogService.processBlog(savedRepo.findSavedBlog(pageable,userId), userId);
    }
}
