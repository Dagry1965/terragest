// src/platform/auth/AuthService.ts

import {
  SessionStore
}
from "@/platform/auth/session/SessionStore";

export class AuthService {

  static login(

    email: string,

    password: string
  ) {

    console.log(
      "[LOGIN]",
      email
    );

    SessionStore.setSession({

      userId:
        crypto.randomUUID(),

      email,

      role:
        "admin",

      tenant:
        "default"
    });

    return true;
  }

  static logout() {

    SessionStore.clear();

    console.log(
      "[LOGOUT]"
    );
  }

  static session() {

    return SessionStore
      .getSession();
  }
}
