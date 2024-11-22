package com.pet.Pet.Exceptions;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;


@Data
@AllArgsConstructor
public class ErrorDetail {
	private String error;
	private String message;
	private LocalDateTime timeStamp;
	
	
}
