package com.pet.Pet.Controller;


import com.pet.Pet.Model.Users;
import com.pet.Pet.Service.UserService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Users user) {
        try {
            Users new_user = userService.register(user);
            return new ResponseEntity<>(new_user, HttpStatus.CREATED);
        }catch(Exception e){
            throw new RuntimeException(e);
        }
    }

    @PostMapping("/verify/{email}")
    public String verifyEmail(@PathVariable String email, @RequestBody Map<String, String> requestBody){
        String Otp = requestBody.get("Otp");
        return userService.verifyEmail(email,Otp);
    }

    @GetMapping("/isHas/{username}")
    public ResponseEntity<?> isHas(@PathVariable String username){
        try {
            if(username.contains("@")){
                return new ResponseEntity<>("@ not allowed in username", HttpStatus.BAD_REQUEST);
            }
            boolean isHas = userService.isAvailable(username);
            return new ResponseEntity<>(isHas, HttpStatus.OK);
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/isHasEmail/{email}")
    public ResponseEntity<?> isHasEmail(@PathVariable String email){
       return userService.isHaveEmail(email);
    }

    @PostMapping("/login")
    public String login(@RequestBody Map<String, String> requestBody){
        String username = requestBody.get("username");
        String password = requestBody.get("password");
        return userService.verify(username,password);
    }

    @GetMapping("/reSentOtp/{email}")
    public ResponseEntity<?> profile(@PathVariable String email) throws Exception {
        Users user = userService.sendOtp(email);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/profilePic")
    public ResponseEntity<?> profilePic(@RequestPart MultipartFile multipartFile) throws IOException {
        String status = userService.uploadPic(multipartFile,0);
        return new ResponseEntity<>(status, HttpStatus.OK);
    }

    @PostMapping("/coverPic")
    public ResponseEntity<?> coverPic(@RequestPart MultipartFile multipartFile) throws IOException {
        String status = userService.uploadPic(multipartFile,1);
        return new ResponseEntity<>(status, HttpStatus.OK);
    }

    @GetMapping("/myProfile")
    public Users getMyProfile() throws IOException {
        return userService.getMyProfile();
    }

    @GetMapping("/Profile/{id}")
    public Users Profile(@PathVariable Long id) throws IOException {
        return userService.getProfile(id);
    }

//    @GetMapping("/logout")
//    public String logout(@AuthenticationPrincipal Users user) {
//
//        return "Logged Out";
//    }

    @PostMapping("/updateBio")
    public ResponseEntity<?> updateBio(@RequestBody Map<String, String> requestBody) {
        String newBio = requestBody.get("bio");
        Users updatedUser = userService.updateBio(newBio);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }

    @GetMapping("/upadteAddress/{id}")
    public String updateAddress(@PathVariable Long id) {
        return userService.updateAddress(id);
    }

}
