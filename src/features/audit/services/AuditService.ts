import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase/firebase";

export const AuditService = {

  async log(data: any) {

    return addDoc(
      collection(db, "audit_logs"),
      data
    );
  },

  async getLatestByOrganisation(
    organisationId: string
  ) {

    const q = query(
      collection(db, "audit_logs"),

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
};
