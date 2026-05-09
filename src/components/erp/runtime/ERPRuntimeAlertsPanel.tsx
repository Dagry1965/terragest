"use client";

import {
  ERPBadge,
  ERPPanel,
  ERPStack,
} from "../ui";

interface ERPRuntimeAlert {

  id: string;

  title: string;

  level:
    | "info"
    | "warning"
    | "danger";
}

interface ERPRuntimeAlertsPanelProps {

  alerts:
    ERPRuntimeAlert[];
}

export function ERPRuntimeAlertsPanel({
  alerts,
}: ERPRuntimeAlertsPanelProps) {

  return (

    <ERPPanel
      title="Runtime Alerts"
      description="Alertes et supervision du runtime."
    >

      <ERPStack gap="12px">

        {
          alerts.map(
            alert => (

              <div
                key={alert.id}
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",

                  alignItems: "center",

                  padding: "12px",

                  borderRadius: "12px",

                  background:
                    "rgba(255,255,255,0.03)",
                }}
              >

                <div>
                  {alert.title}
                </div>

                <ERPBadge
                  tone={alert.level}
                >
                  {alert.level}
                </ERPBadge>

              </div>
            )
          )
        }

      </ERPStack>

    </ERPPanel>
  );
}