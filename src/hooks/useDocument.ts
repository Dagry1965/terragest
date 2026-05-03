"use client";

import {
  doc,
  onSnapshot,
} from "firebase/firestore";

import {
  useEffect,
  useState,
} from "react";

import { db }
from "@/lib/firebase/config";

export function useDocument<T>(
  collectionName: string,
  id: string
) {

  const [data, setData] =
    useState<T | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    if (!id) {

      return;
    }

    const unsubscribe =
      onSnapshot(
        doc(
          db,
          collectionName,
          id
        ),
        (snapshot) => {

          setData({
            id: snapshot.id,
            ...snapshot.data(),
          } as T);

          setLoading(false);
        }
      );

    return () => unsubscribe();

  }, [collectionName, id]);

  return {
    data,
    loading,
  };
}