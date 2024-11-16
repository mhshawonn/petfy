package com.pet.Pet.Repo;

import com.pet.Pet.Model.Tags;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TagRepo extends JpaRepository<Tags, Integer> {
}
