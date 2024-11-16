package com.pet.Pet.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ReactDTO {
    private int reactType;
    private Long timestamp;
    private UserDTO user;
}
