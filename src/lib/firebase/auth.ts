import {
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "./firebase";

export const login = async (
  email: string,
  password: string
) => {
  if (!auth) {

  throw new Error(
    "Firebase auth unavailable"
  );
}

return signInWithEmailAndPassword(auth, email, password);
};

export const logout = async () => {
  if (!auth) {

  throw new Error(
    "Firebase auth unavailable"
  );
}

return signOut(auth);
};

