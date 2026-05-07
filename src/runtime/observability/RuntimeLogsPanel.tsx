"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  collection,
  onSnapshot,
  orderBy,
  query,
}
from "firebase/firestore";

import { db }
from "@/infrastructure/firebase/firebase";

import {
  formatDisplayValue,
}
from "@/core/utils/formatFirestoreDate";

export function RuntimeLogsPanel() {

  const [
    logs,
    setLogs,
  ] = useState<any[]>([]);

  useEffect(() => {

    const q =
      query(

        collection(
          db,
          "runtime_logs"
        ),

        orderBy(
          "createdAt",
          "desc"
        )
      );

    const unsubscribe =
      onSnapshot(

        q,

        (snapshot) => {

          setLogs(

            snapshot.docs.map(
              (doc) => ({

                id: doc.id,

                ...doc.data(),
              })
            )
          );
        }
      );

    return () =>
      unsubscribe();

  }, []);

  return (

    <div
      className="
        rounded-2xl
        bg-white
        p-6
        shadow-md
      "
    >

      <h2
        className="
          mb-4
          text-xl
          font-semibold
        "
      >
        Runtime Logs
      </h2>

      <div
        className="
          space-y-3
        "
      >

        {logs.length === 0 && (

          <p className="text-gray-500">
            Aucun log runtime.
          </p>
        )}

        {logs.map(
          (item) => (

          <div
            key={item.id}

            className="
              rounded-xl
              border
              p-4
            "
          >

            <div
              className="
                flex
                items-center
                justify-between
              "
            >

              <h3
                className="
                  font-semibold
                "
              >
                {item.type}
              </h3>

              <span
                className="
                  text-xs
                  text-gray-500
                "
              >
                {
                  formatDisplayValue(
                    item.createdAt
                  )
                }
              </span>

            </div>

            <p
              className="
                mt-2
                text-sm
                text-gray-600
              "
            >
              {item.message}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}
