package com.pet.Pet.ServiceInterface;

import com.pet.Pet.DTO.SendMessageRequest;
import com.pet.Pet.Exceptions.ChatException;
import com.pet.Pet.Exceptions.MessageException;
import com.pet.Pet.Exceptions.UserException;
import com.pet.Pet.Model.Message;
import com.pet.Pet.Model.Users;

import java.util.List;

public interface MessageServiceInterface {
	
	public Message sendMessage( SendMessageRequest req) throws UserException, ChatException;
	
	public List<Message> getChatsMessages(Long chatId, Users reqUser) throws ChatException, UserException;
	
	public Message findMessageById(Long messageId) throws MessageException;
	
	public void deleteMessage(Long messageId, Users reqUser) throws MessageException;
}
