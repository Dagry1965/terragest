"use client";

import {
  useEffect,
  useState,
} from "react";

import { BaseRepository }
from "@/lib/firestore/BaseRepository";

export function useCollection<T>(
  collectionName: string
) {

  const [data, setData] =
    useState<T[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const repository =
      new BaseRepository<T>(
        collectionName
      );

    const unsubscribe =
      repository.subscribe(
        (items) => {

          setData(items);

          setLoading(false);
        }
      );

    return () => unsubscribe();

  }, [collectionName]);

  return {
    data,
    loading,
  };
}