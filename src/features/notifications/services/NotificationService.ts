import {
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase/firebase";

export const NotificationService = {

  async create(data: any) {

    return addDoc(
      collection(
        db,
        "notifications"
      ),
      data
    );
  },

  async getLatestByOrganisation(
    organisationId: string
  ) {

    const q = query(
      collection(
        db,
        "notifications"
      ),

      where(
        "organisationId",
        "==",
        organisationId
      ),

      orderBy(
        "createdAt",
        "desc"
      ),

      limit(20)
    );

    const snapshot =
      await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },

  async markAsRead(id: string) {

    return updateDoc(
      doc(
        db,
        "notifications",
        id
      ),
      {
        lu: true,
      }
    );
  },
};
