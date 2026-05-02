"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  FirestoreRealtimeService,
} from "@/lib/firestore/services/FirestoreRealtimeService";

export const useRealtimeProducts =
() => {

  const [products,
    setProducts] =
    useState<any[]>([]);

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {

    const unsubscribe =
      FirestoreRealtimeService.subscribe(

        "products",

        (
          data: any[]
        ) => {

          setProducts(
            data
          );

          setLoading(
            false
          );
        }
      );

    return () =>
      unsubscribe();

  }, []);

  return {

    products,

    loading,
  };
}
