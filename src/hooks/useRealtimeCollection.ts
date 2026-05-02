"use client";

import {
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

import {
  useEffect,
  useState,
} from "react";

import { db } from "@/lib/firebase/firebase";

interface RealtimeOptions {

  collectionName: string;

  organisationId?: string;
}

export const useRealtimeCollection = ({
  collectionName,
  organisationId,
}: RealtimeOptions) => {

  const [data, setData] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    let q;

    if (organisationId) {

      q = query(
        collection(
          db,
          collectionName
        ),

        where(
          "organisationId",
          "==",
          organisationId
        )
      );

    } else {

      q = collection(
        db,
        collectionName
      );
    }

    const unsubscribe =
      onSnapshot(
        q,
        (snapshot) => {

          const results =
            snapshot.docs.map(
              (doc) => ({
                id: doc.id,
                ...doc.data(),
              })
            );

          setData(results);

          setLoading(false);
        },

        (error) => {

          console.error(error);

          setLoading(false);
        }
      );

    return () => unsubscribe();

  }, [
    collectionName,
    organisationId,
  ]);

  return {
    data,
    loading,
  };
}
