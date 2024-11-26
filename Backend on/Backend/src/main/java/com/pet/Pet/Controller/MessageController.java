package com.pet.Pet.Controller;

import com.pet.Pet.DTO.SendMessageRequest;
import com.pet.Pet.Exceptions.ChatException;
import com.pet.Pet.Exceptions.MessageException;
import com.pet.Pet.Exceptions.UserException;
import com.pet.Pet.Model.Message;
import com.pet.Pet.Model.Users;
import com.pet.Pet.Service.MessageService;
import com.pet.Pet.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/messages")
public class MessageController {

	@Autowired
	private MessageService messageService;

	@Autowired
	private UserService userService;
	
	
	public MessageController(MessageService messageService, UserService userService) {
		this.messageService = messageService;
		this.userService = userService;
	}
	
	@PostMapping("/create")
	public ResponseEntity<Message> sendMessageHandler(@RequestBody SendMessageRequest req,
													  @RequestParam Long senderUserId ) throws ChatException, UserException {
		
		System.out.println("message req ---  " + req);
		
		Users user = userService.findUserById(senderUserId); //to make sure there's a user with this id
		req.setUserId(user.getId());
		Message message = messageService.sendMessage(req);
		
		return new ResponseEntity<Message>(message, HttpStatus.OK);
	}
	
	
	@GetMapping("/chat/{chatId}")
	public ResponseEntity< List<Message> > getChatsMessagesHandler(@PathVariable Long chatId,
																   @RequestParam Long userId)
			throws ChatException, UserException {
		
		Users user = userService.findUserById(userId);
		List<Message> messages = messageService.getChatsMessages(chatId, user);
		
		return new ResponseEntity<List<Message>>(messages, HttpStatus.OK);
	}
	
	
	@DeleteMapping("/{messageId}")
	public ResponseEntity< String > deleteMessageHandler( @PathVariable Long messageId,
	                                                           @RequestParam Long userId ) throws UserException, MessageException {
		
		Users user = userService.findUserById(userId);
		messageService.deleteMessage(messageId, user);
		
		return new ResponseEntity<>("Delete Message", HttpStatus.OK);
	}
}
