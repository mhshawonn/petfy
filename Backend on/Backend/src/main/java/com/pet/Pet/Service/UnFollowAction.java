package com.pet.Pet.Service;

import com.pet.Pet.Component.FollowStrategy;
import com.pet.Pet.Model.Follow;
import com.pet.Pet.Model.Users;
import com.pet.Pet.Repo.FollowRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UnFollowAction implements FollowStrategy {
    @Autowired
    private FollowRepo followRepo;
    @Autowired
    private UserService userService;
    @Autowired
    private ConnectionSummary connectionSummary;

    @Override
    public String execute(Long userId) {
        Users userFrom = userService.getUser();
        Users userTo = userService.getProfile(userId);

        Follow followFrom = followRepo.getFollowStatus(userFrom.getId(), userTo.getId());
        if (followFrom == null) return "Not following";

        followRepo.delete(followFrom);

        if (followFrom.getDirection() == 1) {
            Follow followTo = followRepo.getFollowStatus(userTo.getId(), userFrom.getId());
            followTo.setDirection(0);
            followRepo.save(followTo);
        }
        connectionSummary.followSummaryAdjust(userFrom,userTo,-1L);
        return "Unfollowed";
    }
}

