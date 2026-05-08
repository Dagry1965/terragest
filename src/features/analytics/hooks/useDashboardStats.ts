"use client";

import {
  useEffect,
  useState
} from "react";

import {
  collection,
  onSnapshot
} from "firebase/firestore";

import { db }
from "@/lib/firebase/config";

export function
useTableau de bordStats() {

  const [stats, setStats] =
    useState({

      produits: 0,

      exploitations: 0,

      interventions: 0,

      materiels: 0,

      mouvements: 0,
    });

  useEffect(() => {

    const unsubscribers = [

      onSnapshot(

        collection(
          db,
          "produits"
        ),

        (snapshot) => {

          setStats(
            (prev) => ({

              ...prev,

              produits:
                snapshot.size,
            })
          );
        }
      ),

      onSnapshot(

        collection(
          db,
          "exploitations"
        ),

        (snapshot) => {

          setStats(
            (prev) => ({

              ...prev,

              exploitations:
                snapshot.size,
            })
          );
        }
      ),

      onSnapshot(

        collection(
          db,
          "interventions"
        ),

        (snapshot) => {

          setStats(
            (prev) => ({

              ...prev,

              interventions:
                snapshot.size,
            })
          );
        }
      ),

      onSnapshot(

        collection(
          db,
          "materiels"
        ),

        (snapshot) => {

          setStats(
            (prev) => ({

              ...prev,

              materiels:
                snapshot.size,
            })
          );
        }
      ),

      onSnapshot(

        collection(
          db,
          "mouvements_stock"
        ),

        (snapshot) => {

          setStats(
            (prev) => ({

              ...prev,

              mouvements:
                snapshot.size,
            })
          );
        }
      ),
    ];

    return () => {

      unsubscribers.forEach(
        (unsubscribe) =>
          unsubscribe()
      );
    };

  }, []);

  return stats;
}