package com.pet.Pet.Repo;

import com.pet.Pet.Model.Animal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestPart;

@Repository
public interface AnimalRepo extends JpaRepository<Animal, Long> {
}
