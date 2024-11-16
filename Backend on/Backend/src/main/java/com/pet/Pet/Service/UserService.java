package com.pet.Pet.Service;

import com.pet.Pet.Model.Address;
import com.pet.Pet.Model.UserPrincipal;
import com.pet.Pet.Model.Users;
import com.pet.Pet.Repo.AddressRepo;
import com.pet.Pet.Repo.UsersRepo;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Random;
import java.util.concurrent.TimeUnit;

@Service
public class UserService {
    @Autowired
    private UsersRepo usersRepo;
    @Autowired
    private EmailService emailService;

    @Autowired
    private FirebaseService firebaseService;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AddressRepo addressRepo;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public Users getUser() {
        UserPrincipal userPrincipal = getUserPrincipal();
        return usersRepo.findById(userPrincipal.getId()).orElse(null);
    }

    public UserPrincipal getUserPrincipal() {
        UserPrincipal userPrincipal = null;
        try {
            userPrincipal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        } catch (Exception ignored) {
        }
        return userPrincipal;
    }


    public Users OtpSender(Users user) throws Exception {
        String OTP = String.format("%06d", new Random().nextInt(1000000));
        user.setOTP(OTP);
        user.setExpireTimeOfOtp(System.currentTimeMillis()+ TimeUnit.MINUTES.toMillis(15));
        String message = emailService.SendOtpMessage(user.getEmail(),OTP);
        return usersRepo.save(user);
    }

    public Users register(Users user) throws Exception {
        user.setPassword(encoder.encode(user.getPassword()));
        user.setRole("USER");
        return OtpSender(user);
    }

    public Users sendOtp(String email) throws Exception {
        Users user = usersRepo.findByEmail(email);
        return OtpSender(user);
    }

    public String verifyEmail(String email, String otp) {
        Users user = usersRepo.findByEmail(email);
        if(!user.getOTP().equals(otp)){
            return "Invalid OTP";
        }
        else if(user.getExpireTimeOfOtp() < System.currentTimeMillis()){
            return "OTP expired";
        }
        user.setEnable(true);
        usersRepo.save(user);
        return "Email verified";
    }

    public boolean isAvailable(String username) {
        Users user = usersRepo.findByUsername(username);
        return user != null;
    }

    public String verify(String username, String password) {
        Users user;
        if(username.contains("@")){
            user = usersRepo.findByEmail(username);
            if  (user == null) return "User not found with "+username+" Email";
        }else{
            user = usersRepo.findByUsername(username);
            if  (user == null) return "User not found with "+username+" username";
        }

        if(!user.isEnable()){
            return user.getEmail()+" is not verified";
        }

        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(),password));

        if(authentication.isAuthenticated()) return jwtService.generateToken(user.getUsername());

        return "Invalid credentials password not match";
    }

    public ResponseEntity<?> isHaveEmail(String email) {
        Users user = usersRepo.findByEmail(email);
        if(user != null) return ResponseEntity.ok(true);
        return ResponseEntity.ok(false);
    }

    public String uploadPic(MultipartFile multipartFile,int target) throws IOException {
        UserPrincipal userPrincipal = getUserPrincipal();
        String url = firebaseService.uploadFile(multipartFile);
        Users user = usersRepo.findByUsername(userPrincipal.getUsername());
        if(target == 0) user.setProfilePic(url);
        else user.setCoverPic(url);
        usersRepo.save(user);
        return "Uploaded";
    }

    public Users getMyProfile() {
        UserPrincipal user = getUserPrincipal();
        return usersRepo.findByUsername(user.getUsername());
    }

    public Users updateBio(String newBio) {
        UserPrincipal userPrincipal = getUserPrincipal();
        Users user = usersRepo.findByUsername(userPrincipal.getUsername());
        user.setBio(newBio);
        return usersRepo.save(user);
    }

    public Users getProfile(Long id) {
        return usersRepo.findById(id).orElse(null);
    }

    public String updateAddress(Long id) {
        UserPrincipal userDetails = getUserPrincipal();
        Users user = usersRepo.findByUsername(userDetails.getUsername());
        Address address = addressRepo.findById(id).orElse(null);
        user.setAddress(address);
        usersRepo.save(user);
        return "Address updated";
    }
}
