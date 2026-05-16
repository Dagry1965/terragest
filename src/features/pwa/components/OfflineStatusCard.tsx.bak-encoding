"use client";

import {
  useEffect,
  useState,
} from "react";

export const OfflineStatusCard =
() => {

  const [
    online,
    setOnline,
  ] = useState(true);

  useEffect(() => {

    function updateStatus() {

      setOnline(
        navigator.onLine
      );
    }

    updateStatus();

    window.addEventListener(
      "online",
      updateStatus
    );

    window.addEventListener(
      "offline",
      updateStatus
    );

    return () => {

      window.removeEventListener(
        "online",
        updateStatus
      );

      window.removeEventListener(
        "offline",
        updateStatus
      );
    };

  }, []);

  return (
    <div
      className="
        bg-white
        border
        rounded-2xl
        p-6
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
        "
      >
        <div>

          <h2
            className="
              text-xl
              font-semibold
            "
          >
            Statut rÃ©seau
          </h2>

          <p
            className="
              text-gray-500
              mt-1
            "
          >
            Synchronisation offline
          </p>
        </div>

        <div
          className={`
            px-4
            py-2
            rounded-full
            text-sm
            font-medium
            ${
              online
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }
          `}
        >
          {
            online
              ? "En ligne"
              : "Hors ligne"
          }
        </div>
      </div>
    </div>
  );
};