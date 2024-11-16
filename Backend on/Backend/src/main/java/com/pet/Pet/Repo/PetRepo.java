package com.pet.Pet.Repo;

import com.pet.Pet.DTO.PetDTO;
import com.pet.Pet.Model.Pet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.w3c.dom.stylesheets.LinkStyle;

import java.util.List;

@Repository
public interface PetRepo extends JpaRepository<Pet, Long> {

    @Query("SELECT new com.pet.Pet.DTO.PetDTO(p.id, p.name, p.description, p.media, u.id, u.name, " +
            "u.profilePic, p.address, p.reactCount, p.numberOfRequests, p.reactType) " +
            "FROM Pet p JOIN p.owner u")
    Page<PetDTO> findAllPet(Pageable pageable);

    Pet findPetById(Long id);

    @Query("SELECT new com.pet.Pet.DTO.PetDTO(p.id, p.name, p.description, p.media, u.id, u.name, " +
            "u.profilePic, p.address, p.reactCount, p.numberOfRequests, p.reactType) " +
            "FROM Pet p JOIN p.owner u WHERE p.id IN :postIds")
    List<PetDTO> findAllByIdFilter(List<Long> postIds);

}
