package com.pet.Pet.Service;

import com.pet.Pet.DTO.UserDTO;
import com.pet.Pet.Model.Follow;
import com.pet.Pet.Model.FollowSummary;
import com.pet.Pet.Model.Users;
import com.pet.Pet.Repo.FollowRepo;
import com.pet.Pet.Repo.FollowSummaryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConnectionService {
    @Autowired
    private FollowSummaryRepo followSummaryRepo;
    @Autowired
    private FollowRepo followRepo;
    @Autowired
    private UserService userService;

    public FollowSummary getSummary() {
        Users user = userService.getUser();
        return getSummaryFromUser(user);
    }

    private FollowSummary getSummaryFromUser(Users user) {
        FollowSummary followSummary = followSummaryRepo.getByUserId(user.getId());
        if(followSummary == null){
            followSummary = new FollowSummary();
            followSummary.setNumberOfFollowing(0L);
            followSummary.setNumberOfFollower(0L);
            followSummary.setUpdatedAt(System.currentTimeMillis());
            followSummary.setUser(user);
            followSummaryRepo.save(followSummary);
        }
        return followSummary;
    }


    public String Follow(Long id) {
        Users user_from = userService.getUser();
        Users user_to = userService.getProfile(id);
        Follow follow_from = followRepo.getFollowStatus(user_from.getId(),user_to.getId());
        if(follow_from!=null) return "Already followed";
        Follow follow_to = followRepo.getFollowStatus(user_to.getId(),user_from.getId());
        follow_from = new Follow();
        follow_from.setFollowDate(System.currentTimeMillis());
        follow_from.setUserFrom(user_from);
        follow_from.setUserTo(user_to);
        if(follow_to!=null){
            follow_from.setDirection(1);
            follow_to.setDirection(1);
            followRepo.save(follow_to);
        }
        followRepo.save(follow_from);
        FollowSummary followSummary_from = getSummaryFromUser(user_from);
        followSummary_from.setNumberOfFollowing(followSummary_from.getNumberOfFollowing()+1);
        FollowSummary followSummary_to = getSummaryFromUser(user_to);
        followSummary_to.setNumberOfFollower(followSummary_to.getNumberOfFollower()+1);
        followSummaryRepo.save(followSummary_to);
        followSummaryRepo.save(followSummary_from);
        return "Followed";
    }

    public FollowSummary getSummaryOfUser(Long id) {
        Users user = userService.getProfile(id);
        return getSummaryFromUser(user);
    }

    public String UnFollow(Long id) {
        Users user_from = userService.getUser();
        Users user_to = userService.getProfile(id);
        Follow follow_from = followRepo.getFollowStatus(user_from.getId(),user_to.getId());
        followRepo.delete(follow_from);
        if(follow_from.getDirection()==1){
            Follow follow_to = followRepo.getFollowStatus(user_to.getId(),user_from.getId());
            follow_to.setDirection(0);
            followRepo.save(follow_to);
        }

        FollowSummary followSummary_from = getSummaryFromUser(user_from);
        followSummary_from.setNumberOfFollowing(followSummary_from.getNumberOfFollowing()-1);
        FollowSummary followSummary_to = getSummaryFromUser(user_to);
        followSummary_to.setNumberOfFollower(followSummary_to.getNumberOfFollower()-1);
        followSummaryRepo.save(followSummary_to);
        followSummaryRepo.save(followSummary_from);
        return "Unfollow done";
    }

    public List<UserDTO> getFollowingList(){
        Users user = userService.getUser();
        return followRepo.findFollowingByUserId(user.getId());
    }

    public List<UserDTO> getFollower(){
        Users user = userService.getUser();
        return followRepo.findFollowersByUserId(user.getId());
    }
}
