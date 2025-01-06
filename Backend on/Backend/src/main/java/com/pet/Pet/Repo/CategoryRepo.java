package com.pet.Pet.Repo;

import com.pet.Pet.Model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepo extends JpaRepository<Category,Long> {
    @Query("SELECT c FROM Category c WHERE c.animal.id = :animalId")
    List<Category> findByAnimalId(@Param("animalId") Long animalId);

}
