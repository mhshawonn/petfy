package com.pet.Pet.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.NoHandlerFoundException;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalException extends Exception{
	
	@ExceptionHandler(UserException.class)
	public ResponseEntity<ErrorDetail> UserExceptionHandler( UserException e, WebRequest req ){
		ErrorDetail err = new ErrorDetail(e.getMessage(),req.getDescription(false), LocalDateTime.now());
		
		return new ResponseEntity<ErrorDetail>(err, HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(MessageException.class)
	public ResponseEntity<ErrorDetail> MessageExceptionHandler( MessageException e, WebRequest req ){
		ErrorDetail err = new ErrorDetail(e.getMessage(),req.getDescription(false), LocalDateTime.now());
		
		return new ResponseEntity<ErrorDetail>(err, HttpStatus.BAD_REQUEST);
	}
	
	
	@ExceptionHandler(ChatException.class)
	public ResponseEntity<ErrorDetail> ChatExceptionHandler( ChatException e, WebRequest req ){
		ErrorDetail err = new ErrorDetail(e.getMessage(),req.getDescription(false), LocalDateTime.now());
		
		return new ResponseEntity<ErrorDetail>(err, HttpStatus.BAD_REQUEST);
	}
	
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ErrorDetail> MessageExceptionHandler( MethodArgumentNotValidException e, WebRequest req ){
		
		String error = e.getBindingResult().getFieldError().getDefaultMessage();
		
		ErrorDetail err = new ErrorDetail("Validation Error", error,LocalDateTime.now());
		
		return new ResponseEntity<ErrorDetail>(err, HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(NoHandlerFoundException.class)
	public ResponseEntity<ErrorDetail> otherExceptionHandler( NoHandlerFoundException e, WebRequest req ){
		ErrorDetail err = new ErrorDetail("Endpoint not found",e.getMessage(), LocalDateTime.now());
		
		return new ResponseEntity<ErrorDetail>(err, HttpStatus.NOT_FOUND);
	}
	
	
	@ExceptionHandler(Exception.class)
	public ResponseEntity<ErrorDetail> otherExceptionHandler( Exception e, WebRequest req ){
		
		ErrorDetail err = new ErrorDetail(e.getMessage(),req.getDescription(false), LocalDateTime.now());
		
		return new ResponseEntity<ErrorDetail>(err, HttpStatus.BAD_REQUEST);
	}
}
