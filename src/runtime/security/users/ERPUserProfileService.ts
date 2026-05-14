import {
  doc,
  getDoc,
} from "firebase/firestore";

import {
  db,
} from "@/lib/firebase/config";

import type {
  ERPUserProfile,
} from "./ERPUserProfile";

export class ERPUserProfileService {

  static async getProfile(
    userId: string
  ): Promise<ERPUserProfile | null> {

    const reference =
      doc(
        db,
        "utilisateurs",
        userId
      );

    const snapshot =
      await getDoc(
        reference
      );

    if (
      !snapshot.exists()
    ) {

      return null;
    }

    const data =
      snapshot.data();

    return {

      id:
        snapshot.id,

      email:
        data.email ?? "",

      displayName:
        data.displayName,

      role:
        data.role ?? "user",

      tenant:
        data.tenant ?? "default",

      permissions:
        data.permissions ?? [],

      workspaces:
        data.workspaces ?? [],

      modules:
        data.modules ?? [],
    };
  }
}