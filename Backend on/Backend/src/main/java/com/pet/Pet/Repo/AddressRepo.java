package com.pet.Pet.Repo;

import com.pet.Pet.Model.Address;
import org.antlr.v4.runtime.atn.SemanticContext;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AddressRepo extends JpaRepository<Address,Long> {

    @Query("SELECT a FROM Address a WHERE LOWER(a.city) LIKE LOWER(CONCAT('%',:value,'%')) OR "+
            "LOWER(a.state) LIKE LOWER(CONCAT('%',:value,'%')) OR "+
            "LOWER(a.country) LIKE LOWER(CONCAT('%',:value,'%')) OR "+
            "LOWER(a.zipcode) LIKE LOWER(CONCAT('%',:value,'%'))")
    List<Address> searchAddress(String value);
}
