package com.example.demo.DTO;

import lombok.*;

@Getter
@Setter
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterUserDTO {
	
	private String email;
	private String password;
	private String username;
	
}
