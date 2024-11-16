package com.pet.Pet.Service;

import com.google.cloud.storage.Acl;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;
import com.google.firebase.FirebaseApp;
import com.google.firebase.cloud.StorageClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class FirebaseService {
    @Autowired
    private FirebaseApp firebaseApp;

    String bucketName = "pets-b98b3.appspot.com";

    public String uploadFile(MultipartFile file) throws IOException {

        StorageClient storage = StorageClient.getInstance(firebaseApp);
        Bucket bucket = storage.bucket(bucketName);

        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

        Blob blob = bucket.create(fileName,file.getInputStream(),file.getContentType());

        blob.createAcl(Acl.of(Acl.User.ofAllUsers(), Acl.Role.READER));

        return blob.getMediaLink();
    }

    public List<String> uploadFiles(List<MultipartFile> multipartFiles) throws IOException {
        List<String> urls = new ArrayList<String>();
        for (MultipartFile file : multipartFiles) {
            urls.add(uploadFile(file));
        }
        return urls;
    }
}
