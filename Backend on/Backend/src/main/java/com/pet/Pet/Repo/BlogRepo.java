package com.pet.Pet.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.pet.Pet.Model.Blog;

@Repository
public interface BlogRepo extends JpaRepository<Blog, Long> {

}
