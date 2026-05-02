"use client";

import {
  createContext,
  useContext,
  useState,
} from "react";

interface Toast {

  id: number;

  type:
    | "success"
    | "error";

  message: string;
}

interface ToastContextValue {

  showSuccess:
    (
      message: string
    ) => void;

  showError:
    (
      message: string
    ) => void;
}

const ToastContext =
createContext<
  ToastContextValue | null
>(null);

export const ToastProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  const [toasts,
    setToasts] =
    useState<Toast[]>([]);

  const removeToast =
    (
      id: number
    ) => {

      setToasts(
        (
          previous
        ) =>

          previous.filter(
            (
              toast
            ) =>

              toast.id !== id
          )
      );
    };

  const pushToast =
    (
      type:
        | "success"
        | "error",

      message: string
    ) => {

      const id =
        Date.now();

      setToasts(
        (
          previous
        ) => [

          ...previous,

          {
            id,
            type,
            message,
          },
        ]
      );

      setTimeout(
        () => {

          removeToast(id);

        },
        4000
      );
    };

  return (

    <ToastContext.Provider
      value={{

        showSuccess:
          (
            message
          ) =>

            pushToast(
              "success",
              message
            ),

        showError:
          (
            message
          ) =>

            pushToast(
              "error",
              message
            ),
      }}
    >

      {children}

      <div className="
        fixed
        top-6
        right-6
        z-[999]
        flex
        flex-col
        gap-4
      ">

        {toasts.map(
          (
            toast
          ) => (

            <div
              key={toast.id}
              className={`
                min-w-[320px]
                rounded-2xl
                px-6
                py-4
                shadow-2xl
                text-white
                ${
                  toast.type === "success"
                    ? "bg-green-600"
                    : "bg-red-600"
                }
              `}
            >

              {toast.message}

            </div>

          )
        )}

      </div>

    </ToastContext.Provider>
  );
}

export const useToast =
() => {

  const context =
    useContext(
      ToastContext
    );

  if (!context) {

    throw new Error(
      "useToast must be used within ToastProvider"
    );
  }

  return context;
}
