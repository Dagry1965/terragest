import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { auth }
from "@/lib/firebase/firebase";

export const AuthService = {

  async login(
    email: string,
    password: string
  ) {

    if (!auth) {

  throw new Error(
    "Firebase auth unavailable"
  );
}

return signInWithEmailAndPassword(
      auth,
      email,
      password
    );
  },

  async logout() {

    if (!auth) {

  throw new Error(
    "Firebase auth unavailable"
  );
}

return signOut(auth);
  },

  subscribe(
    callback: any
  ) {

    if (!auth) {

  throw new Error(
    "Firebase auth unavailable"
  );
}

return onAuthStateChanged(
      auth,
      callback
    );
  },
};

