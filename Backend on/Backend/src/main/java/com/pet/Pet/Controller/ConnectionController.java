package com.pet.Pet.Controller;

import com.pet.Pet.DTO.UserDTO;
import com.pet.Pet.Model.FollowSummary;
import com.pet.Pet.Service.ConnectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/connect")
public class ConnectionController {
    @Autowired
    private ConnectionService connectionService;

    @GetMapping("/get")
    public FollowSummary getSummary(){
        return connectionService.getSummary();
    }

    @GetMapping("/getUser")
    public FollowSummary getSummary(@RequestParam Long id){
        return connectionService.getSummaryOfUser(id);
    }

    @GetMapping("/follow")
    public String Follow(@RequestParam Long id){
        return connectionService.Follow(id);
    }

    @GetMapping("/unfollow")
    public String UnFollow(@RequestParam Long id){
        return connectionService.UnFollow(id);
    }

    @GetMapping("/getFollowing")
    public List<UserDTO> getFollowing(){
        return connectionService.getFollowingList();
    }

    @GetMapping("/getFollower")
    public List<UserDTO> getFollower(){
        return connectionService.getFollower();
    }
}
