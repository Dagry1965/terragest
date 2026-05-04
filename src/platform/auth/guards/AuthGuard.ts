// src/platform/auth/guards/AuthGuard.ts

import { SessionStore }
from "@/platform/auth/session/SessionStore";

export class AuthGuard {

  static check() {

    return SessionStore
      .isAuthenticated();
  }
}
