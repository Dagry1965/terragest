"use client";

import type {
  PropsWithChildren,
} from "react";

import {
  ERPTheme,
} from "./ERPTheme";

interface ERPModalProps
  extends PropsWithChildren {

  open: boolean;

  title?: string;

  onClose?: () => void;
}

export function ERPModal({
  open,
  title,
  onClose,
  children,
}: ERPModalProps) {

  if (!open) {

    return null;
  }

  return (

    <div
      style={{
        position: "fixed",
        inset: 0,
        background:
          "rgba(0,0,0,0.6)",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        zIndex: 1000,
      }}
    >

      <div
        style={{
          width: "100%",
          maxWidth: "720px",

          background:
            ERPTheme.colors.surface,

          borderRadius:
            ERPTheme.radius.xl,

          padding:
            ERPTheme.spacing.xl,

          color:
            ERPTheme.colors.text,

          boxShadow:
            ERPTheme.shadows.lg,
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
              fontSize: "22px",
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