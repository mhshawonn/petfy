package com.pet.Pet.Repo;

import com.pet.Pet.Model.AdoptionRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AdoptionRepo  extends JpaRepository<AdoptionRequest,Long> {

    Long countByPetId(Long id);

    @Query("SELECT p.owner.id FROM AdoptionRequest ar JOIN ar.pet p WHERE ar.id = :adoptionRequestId")
    Long findPetOwnerIdByAdoptionRequestId(@Param("adoptionRequestId") Long adoptionRequestId);

    @Query("SELECT ar FROM AdoptionRequest ar WHERE ar.pet.id = :id")
    Page<AdoptionRequest> findAllByPetId(Pageable pageable, @Param("id") Long id);

    @Query("SELECT ar FROM AdoptionRequest ar WHERE ar.requestUsers.id = :id")
    Page<AdoptionRequest> findMyRequests(Pageable pageable, Long id);

    @Query("SELECT ar FROM AdoptionRequest ar WHERE ar.requestUsers.id = :id1 and ar.pet.id = :id")
    List<AdoptionRequest> findMyRequestByPet(Long id, Long id1);
}
