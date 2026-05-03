"use client";

import {

  signInWithEmailAndPassword,

  signOut,

  onAuthStateChanged

} from "firebase/auth";

import {

  auth

} from "@/lib/firebase/config";

export const
AuthService = {

  async login(

    email: string,

    password: string

  ) {

    return signInWithEmailAndPassword(

      auth,

      email,

      password
    );
  },

  async logout() {

    return signOut(auth);
  },

  subscribe(
    callback: any
  ) {

    return onAuthStateChanged(
      auth,
      callback
    );
  },
};