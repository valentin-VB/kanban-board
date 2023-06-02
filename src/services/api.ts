import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase";

export function signUp(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function logIn(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function handleLogOut() {
  return signOut(auth);
}
