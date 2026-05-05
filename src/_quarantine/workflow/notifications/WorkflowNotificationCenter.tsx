"use client";

import {
  useEffect,
  useState,
} from "react";

export const WorkflowNotificationCenter =
() => {

  const [notifications,
    setNotifications] =
    useState<any[]>([]);

  useEffect(() => {

    const interval =
      setInterval(() => {

        setNotifications(
          [
            {
              id: 1,

              title:
                "Workflow actif",

              message:
                "Automation exécutée",
            },
          ]
        );

      }, 5000);

    return () =>
      clearInterval(
        interval
      );

  }, []);

  return (

    <div className="
      fixed
      top-6
      right-6
      w-96
      space-y-4
      z-50
    ">

      {notifications.map(
        (notification) => (

          <div
            key={notification.id}
            className="
              bg-white
              rounded-2xl
              shadow-lg
              p-4
            "
          >

            <h2 className="
              font-bold
            ">

              {notification.title}

            </h2>

            <p className="
              text-sm
              text-gray-500
              mt-1
            ">

              {notification.message}

            </p>

          </div>

        )
      )}

    </div>
  );
}
