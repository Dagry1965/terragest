"use client";

import Link
from "next/link";

import {
  ERPGrid,
  ERPButton,
  ERPPanel,
} from "../ui";

interface ERPDashboardQuickAction {

  label: string;

  href: string;
}

interface ERPDashboardQuickActionsProps {

  actions:
    ERPDashboardQuickAction[];
}

export function ERPDashboardQuickActions({
  actions,
}: ERPDashboardQuickActionsProps) {

  return (

    <ERPPanel
      title="Actions rapides"
      description="Accès rapide aux opérations ERP."
    >

      <ERPGrid
        columns={3}
        gap="12px"
      >

        {
          actions.map(
            action => (

              <Link
                key={action.href}
                href={action.href}
              >

                <ERPButton
                  style={{
                    width: "100%",
                  }}
                >
                  {action.label}
                </ERPButton>

              </Link>
            )
          )
        }

      </ERPGrid>

    </ERPPanel>
  );
}