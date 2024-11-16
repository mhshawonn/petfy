package com.pet.Pet.Service;

import com.pet.Pet.Model.UserPrincipal;
import com.pet.Pet.Model.Users;
import com.pet.Pet.Repo.UsersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailService implements UserDetailsService {
    @Autowired
    private UsersRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users user = userRepo.findByUsername(username);
        if(user==null){
            throw new UsernameNotFoundException("User not found with this "+username);
        }
        return new UserPrincipal(user);
    }
}
