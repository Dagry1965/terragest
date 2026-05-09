"use client";

import type {
  PropsWithChildren,
} from "react";

import {
  ERPTheme,
} from "./ERPTheme";

interface ERPDrawerProps
  extends PropsWithChildren {

  open: boolean;

  title?: string;

  side?:
    | "left"
    | "right";

  onClose?: () => void;
}

export function ERPDrawer({
  open,
  title,
  side = "right",
  onClose,
  children,
}: ERPDrawerProps) {

  if (!open) {

    return null;
  }

  return (

    <div
      style={{
        position: "fixed",
        inset: 0,
        background:
          "rgba(0,0,0,0.5)",

        zIndex: 1000,
      }}
    >

      <div
        style={{
          position: "absolute",

          top: 0,

          bottom: 0,

          [side]: 0,

          width: "420px",

          background:
            ERPTheme.colors.surface,

          color:
            ERPTheme.colors.text,

          padding:
            ERPTheme.spacing.xl,

          boxShadow:
            ERPTheme.shadows.lg,

          overflowY: "auto",
        }}
      >

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",

            marginBottom:
              ERPTheme.spacing.lg,
          }}
        >

          <h2
            style={{
              fontSize: "20px",
              fontWeight: 700,
            }}
          >
            {title}
          </h2>

          {
            onClose && (

              <button
                onClick={onClose}
                style={{
                  background: "transparent",
                  border: "none",
                  color:
                    ERPTheme.colors.text,

                  cursor: "pointer",

                  fontSize: "18px",
                }}
              >
                ✕
              </button>
            )
          }

        </div>

        {children}

      </div>

    </div>
  );
}