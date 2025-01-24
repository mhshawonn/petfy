package com.pet.Pet.Repo;

import com.pet.Pet.Model.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.ResponseBody;

@Repository
public interface TokenRepo extends JpaRepository<Token,Long> {

    @Query("SELECT t FROM Token t WHERE t.token = :token")
    Token findByToken(@Param("token") String token);

    @Query("SELECT t FROM Token t WHERE t.username = :username")
    Token findByUsername(String username);
}
