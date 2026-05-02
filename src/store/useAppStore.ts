import { create }
from "zustand";

interface AppStore {

  loading: boolean;

  setLoading:
    (
      loading: boolean
    ) => void;
}

export const useAppStore =
create<AppStore>(
  (set) => ({

    loading: false,

    setLoading:
      (
        loading
      ) =>

        set({
          loading,
        }),
  })
);
