import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "VENDOS_API_KEY_KETU",
  authDomain: "VENDOS_AUTH_DOMAIN_KETU",
  projectId: "VENDOS_PROJECT_ID_KETU",
  storageBucket: "VENDOS_STORAGE_BUCKET_KETU",
  messagingSenderId: "VENDOS_SENDER_ID",
  appId: "VENDOS_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
