import { create }
from "zustand";

interface SessionStore {

  token?: string;

  setToken:
    (
      token: string
    ) => void;
}

export const useSessionStore =
create<SessionStore>(
  (set) => ({

    token: undefined,

    setToken:
      (
        token
      ) =>

        set({
          token,
        }),
  })
);
