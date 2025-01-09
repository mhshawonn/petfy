package com.pet.Pet.Repo;

import com.pet.Pet.DTO.UserDTO;
import com.pet.Pet.Model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UsersRepo extends JpaRepository<Users,Long> {
    Users findById(long id);

    Users findByUsername(String username);

    Users findByEmail(String email);

    @Query("select u from Users u where u.name Like :query%")
    public List<Users> searchUser(@Param("query") String query);

    @Query("SELECT new com.pet.Pet.DTO.UserDTO(u.id, u.name, u.profilePic) " +
            "FROM Users u WHERE LOWER(u.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<UserDTO> searchByName(@Param("name") String name);


//    @Query("SELECT new com.pet.Pet.DTO.UserDTO(u.id, u.name, u.profilePic) FROM User u WHERE u.id = :id")
//    UserDTO findByIdFilter(@Param("id") Long id);
}
