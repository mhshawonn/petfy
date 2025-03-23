package com.pet.Pet.Repo;

import com.pet.Pet.DTO.FeedDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.pet.Pet.Model.Blog;

import java.util.List;

@Repository
public interface BlogRepo extends JpaRepository<Blog, Long> {

    @Query("SELECT blog FROM Blog as blog WHERE blog.isApproved = false and blog.isBanned = false")
    List<Blog> getBlogsNotApproved();
}
