package com.pet.Pet.DTO;

import com.pet.Pet.Model.Address;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PetDTO {
    private Long id;
    private String name;
    private String description;
    private List<String> media;
    private Long ownerId;
    private String ownerName;
    private String ownerProfilePic;
    private Address address;
    private Long numberOfReact;
    private Long numberOfRequests;
    private int reactType;
}
