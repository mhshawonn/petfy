package com.pet.Pet.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Chat {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	private String chat_name;

	private Timestamp last_interaction;

	private Long last_interaction_sender_id;

	private boolean unseen_messages;
	
	@ManyToMany
	private Set<Users> users = new HashSet<Users>();
	
	@OneToMany
	private List<Message> messages = new ArrayList<Message>();


}
