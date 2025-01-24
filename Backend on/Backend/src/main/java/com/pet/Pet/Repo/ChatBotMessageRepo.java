package com.pet.Pet.Repo;


import com.pet.Pet.Model.ChatBotMessage;
import com.pet.Pet.Model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ChatBotMessageRepo extends JpaRepository<ChatBotMessage, Long> {

    @Query("SELECT m FROM ChatBotMessage m WHERE m.user = :user order by m.timestamp")
    List<ChatBotMessage> findAllFromUser(Users user);
}
