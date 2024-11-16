package com.pet.Pet.Service;

import com.pet.Pet.Model.Address;
import com.pet.Pet.Repo.AddressRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressService {

    @Autowired
    private AddressRepo addressRepo;

    public Address addAddress(Address address) {
        return addressRepo.save(address);
    }

    public List<Address> getCity(String value) {
        return addressRepo.searchAddress(value);
    }
}
