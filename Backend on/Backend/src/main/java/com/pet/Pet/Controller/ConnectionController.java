package com.pet.Pet.Controller;

import com.pet.Pet.DTO.UserDTO;
import com.pet.Pet.Model.FollowSummary;
import com.pet.Pet.Service.ConnectionService;
import com.pet.Pet.Service.ConnectionSummary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/connect")
public class ConnectionController {
    @Autowired
    private ConnectionService connectionService;
    @Autowired
    private ConnectionSummary connectionSummary;

    @GetMapping("/get")
    public FollowSummary getSummary(){
        return connectionSummary.getSummary();
    }

    @GetMapping("/getUser")
    public FollowSummary getSummary(@RequestParam Long id){
        return connectionSummary.getSummaryOfUser(id);
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
