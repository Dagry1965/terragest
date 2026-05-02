Write-Host "Generating Enterprise Toast System..." -ForegroundColor Cyan

# =====================================================
# ROOT
# =====================================================

$ROOT =
"C:\Users\Admin\terragest"

Set-Location $ROOT

# =====================================================
# DIRECTORIES
# =====================================================

mkdir "src\components\toast" -Force
mkdir "src\providers" -Force
mkdir "src\hooks" -Force

# =====================================================
# TOAST PROVIDER
# =====================================================

$provider = @'
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
'@

Set-Content `
"$ROOT\src\providers\ToastProvider.tsx" `
$provider

# =====================================================
# ROOT PROVIDERS UPDATE
# =====================================================

$rootProviders = @'
"use client";

import {
  ToastProvider,
} from "@/providers/ToastProvider";

export const RootProviders = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  return (

    <ToastProvider>

      {children}

    </ToastProvider>
  );
}
'@

Set-Content `
"$ROOT\src\providers\RootProviders.tsx" `
$rootProviders

# =====================================================
# TOAST HOOK EXPORT
# =====================================================

$hook = @'
export {
  useToast,
} from "@/providers/ToastProvider";
'@

Set-Content `
"$ROOT\src\hooks\useToast.ts" `
$hook

# =====================================================
# UPDATED FORM
# =====================================================

$form = @'
"use client";

import {
  useForm,
} from "react-hook-form";

import {
  zodResolver,
} from "@hookform/resolvers/zod";

import {
  ExploitationSchema,
  ExploitationInput,
} from "@/features/exploitations/schemas/ExploitationSchema";

import {
  ExploitationsService,
} from "@/features/exploitations/services/ExploitationsService";

import {
  useToast,
} from "@/hooks/useToast";

export const ExploitationForm =
() => {

  const {
    showSuccess,
    showError,
  } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<ExploitationInput>({

    resolver:
      zodResolver(
        ExploitationSchema
      ),

    defaultValues: {

      tenantId:
        "tenant-demo",

      statut:
        "ACTIVE",
    },
  });

  const onSubmit =
    async (
      values:
        ExploitationInput
    ) => {

      try {

        await ExploitationsService.create(
          values
        );

        showSuccess(
          "Exploitation créée avec succès."
        );

        reset();

      } catch {

        showError(
          "Erreur lors de la création."
        );
      }
    };

  return (

    <form
      onSubmit={handleSubmit(onSubmit)}
      className="
        bg-white
        rounded-2xl
        shadow-md
        p-8
        space-y-6
      "
    >

      <div>

        <h2 className="
          text-3xl
          font-bold
        ">

          Nouvelle exploitation

        </h2>

      </div>

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-6
      ">

        <div>

          <input
            placeholder="Nom"
            {...register("nom")}
            className="
              w-full
              border
              rounded-xl
              px-4
              py-3
            "
          />

          {errors.nom && (

            <p className="
              text-red-500
              text-sm
              mt-2
            ">

              {errors.nom.message}

            </p>

          )}

        </div>

      </div>

      <button
        disabled={isSubmitting}
        className="
          bg-black
          text-white
          px-6
          py-3
          rounded-xl
        "
      >

        {isSubmitting
          ? "Création..."
          : "Créer"}

      </button>

    </form>
  );
}
'@

Set-Content `
"$ROOT\src\features\exploitations\components\ExploitationForm.tsx" `
$form

# =====================================================
# DOCUMENTATION
# =====================================================

$doc = @'
# Enterprise Toast System

## Features

- Global toast provider
- Success notifications
- Error notifications
- Enterprise feedback UX

--------------------------------------------------

## Architecture

- ToastProvider
- useToast hook
- Global notifications

--------------------------------------------------

## Status

Phase 5 complete.
Ready for pagination & advanced UX.
'@

Set-Content `
"$ROOT\docs\ENTERPRISE_TOAST_SYSTEM.md" `
$doc

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Enterprise Toast System generated successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Generated:" -ForegroundColor Yellow
Write-Host "- Toast provider"
Write-Host "- useToast hook"
Write-Host "- Enterprise notifications"
Write-Host "- CRUD feedback UX"
Write-Host ""