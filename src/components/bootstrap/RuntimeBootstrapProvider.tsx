// src/components/bootstrap/RuntimeBootstrapProvider.tsx

"use client";

import {
  useEffect,

  useState
}
from "react";

import { RuntimeBootstrap }
from "@/platform/runtime/RuntimeBootstrap";

interface RuntimeBootstrapProviderProps {

  children:
    React.ReactNode;
}

export function RuntimeBootstrapProvider({

  children
}: RuntimeBootstrapProviderProps) {

  const [ready, setReady] =
    useState(false);

  useEffect(() => {

    async function bootstrap() {

      await RuntimeBootstrap
        .initialize();

      setReady(true);
    }

    bootstrap();

  }, []);

  if (!ready) {

    return (

      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
        "
      >
        Chargement runtime ERP...
      </div>
    );
  }

  return children;
}
