import {
  User,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import {
  auth,
} from "@/lib/firebase";

type AuthListener = (
  user: User | null
) => void;

let currentUser:
  User | null = null;

const listeners:
  AuthListener[] = [];

onAuthStateChanged(
  auth,
  (user) => {
    currentUser = user;

    for (const listener of listeners) {
      listener(user);
    }

    console.log(
      "ERP AUTH STATE CHANGED",
      user?.email
    );
  }
);

export function getCurrentUser() {
  return currentUser;
}

export function subscribeAuth(
  listener: AuthListener
) {
  listeners.push(listener);

  listener(currentUser);

  return () => {
    const index =
      listeners.indexOf(
        listener
      );

    if (index >= 0) {
      listeners.splice(
        index,
        1
      );
    }
  };
}

export async function logout() {
  await signOut(auth);
}
