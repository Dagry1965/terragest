"use client";

import {
  Notification,
} from "@/features/notifications/types/Notification";

import { useNotifications }
from "@/features/notifications/hooks/useNotifications";

type Props = {

  notifications?: Notification[];
};

export const NotificationCenter = ({
  notifications: externalNotifications,
}: Props) => {

  const {
    notifications:
      internalNotifications,
  } = useNotifications();

  const notifications =
    externalNotifications
    || internalNotifications;

  return (
    <div
      className="
        bg-white
        border
        rounded-2xl
        overflow-hidden
      "
    >
      <div
        className="
          p-6
          border-b
        "
      >
        <h2
          className="
            text-xl
            font-semibold
          "
        >
          Notifications
        </h2>
      </div>

      <div
        className="
          divide-y
        "
      >
        {notifications.map(
          (notification) => (

          <div
            key={notification.id}
            className="
              p-4
            "
          >
            <div
              className="
                flex
                items-start
                justify-between
                gap-4
              "
            >
              <div>

                <h3
                  className="
                    font-medium
                  "
                >
                  {
                    notification.title
                  }
                </h3>

                <p
                  className="
                    text-sm
                    text-gray-600
                    mt-1
                  "
                >
                  {
                    notification.message
                  }
                </p>
              </div>

              <span
                className={`
                  text-xs
                  px-2
                  py-1
                  rounded-full
                  ${
                    notification.severity ===
                    "success"
                      ? "bg-green-100 text-green-700"
                    : notification.severity ===
                      "warning"
                      ? "bg-yellow-100 text-yellow-700"
                    : notification.severity ===
                      "error"
                      ? "bg-red-100 text-red-700"
                      : "bg-blue-100 text-blue-700"
                  }
                `}
              >
                {
                  notification.severity
                }
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};