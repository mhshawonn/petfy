package com.pet.Pet.Controller;

import com.pet.Pet.Exceptions.ChatException;
import com.pet.Pet.Exceptions.UserException;
import com.pet.Pet.Model.Chat;
import com.pet.Pet.Model.Users;
import com.pet.Pet.Service.ChatService;
import com.pet.Pet.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/chats")
public class ChatController {
	
	@Autowired
	private ChatService chatService;
	
	@Autowired
	private UserService userService;
	
	
	
	@PostMapping("/single")
	public ResponseEntity<Chat> createChatHandler(
			@RequestParam Long reqUserId,
			@RequestParam Long otherUserId) throws UserException {
		
		Users reqUser = userService.findUserById(reqUserId);
		Chat chat = chatService.createChat(reqUser, otherUserId);
		
		System.out.println(chat);
		
		return ResponseEntity.ok().body(chat);
	}

	
	//need to enhance security by adding jwt
	@GetMapping("/{chatId}")
	public ResponseEntity< Chat > findChatByHandler( @PathVariable Long chatId) throws UserException, ChatException {
		
		Chat chat = chatService.findChatById(chatId);
		return ResponseEntity.ok().body(chat);
	}

	@GetMapping("/user")
	public ResponseEntity<List<Chat>> findAllChatsByIdHandler(@RequestParam Long id)
			throws UserException {

		Users reqUser = userService.findUserById(id);
		List<Chat> chats = chatService.findAllChatByUserId(reqUser.getId());
		return ResponseEntity.ok().body(chats);
	}
	


	//need to enhance this .... for handling deletion of chats
	@DeleteMapping("/delete/{chatId}")
	public ResponseEntity< String > deleteChatHandler(
			@RequestParam Long reqUserId,
			@PathVariable Long chatId
			)
			throws UserException, ChatException {
		
		Users reqUser = userService.findUserById(reqUserId);
		chatService.deleteChat(chatId, reqUser.getId());
		
		return ResponseEntity.ok().body("Chat Deleted Successfully");
	}
	
	
}
