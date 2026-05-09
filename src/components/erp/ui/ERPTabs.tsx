"use client";

import {
  ERPTheme,
} from "./ERPTheme";

interface ERPTab {

  id: string;

  label: string;
}

interface ERPTabsProps {

  tabs: ERPTab[];

  activeTab: string;

  onChange: (
    tabId: string
  ) => void;
}

export function ERPTabs({
  tabs,
  activeTab,
  onChange,
}: ERPTabsProps) {

  return (

    <div
      style={{
        display: "flex",
        gap:
          ERPTheme.spacing.sm,

        marginBottom:
          ERPTheme.spacing.lg,
      }}
    >

      {
        tabs.map(
          tab => {

            const active =
              tab.id === activeTab;

            return (

              <button
                key={tab.id}
                onClick={() =>
                  onChange(tab.id)
                }
                style={{
                  border: "none",

                  cursor: "pointer",

                  padding:
                    `${ERPTheme.spacing.sm} ${ERPTheme.spacing.md}`,

                  borderRadius:
                    ERPTheme.radius.md,

                  background:
                    active
                      ? ERPTheme.colors.primary
                      : ERPTheme.colors.card,

                  color:
                    ERPTheme.colors.text,

                  fontWeight:
                    active
                      ? 700
                      : 500,
                }}
              >
                {tab.label}
              </button>
            );
          }
        )
      }

    </div>
  );
}