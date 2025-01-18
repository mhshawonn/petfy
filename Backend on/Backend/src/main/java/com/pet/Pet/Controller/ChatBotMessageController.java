package com.pet.Pet.Controller;

import com.pet.Pet.DTO.ChatBotMessageDTO;
import com.pet.Pet.DTO.ChatBotMsgResponse;
import com.pet.Pet.Model.ChatBotMessage;
import com.pet.Pet.Service.ChatBotMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/chatbot")
public class ChatBotMessageController {

    @Autowired
    public ChatBotMessageService chatBotMessageService;

    @GetMapping("/messages")
    public ResponseEntity<List<?>> getAllMessagesFromToken() {

        List<ChatBotMessage> messages = chatBotMessageService.getAllMessagesFromToken();
        List<ChatBotMsgResponse> chatBotMsgResponses = messages.stream()
                .map(message -> new ChatBotMsgResponse(message.getMessage(), message.getSentFrom()))
                .collect(Collectors.toList());

        if(messages == null){
            return ResponseEntity.badRequest().body(null);
        }
        return ResponseEntity.ok(chatBotMsgResponses);
    }

    @PostMapping("/save")
    public ResponseEntity<ChatBotMessage> saveMessage(@RequestBody ChatBotMessageDTO chatBotMessageDTO){
        ChatBotMessage chatBotMessage = chatBotMessageService.saveMessage(chatBotMessageDTO);
        if(chatBotMessage == null){
            return ResponseEntity.badRequest().body(null);
        }
        return ResponseEntity.ok(chatBotMessage);
    }

}
