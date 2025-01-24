package com.pet.Pet.Repo;

import com.pet.Pet.DTO.UserDTO;
import com.pet.Pet.Model.Follow;
import com.pet.Pet.Model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FollowRepo extends JpaRepository<Follow,Long> {

    @Query("SELECT f FROM Follow f WHERE f.userTo.id = :userTo AND f.userFrom.id = :userFrom")
    Follow getFollowStatus(@Param("userFrom") Long userFrom, @Param("userTo") Long userTo);

    @Query("SELECT new com.pet.Pet.DTO.UserDTO(u.id, u.name, u.profilePic) " +
            "FROM Follow f " +
            "JOIN f.userTo u " +
            "WHERE f.userFrom.id = :userId")
    List<UserDTO> findFollowingByUserId(@Param("userId") Long userId);


    @Query("SELECT new com.pet.Pet.DTO.UserDTO(u.id, u.name, u.profilePic) " +
            "FROM Follow f " +
            "JOIN f.userFrom u " +
            "WHERE f.userTo.id = :userId")
    List<UserDTO> findFollowersByUserId(@Param("userId") Long userId);

}
