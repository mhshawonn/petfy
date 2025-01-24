package com.pet.Pet.Service;

import com.pet.Pet.Component.FollowFactory;
import com.pet.Pet.DTO.UserDTO;
import com.pet.Pet.Model.Follow;
import com.pet.Pet.Model.FollowSummary;
import com.pet.Pet.Model.Users;
import com.pet.Pet.Repo.FollowRepo;
import com.pet.Pet.Repo.FollowSummaryRepo;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConnectionService {
    @Autowired
    private FollowRepo followRepo;
    @Autowired
    private UserService userService;
    @Autowired
    private FollowFactory followFactory;
    @Autowired
    private FollowAction followAction;
    @Autowired
    private UnFollowAction unFollowAction;

    public String Follow(Long id) {
        return followAction.execute(id);
    }

    public String UnFollow(Long id) {
        return unFollowAction.execute(id);
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
