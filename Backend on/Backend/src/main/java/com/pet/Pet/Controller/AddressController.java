package com.pet.Pet.Controller;

import com.pet.Pet.Model.Address;
import com.pet.Pet.Service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/address")
public class AddressController {
    @Autowired
    private AddressService addressService;

    @PostMapping("/add")
    public ResponseEntity<?> addAddress(@RequestBody Address address) {
        try {
            Address newAddress = addressService.addAddress(address);
            return new ResponseEntity<>(newAddress, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/get")
    public List<Address> getCity(@RequestParam String location) {
        return addressService.getCity(location);
    }
}
