"use client";

import { useAuditEvents }
from "@/features/observability/hooks/useAuditEvents";

export const AuditTable =
() => {

  const { events } =
    useAuditEvents();

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
          Audit Trail
        </h2>
      </div>

      <table className="w-full">

        <thead
          className="
            bg-gray-50
          "
        >
          <tr>

            <th className="p-4 text-left">
              Action
            </th>

            <th className="p-4 text-left">
              EntitÃ©
            </th>

            <th className="p-4 text-left">
              SÃ©vÃ©ritÃ©
            </th>

            <th className="p-4 text-left">
              Date
            </th>

          </tr>
        </thead>

        <tbody>

          {events.map(
            (event) => (

            <tr
              key={event.id}
              className="
                border-t
              "
            >
              <td className="p-4">
                {event.action}
              </td>

              <td className="p-4">
                {event.entity}
              </td>

              <td className="p-4">

                <span
                  className={`
                    px-2
                    py-1
                    rounded-full
                    text-xs
                    ${
                      event.severity ===
                      "critical"
                        ? "bg-red-100 text-red-700"
                      : event.severity ===
                        "warning"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-100 text-blue-700"
                    }
                  `}
                >
                  {event.severity}
                </span>

              </td>

              <td className="p-4">
                {
                  new Date(
                    event.createdAt
                  ).toLocaleString()
                }
              </td>

            </tr>
          ))}

        </tbody>
      </table>
    </div>
  );
};