package com.example.demo.Services;

import com.example.demo.Models.User;
import com.example.demo.Repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
	private final UserRepository userRepository;
	
	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}
	
	public List< User > allUsers(){
		return (List< User >) userRepository.findAll();
	}
}
