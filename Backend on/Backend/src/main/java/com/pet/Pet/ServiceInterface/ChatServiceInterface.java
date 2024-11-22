package com.pet.Pet.ServiceInterface;

import com.pet.Pet.Exceptions.ChatException;
import com.pet.Pet.Exceptions.UserException;
import com.pet.Pet.Model.Chat;
import com.pet.Pet.Model.Users;

import java.util.List;

public interface ChatServiceInterface {
	
	public Chat createChat( Users reqUser, Long userId2 ) throws UserException;
	public Chat findChatById(Long chatId) throws ChatException;

	public List<Chat> findAllChatByUserId(Long userId) throws UserException;

	
	public void deleteChat(Long chatId, Long userId) throws ChatException,UserException;
}
