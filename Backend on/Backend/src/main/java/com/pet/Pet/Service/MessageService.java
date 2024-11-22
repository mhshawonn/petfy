package com.pet.Pet.Service;

import com.pet.Pet.DTO.SendMessageRequest;
import com.pet.Pet.Exceptions.ChatException;
import com.pet.Pet.Exceptions.MessageException;
import com.pet.Pet.Exceptions.UserException;
import com.pet.Pet.Model.Chat;
import com.pet.Pet.Model.Message;
import com.pet.Pet.Model.Users;
import com.pet.Pet.Repo.MessageRepository;
import com.pet.Pet.ServiceInterface.MessageServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class MessageService implements MessageServiceInterface {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private ChatService chatService;


    @Override
    public Message sendMessage(SendMessageRequest req ) throws UserException, ChatException {
        Users user = userService.findUserById(req.getUserId());
        Chat chat = chatService.findChatById(req.getChatId());

        Message message = new Message();
        message.setChat(chat);
        message.setUser(user);
        message.setContent(req.getContent());
        message.setTimestamp(LocalDateTime.now());

        return messageRepository.save(message);
    }

    @Override
    public List< Message > getChatsMessages(Long chatId, Users reqUser ) throws ChatException, UserException {

        Chat chat = chatService.findChatById(chatId);

        if(!chat.getUsers().contains(reqUser)){
            throw new UserException("User not in chat : " + chat.getId());
        }

        List<Message> messages = messageRepository.findByChatId(chat.getId());

        return messages;
    }

    @Override
    public Message findMessageById( Long messageId ) throws MessageException {

        Optional<Message> opt = messageRepository.findById(messageId);

        if ( opt.isPresent() ) {
            return opt.get();
        }

        throw new MessageException("Message not found with id : " + messageId);
    }

    @Override
    public void deleteMessage( Long messageId, Users reqUser ) throws MessageException {
        Message message = findMessageById(messageId);

        if ( message.getUser().getId().equals(reqUser.getId()) ){
            messageRepository.deleteById(messageId);
        } else {
            throw new MessageException("You can't delete another users message.");
        }
    }
}
