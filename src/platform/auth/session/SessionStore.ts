// src/platform/auth/session/SessionStore.ts

export interface UserSession {

  userId: string;

  email: string;

  role: string;

  tenant: string;
}

class SessionStoreManager {

  private session?:
    UserSession;

  setSession(
    session: UserSession
  ) {

    this.session =
      session;
  }

  getSession() {

    return this.session;
  }

  clear() {

    this.session =
      undefined;
  }

  isAuthenticated() {

    return !!this.session;
  }
}

export const SessionStore =
  new SessionStoreManager();
