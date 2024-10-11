package com.example.demo.Services;

import com.example.demo.DTO.LoginUserDTO;
import com.example.demo.DTO.RegisterUserDTO;
import com.example.demo.DTO.VerifyUserDTO;
import com.example.demo.Models.User;
import com.example.demo.Repository.UserRepository;
import jakarta.mail.MessagingException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class AuthenticationService {
	
	private final UserRepository userRepository;
	
	private final PasswordEncoder passwordEncoder;
	
	private final AuthenticationManager authenticationManager;
	
	private final EmailService emailService;
	
	public AuthenticationService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, EmailService emailService) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.authenticationManager = authenticationManager;
		this.emailService = emailService;
	}
	
	public User signup( RegisterUserDTO input ){
		User user = new User(input.getUsername(), input.getEmail(), passwordEncoder.encode(input.getPassword()));
		user.setVerificationCode(generateVerificationCode());
		user.setVerificationCodeExpiresAt(LocalDateTime.now().plusHours(1));
		user.setEnabled(false);
		sendVerificationEmail(user);
		return userRepository.save(user);
	}
	
	public User authenticate( LoginUserDTO input ){
		User user = userRepository.findByEmail(input.getEmail())
						.orElseThrow(() -> new RuntimeException("User not found"));
		
		if(!user.isEnabled()){
			throw new RuntimeException("Account not verified. Please verify your Account");
		}
		
		authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(
						input.getEmail(),
						input.getPassword()
				)
		);
		
		return user;
	}
	
	public void verifyUser( VerifyUserDTO input ){
		Optional<User> optionalUser = userRepository.findByEmail(input.getEmail());
		
		if(optionalUser.isPresent()){
			User user = optionalUser.get();
			
			if(user.getVerificationCodeExpiresAt().isBefore(LocalDateTime.now())){
				throw new RuntimeException("Verification code expired. Please request a new one");
			}
			
			if(user.getVerificationCode().equals(input.getVerificationCode())) {
				user.setEnabled(true);
				user.setVerificationCode(null);
				user.setVerificationCodeExpiresAt(null);
				userRepository.save(user);
			}
			else{
				throw new RuntimeException("Invalid verification code");
			}
		}else {
			throw new RuntimeException("User not found");
		}
	}
	
	public void resendVerificationCode(String email){
		Optional<User> optionalUser = userRepository.findByEmail(email);
		
		if(optionalUser.isPresent()){
			User user = optionalUser.get();
			
			if(user.isEnabled()){
				throw new RuntimeException("Account is already verified");
			}
			
			user.setVerificationCode(generateVerificationCode());
			user.setVerificationCodeExpiresAt(LocalDateTime.now().plusHours(1));
			sendVerificationEmail(user);
			userRepository.save(user);
		} else{
			throw new RuntimeException("User not found");
		}
	}
	
	
	public void sendVerificationEmail(User user){
		String subject = "Account Verification";
		String verificationCode = user.getVerificationCode();
		String htmlMessage = "<html>" +
				"<body>" +
				"<h1>Account Verification</h1>" +
				"<p>Dear " + user.getUsername() + ",</p>" +
				"<p>Thank you for registering. Please use the following verification code to verify your account:</p>" +
				"<h2>" + verificationCode + "</h2>" +
				"<p>This code will expire in 1 hour.</p>" +
				"<p>Best regards,</p>" +
				"<p>PetShop Company</p>" +
				"</body>" +
				"</html>";
				;
				
		try{
			emailService.sendVerificationEmail(user.getEmail(), subject, htmlMessage);
		}catch (MessagingException e){
			e.printStackTrace();
		}
	}
	
	
	private String generateVerificationCode(){
		return String.valueOf((int) (Math.random() * 900000) + 10000);
	}
	
	
}
