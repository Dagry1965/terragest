import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import type { ERPModule } from "@/runtime/modules";
import type { RuntimeRecord } from "@/runtime/data-binding";

import { runtimeFirestore } from "@/runtime/firebase/runtime-firestore";

export class FirestoreRuntimeRepository {
  static async findMany(
    module: ERPModule
  ): Promise<RuntimeRecord[]> {
    const snapshot = await getDocs(
      collection(runtimeFirestore, module.schema.collection)
    );

    return snapshot.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    }));
  }

  static async findById(
    module: ERPModule,
    id: string
  ): Promise<RuntimeRecord | null> {
    const snapshot = await getDoc(
      doc(runtimeFirestore, module.schema.collection, id)
    );

    if (!snapshot.exists()) {
      return null;
    }

    return {
      id: snapshot.id,
      ...snapshot.data(),
    };
  }

  static async create(
    module: ERPModule,
    data: Record<string, unknown>
  ) {
    const result = await addDoc(
      collection(runtimeFirestore, module.schema.collection),
      {
        ...data,
        createdAt: Date.now(),
      }
    );

    return {
      id: result.id,
      ...data,
    };
  }

  static async update(
    module: ERPModule,
    id: string,
    data: Record<string, unknown>
  ) {
    await updateDoc(
      doc(runtimeFirestore, module.schema.collection, id),
      {
        ...data,
        updatedAt: Date.now(),
      }
    );

    return {
      id,
      ...data,
    };
  }

  static async delete(
    module: ERPModule,
    id: string
  ) {
    await deleteDoc(
      doc(runtimeFirestore, module.schema.collection, id)
    );

    return {
      success: true,
    };
  }
}
