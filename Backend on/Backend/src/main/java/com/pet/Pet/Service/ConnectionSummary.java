package com.pet.Pet.Service;

import com.pet.Pet.Component.FollowFactory;
import com.pet.Pet.Model.FollowSummary;
import com.pet.Pet.Model.Users;
import com.pet.Pet.Repo.FollowSummaryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ConnectionSummary {
    @Autowired
    private UserService userService;
    @Autowired
    private FollowSummaryRepo followSummaryRepo;
    @Autowired
    private FollowFactory followFactory;

    public FollowSummary getSummary() {
        Users user = userService.getUser();
        return getSummaryFromUser(user);
    }

    private FollowSummary getSummaryFromUser(Users user) {
        FollowSummary followSummary = followSummaryRepo.getByUserId(user.getId());
        if (followSummary == null) {
            followSummary = followFactory.createFollowSummary(user);
            followSummaryRepo.save(followSummary);
        }
        return followSummary;
    }

    public FollowSummary getSummaryOfUser(Long id) {
        Users user = userService.getProfile(id);
        return getSummaryFromUser(user);
    }

    public void followSummaryAdjust(Users userFrom,Users userTo,Long adjust){
        FollowSummary followSummaryFrom = getSummaryFromUser(userFrom);
        followSummaryFrom.setNumberOfFollowing(followSummaryFrom.getNumberOfFollowing() + adjust);
        FollowSummary followSummaryTo = getSummaryFromUser(userTo);
        followSummaryTo.setNumberOfFollower(followSummaryTo.getNumberOfFollower() + adjust);
        followSummaryRepo.save(followSummaryTo);
        followSummaryRepo.save(followSummaryFrom);
    }
}
