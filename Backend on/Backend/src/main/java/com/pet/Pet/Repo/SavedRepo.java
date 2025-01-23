package com.pet.Pet.Repo;

import com.pet.Pet.DTO.FeedDTO;
import com.pet.Pet.Model.Blog;
import com.pet.Pet.Model.Saved;
import lombok.extern.java.Log;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface SavedRepo extends JpaRepository<Saved, Long> {
    @Query("SELECT s FROM Saved s WHERE s.user.id = :userId AND s.postId = :postId AND s.postType = :postType")
    Optional<Saved> findByUserIdAndPostIdAndPostType(@Param("userId") Long userId,
                                                     @Param("postId") Long postId,
                                                     @Param("postType") int postType);

    @Query("""
    SELECT new com.pet.Pet.DTO.FeedDTO(
        p.id,\s
        p.name,\s
        p.description,\s
        p.media,\s
        u.id,\s
        u.name,\s
        u.profilePic,\s
        p.address,\s
        COALESCE(p.reactCount, 0),\s
        COALESCE(p.numberOfRequests, 0),\s
        COALESCE(p.reactType, 0)
    )
    FROM Saved s
    JOIN s.user u
    JOIN s.pet p
    WHERE s.postType = 0 AND u.id = :userId
""")
    Page<FeedDTO> findSavedPet(Pageable pageable, @Param("userId") Long userId);



    @Query("""
    SELECT b
    FROM Saved s
    JOIN s.user u
    JOIN s.blog b
    WHERE s.postType = 1 AND u.id = :userId
""")
    Page<Blog> findSavedBlog(Pageable pageable, @Param("userId") Long userId);

}
