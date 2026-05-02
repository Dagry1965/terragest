"use client";

import { NotificationBadge } from "@/features/notifications/components/NotificationBadge";

interface NotificationCenterProps {

  notifications: any[];
}

export const NotificationCenter = ({
  notifications,
}: NotificationCenterProps) => {

  const unread =
    notifications.filter(
      (item) => !item.lu
    );

  return (

    <div className="
      bg-white
      rounded-2xl
      shadow-md
      p-6
    ">

      <div className="
        flex
        items-center
        justify-between
      ">

        <h2 className="text-2xl font-bold">
          Notifications
        </h2>

        <NotificationBadge
          total={unread.length}
        />

      </div>

      <div className="mt-6 space-y-4">

        {notifications.length === 0 && (

          <p className="text-gray-500">
            Aucune notification
          </p>

        )}

        {notifications.map((item) => (

          <div
            key={item.id}
            className={`
              border
              rounded-xl
              p-4

              ${!item.lu
                ? "border-red-300 bg-red-50"
                : "border-gray-200"}
            `}
          >

            <div className="
              flex
              items-center
              justify-between
            ">

              <h3 className="font-bold">
                {item.titre}
              </h3>

              {!item.lu && (

                <span className="
                  text-xs
                  font-bold
                  text-red-600
                ">
                  Nouveau
                </span>

              )}

            </div>

            <p className="text-gray-600 mt-2">
              {item.message}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}
