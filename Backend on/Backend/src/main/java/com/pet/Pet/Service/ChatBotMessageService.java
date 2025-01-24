package com.pet.Pet.Service;

import com.pet.Pet.DTO.ChatBotMessageDTO;
import com.pet.Pet.Model.ChatBotMessage;
import com.pet.Pet.Model.Users;
import com.pet.Pet.Repo.ChatBotMessageRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ChatBotMessageService {

    @Autowired
    public UserService userService;

    @Autowired
    public ChatBotMessageRepo chatBotMessageRepo;

    public List<ChatBotMessage> getAllMessagesFromToken() {
        Users user = userService.getUser();

        if(user == null){
            return null;
        }

        return chatBotMessageRepo.findAllFromUser(user);
    }

    public ChatBotMessage saveMessage(ChatBotMessageDTO chatBotMessageDTO) {
        Users user = userService.getUser();

        if(user == null){
            return null;
        }

        ChatBotMessage chatBotMessage = new ChatBotMessage();
        chatBotMessage.setUser(user);
        chatBotMessage.setMessage(chatBotMessageDTO.getMessage());
        chatBotMessage.setTimestamp(LocalDateTime.now());
        chatBotMessage.setSentFrom(chatBotMessageDTO.getFrom());

        return chatBotMessageRepo.save(chatBotMessage);
    }
}
