import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Replace these with your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAbv-xoiX05TeOq_HH0aWQ78OIpAr-0SY",
  authDomain: "pets-20aa4.firebaseapp.com",
  projectId: "pets-20aa4",
  storageBucket: "pets-20aa4.appspot.com",
  messagingSenderId: "792126685108",
  appId: "1:792126685108:web:98133a54bb6fb3e7bbbce1",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;
