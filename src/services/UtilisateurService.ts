import {
  doc,
  getDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase/firebase";

import { Utilisateur } from "@/types/utilisateur";

const COLLECTION_NAME = "utilisateurs";

export const UtilisateurService = {

  async getById(id: string) {

    const ref = doc(
      db,
      COLLECTION_NAME,
      id
    );

    const snapshot = await getDoc(ref);

    if (!snapshot.exists()) {
      return null;
    }

    return {
      id: snapshot.id,
      ...snapshot.data(),
    } as Utilisateur;
  },
};
