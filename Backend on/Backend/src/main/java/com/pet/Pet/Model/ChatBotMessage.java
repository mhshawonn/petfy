package com.pet.Pet.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.Length;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class ChatBotMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(length = 4000)
    private String message;
    private LocalDateTime timestamp;
    private String sentFrom; //user or bot


    @ManyToOne
    private Users user;
}
