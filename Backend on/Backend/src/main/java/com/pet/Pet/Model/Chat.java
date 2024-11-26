package com.pet.Pet.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
	private String chat_image;
	
	@ManyToMany
	private Set<Users> admins = new HashSet<Users>();

	
	@JoinColumn(name = "created_by")
	@ManyToOne
	private Users createdBy;
	
	@ManyToMany
	private Set<Users> users = new HashSet<Users>();
	
	@OneToMany
	private List<Message> messages = new ArrayList<Message>();


}
