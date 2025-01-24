package com.pet.Pet.Component;

import com.pet.Pet.Service.FirebaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Component
public class MediaLinkFactory {
    @Autowired
    private FirebaseService firebaseService;
    public List<String> uploadFirebase(List<MultipartFile> files){
        List<String> mediaUrls;
        try {
            mediaUrls = firebaseService.uploadFiles(files);
        } catch (Exception e) {
            mediaUrls = null;
        }
        return mediaUrls;
    }
}
