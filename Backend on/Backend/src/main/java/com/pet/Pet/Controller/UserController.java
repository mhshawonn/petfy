package com.pet.Pet.Controller;


import com.pet.Pet.DTO.LoginResponse;
import com.pet.Pet.DTO.UserDTO;
import com.pet.Pet.Exceptions.UserException;
import com.pet.Pet.Model.Chat;
import com.pet.Pet.Model.Pet;
import com.pet.Pet.Model.Users;
import com.pet.Pet.Service.ChatService;
import com.pet.Pet.Service.UserService;
import io.swagger.v3.oas.annotations.media.Schema;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private ChatService chatService;



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
    public LoginResponse login(@RequestBody Map<String, String> requestBody){
        String username = requestBody.get("username");
        String password = requestBody.get("password");

        System.out.println("username : " + username);
        System.out.println("password : " + password);

        String returnValue = userService.verify(username,password); // return token

        if(! returnValue.equals("Invalid credentials password not match")){
            System.out.println("token found" + returnValue);
            LoginResponse loginResponse = new LoginResponse();
            loginResponse.setToken(returnValue);

            Users user = userService.getUserFromToken(returnValue);

            if(user != null){
                loginResponse.setUser(user);
                return loginResponse;
            }
        }

        return new LoginResponse(null,null);
    }

    @GetMapping("/logout")
    public String logout(){
        return userService.Logout();
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

    @PostMapping(path = "/upload/image/{userId}")
    public ResponseEntity< ? > uploadProfileImageHandler( @PathVariable Long userId,
                                                          @RequestParam("imageUrl") String imageUrl) throws IOException {
        Users user = userService.getProfile(userId);
        if ( user == null ) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Profile not found");
        }
        user = userService.uploadProfileImage(user, imageUrl);
        System.out.println("user image updated : " + user.getProfilePic());
        return ResponseEntity.ok(user);
    }

    @PostMapping("/updateBio/{userId}")
    public ResponseEntity<?> updateBio(@PathVariable Long userId
            , @RequestParam("bio") String bio) {

        System.out.println("bio : " + bio);
        
        Users user = userService.getProfile(userId);
        if ( user == null ) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Profile not found");
        }

        Users updatedUser = userService.updateBio(user, bio);
        System.out.println("user bio updated : " + updatedUser.getBio());
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }

    @GetMapping("/upadteAddress/{id}")
    public String updateAddress(@PathVariable Long id) {
        return userService.updateAddress(id);
    }

    @GetMapping("/get_user_by_id")
    public Users getUserById(@RequestParam Long id){
        return userService.getProfile(id);
    }

    @GetMapping("/get_user")
    public Users getUser(@RequestHeader("Authorization") String token){
        token = token.substring(7);
        return userService.getUserFromToken(token);
    }

    @GetMapping("/search")
    public List<UserDTO> searchUserHandler(@RequestParam(value = "name", required = false) String name,
                                           @RequestParam("userId") Long userId,
                                           @RequestParam(value = "searching", required = false,
                                                   defaultValue = "false") Boolean searching)
            throws UserException {
        return userService.getUsers(name,userId);
    }

}
