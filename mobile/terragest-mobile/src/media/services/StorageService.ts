import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

import { app } from "@/services/firebase";

const storage =
  getStorage(app);

export const StorageService = {

  async uploadImage(
    uri: string,
    path: string
  ) {

    const response =
      await fetch(uri);

    const blob =
      await response.blob();

    const storageRef =
      ref(
        storage,
        path
      );

    await uploadBytes(
      storageRef,
      blob
    );

    return getDownloadURL(
      storageRef
    );
  },
};
