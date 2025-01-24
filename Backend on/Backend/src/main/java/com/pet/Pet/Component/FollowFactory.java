package com.pet.Pet.Component;

import com.pet.Pet.Model.Follow;
import com.pet.Pet.Model.FollowSummary;
import com.pet.Pet.Model.Users;
import org.springframework.stereotype.Component;

@Component
public class FollowFactory {
    public Follow createFollow(Users userFrom, Users userTo, int direction) {
        Follow follow = new Follow();
        follow.setFollowDate(System.currentTimeMillis());
        follow.setUserFrom(userFrom);
        follow.setUserTo(userTo);
        follow.setDirection(direction);
        return follow;
    }

    public FollowSummary createFollowSummary(Users user) {
        FollowSummary followSummary = new FollowSummary();
        followSummary.setNumberOfFollowing(0L);
        followSummary.setNumberOfFollower(0L);
        followSummary.setUpdatedAt(System.currentTimeMillis());
        followSummary.setUser(user);
        return followSummary;
    }
}
