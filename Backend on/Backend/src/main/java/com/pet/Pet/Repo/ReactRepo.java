package com.pet.Pet.Repo;

import com.pet.Pet.DTO.PetDTO;
import com.pet.Pet.DTO.ReactDTO;
import com.pet.Pet.Model.React;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReactRepo extends JpaRepository<React,Long> {
    int findReactTypeByPostIdAndPostTypeAndUserIdAndIsSavedFalse(Long postId, int postType, Long userId);
    Long countByPostIdAndPostTypeAndIsSavedFalse(Long postId, int postType);
    Long countByPostIdAndPostTypeAndReactTypeAndIsSavedFalse(Long postId, int postType, int reactType);
    @Query("SELECT r.reactType, COUNT(r) " +
            "FROM React r " +
            "WHERE r.postId = :postId AND r.postType = :postType AND r.isSaved = false " +
            "GROUP BY r.reactType")
    List<Object[]> getCountGroupedByReactType(Long postId,int postType);

    @Query("SELECT r.postId FROM React r WHERE " +
            "r.user.id = :userId AND r.postType = :postType " +
            "AND r.isSaved = true")
    List<Long> findPostIdsByUserIdAndPostTypeAndIsSavedTrue(@Param("userId") Long userId, @Param("postType") int postType);


    @Query("SELECT r FROM React r WHERE " +
            "r.postId = :postId AND r.postType = :postType " +
            "AND r.user.id = :userId AND r.isSaved = :isSaved")
    React findReact(@Param("postId") Long postId,
                    @Param("postType") int postType,
                    @Param("userId") Long userId,
                    @Param("isSaved") Boolean isSaved);


    @Query("SELECT new com.pet.Pet.DTO.ReactDTO(r.reactType, r.timestamp, " +
            "new com.pet.Pet.DTO.UserDTO(u.id, u.name, u.profilePic)) " +
            "FROM React r JOIN r.user u " +
            "WHERE r.postId = :postId AND r.postType = :postType AND r.isSaved = false")
    List<ReactDTO> findByPostIdAndPostTypeAndIsSavedFalse(Long postId,int postType);
}
