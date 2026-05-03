"use client";

import {
  useEffect,
  useState,
} from "react";

export const PWAInstallButton =
() => {

  const [
    deferredPrompt,
    setDeferredPrompt,
  ] = useState<any>(null);

  useEffect(() => {

    function handler(e: any) {

      e.preventDefault();

      setDeferredPrompt(e);
    }

    window.addEventListener(
      "beforeinstallprompt",
      handler
    );

    return () => {

      window.removeEventListener(
        "beforeinstallprompt",
        handler
      );
    };

  }, []);

  async function handleInstall() {

    if (!deferredPrompt) {

      return;
    }

    deferredPrompt.prompt();

    await deferredPrompt.userChoice;

    setDeferredPrompt(null);
  }

  if (!deferredPrompt) {

    return null;
  }

  return (
    <button
      onClick={handleInstall}
      className="
        bg-black
        text-white
        px-4
        py-3
        rounded-xl
      "
    >
      Installer application
    </button>
  );
};