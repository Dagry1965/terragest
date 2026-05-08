"use client";

import type { ReactNode } from "react";
import { Component } from "react";
import { RuntimeErrorReporter } from "@/runtime/production";
import { ERPButton } from "@/components/erp/ui";

interface ERPErrorBoundaryProps {
  children: ReactNode;
}

interface ERPErrorBoundaryState {
  hasError: boolean;
  message?: string;
}

export class ERPErrorBoundary extends Component<
  ERPErrorBoundaryProps,
  ERPErrorBoundaryState
> {
  state: ERPErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(error: Error): ERPErrorBoundaryState {
    return {
      hasError: true,
      message: error.message,
    };
  }

  componentDidCatch(error: Error) {
    RuntimeErrorReporter.capture(error, "ui-error-boundary");
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="rounded-3xl border border-red-200 bg-red-50 p-8 shadow-sm">
          <h1 className="text-2xl font-black text-red-950">
            Une erreur est survenue
          </h1>

          <p className="mt-3 text-sm text-red-700">
            Le runtime ERP a intercepte une erreur afin de proteger l'interface.
          </p>

          {this.state.message && (
            <p className="mt-4 rounded-2xl bg-white p-4 text-sm font-medium text-red-700">
              {this.state.message}
            </p>
          )}

          <div className="mt-6">
            <ERPButton
              type="button"
              onClick={() => {
                this.setState({
                  hasError: false,
                  message: undefined,
                });
              }}
            >
              Reessayer
            </ERPButton>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}