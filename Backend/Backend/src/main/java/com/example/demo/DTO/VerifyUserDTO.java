package com.example.demo.DTO;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class VerifyUserDTO {
	private String email;
	private String verificationCode;
}
