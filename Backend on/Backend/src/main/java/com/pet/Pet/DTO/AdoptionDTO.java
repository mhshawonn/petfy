package com.pet.Pet.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AdoptionDTO {
    private Long Id;
    private int numberOfExitingPets;
    private Long timeStamp;
    private String notes;
    private String reasonOfTheAdoption;
    private String status;
    private Long petId;
    private UserDTO requestUsers;
}
