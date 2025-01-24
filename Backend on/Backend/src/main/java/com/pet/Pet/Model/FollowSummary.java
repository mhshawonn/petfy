package com.pet.Pet.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FollowSummary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long numberOfFollowing;
    private Long numberOfFollower;
    private Long updatedAt;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;
}
