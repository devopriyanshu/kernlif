import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAuouwOxIaga1aTT4pcKhDbngzoR-p32SE",
  authDomain: "wellenest.firebaseapp.com",
  projectId: "wellenest",
  storageBucket: "wellenest.firebasestorage.app",
  messagingSenderId: "536113739241",
  appId: "1:536113739241:web:49f5e7615a0205a040c778",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
