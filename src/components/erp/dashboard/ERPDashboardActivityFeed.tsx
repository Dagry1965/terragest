"use client";

import {
  ERPPanel,
  ERPStack,
  ERPBadge,
} from "../ui";

interface ERPDashboardActivity {

  id: string;

  title: string;

  description?: string;

  status?:
    | "default"
    | "success"
    | "warning"
    | "danger"
    | "info";
}

interface ERPDashboardActivityFeedProps {

  activities:
    ERPDashboardActivity[];
}

export function ERPDashboardActivityFeed({
  activities,
}: ERPDashboardActivityFeedProps) {

  return (

    <ERPPanel
      title="Activité Runtime"
      description="Flux d'activité centralisé du runtime ERP."
    >

      <ERPStack gap="16px">

        {
          activities.map(
            activity => (

              <div
                key={activity.id}
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",

                  alignItems: "flex-start",

                  gap: "16px",

                  paddingBottom: "16px",

                  borderBottom:
                    "1px solid rgba(255,255,255,0.05)",
                }}
              >

                <div>

                  <div
                    style={{
                      fontWeight: 700,
                    }}
                  >
                    {activity.title}
                  </div>

                  {
                    activity.description && (

                      <div
                        style={{
                          marginTop: "4px",
                          opacity: 0.7,
                          fontSize: "14px",
                        }}
                      >
                        {activity.description}
                      </div>
                    )
                  }

                </div>

                <ERPBadge
                  tone={
                    activity.status
                    ?? "default"
                  }
                >
                  ERP
                </ERPBadge>

              </div>
            )
          )
        }

      </ERPStack>

    </ERPPanel>
  );
}