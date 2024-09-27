package com.example.demo.Controllers;

import com.example.demo.Models.User;
import com.example.demo.Services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@RequestMapping("/users")
public class UserController {
	private final UserService userService;
	
	public UserController(UserService userService) {
		this.userService = userService;
	}
	
	public ResponseEntity< User > authenticatedUser(){
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		User current_user = (User) authentication.getPrincipal();
		return ResponseEntity.ok().body(current_user);
	}
	
	
	@GetMapping("/all")
	public ResponseEntity< List< User > > getAllUsers(){
		return ResponseEntity.ok().body(userService.allUsers());
	}
}
