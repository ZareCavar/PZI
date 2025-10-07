import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBik8onTIoNxygcot5X4uY5OwNY-nLAH2Q",
    authDomain: "qr-code-app-becc3.firebaseapp.com",
   projectId: "qr-code-app-becc3",
   storageBucket: "qr-code-app-becc3.firebasestorage.app",
    messagingSenderId: "428456689099",
    appId: "1:428456689099:web:1a40ece37e9cbe29234a4e"
  };

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const db = getFirestore(app);
  export const storage = getStorage(app); 