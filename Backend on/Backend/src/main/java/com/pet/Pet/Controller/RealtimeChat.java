package com.pet.Pet.Controller;


import com.pet.Pet.Model.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class RealtimeChat {

    private final SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    public RealtimeChat(SimpMessagingTemplate simpMessagingTemplate) {
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    @MessageMapping("/message")
    @SendTo("/group/public")
    public Message receiveMessage(@Payload Message message){

        System.out.println("======message====== " +  message.toString());

        simpMessagingTemplate.convertAndSend("/group/"+ message.getChat().getId().toString(), message);

        return message;
    }



}
