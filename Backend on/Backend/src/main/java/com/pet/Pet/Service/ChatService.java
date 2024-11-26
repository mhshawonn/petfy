package com.pet.Pet.Service;

import com.pet.Pet.Exceptions.ChatException;
import com.pet.Pet.Exceptions.UserException;
import com.pet.Pet.Model.Chat;
import com.pet.Pet.Model.Users;
import com.pet.Pet.Repo.ChatRepository;
import com.pet.Pet.ServiceInterface.ChatServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class ChatService implements ChatServiceInterface {

    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private UserService userService;

    @Override
    public Chat createChat(Users reqUser, Long userId2 ) throws UserException {
        Users user = userService.findUserById(userId2);
        Chat doesChatExist = chatRepository.findSingleChatByUserIds(user,reqUser);

        if(doesChatExist != null){
            return doesChatExist;
        }

        Chat chat = new Chat();
        chat.setCreatedBy(reqUser);
        chat.getUsers().add(user);
        chat.getUsers().add(reqUser);


        chat = chatRepository.save(chat);


        return chat;
    }

    @Override
    public Chat findChatById( Long chatId ) throws ChatException {

        Optional<Chat> chat = chatRepository.findById(chatId);

        if(chat.isPresent()){
            return chat.get();

        }

        throw new ChatException("Chat not found with id : " + chatId);
    }



    @Override
    public List< Chat > findAllChatByUserId(Long userId ) throws UserException {
        Users user = userService.findUserById(userId);

        List<Chat> chats = chatRepository.findChatByUserId(user.getId());

        return chats;
    }


    @Override
    public void deleteChat( Long chatId, Long userId ) throws ChatException, UserException {

        Optional<Chat> opt = chatRepository.findById(chatId);

        if(opt.isPresent()){
            Chat chat = opt.get();
            chatRepository.deleteById(chat.getId());
        }

    }
}
