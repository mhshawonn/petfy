package com.pet.Pet.Repo;

import com.pet.Pet.Model.FollowSummary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface FollowSummaryRepo extends JpaRepository<FollowSummary,Long> {

    @Query("SELECT f FROM FollowSummary f WHERE f.user.id = :userId")
    FollowSummary getByUserId(@Param("userId") Long userId);
}
