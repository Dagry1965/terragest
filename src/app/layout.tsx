// src/app/layout.tsx

import "./globals.css";

import {
  RuntimeBootstrapProvider
}
from "@/components/bootstrap/RuntimeBootstrapProvider";

export default function RootLayout({

  children
}: {

  children:
    React.ReactNode;
}) {

  return (

    <html lang="fr">

      <body>

        <RuntimeBootstrapProvider>

          {children}

        </RuntimeBootstrapProvider>

      </body>

    </html>
  );
}
