package com.pet.Pet.DTO;

import com.pet.Pet.Model.Users;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.java.Log;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class LoginResponse {
    public String token;
    public Users user;
}
