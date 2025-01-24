package com.pet.Pet.Service;

import com.pet.Pet.Component.FollowFactory;
import com.pet.Pet.Component.FollowStrategy;
import com.pet.Pet.Model.Follow;
import com.pet.Pet.Model.Users;
import com.pet.Pet.Repo.FollowRepo;
import com.pet.Pet.Repo.FollowSummaryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FollowAction implements FollowStrategy {
    @Autowired
    private FollowRepo followRepo;
    @Autowired
    private UserService userService;
    @Autowired
    private FollowFactory followFactory;
    @Autowired
    private ConnectionSummary connectionSummary;

    @Override
    public String execute(Long userId) {
        Users userFrom = userService.getUser();
        Users userTo = userService.getProfile(userId);

        Follow followFrom = followRepo.getFollowStatus(userFrom.getId(), userTo.getId());
        if (followFrom != null) return "Already followed";

        Follow followTo = followRepo.getFollowStatus(userTo.getId(), userFrom.getId());
        followFrom = followFactory.createFollow(userFrom, userTo, followTo != null ? 1 : 0);

        if (followTo != null) {
            followTo.setDirection(1);
            followRepo.save(followTo);
        }
        followRepo.save(followFrom);
        connectionSummary.followSummaryAdjust(userFrom,userTo,1L);
        return "Followed";
    }
}

