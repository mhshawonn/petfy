package com.pet.Pet.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Message {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String content;
	
	private LocalDateTime timestamp;
	
	@ManyToOne
	private Users user;
	
	@ManyToOne
	@JoinColumn(name = "chat_id")
	private Chat chat;
}
