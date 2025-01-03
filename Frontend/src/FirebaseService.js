import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "./FirebaseConfig";

export const uploadFileToFirebase = async (file) => {
  const fileName = `${Date.now()}_${file.name}`;
  const storageRef = ref(storage, fileName);

  return new Promise((resolve, reject) => {
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Optional: Log progress
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.error("File upload error:", error);
        reject(error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("File uploaded successfully, URL:", downloadURL);
          resolve(downloadURL);
        } catch (error) {
          console.error("Error getting download URL:", error);
          reject(error);
        }
      }
    );
  });
};
