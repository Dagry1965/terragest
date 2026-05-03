import "./globals.css";

import { ReactNode }
from "react";

import { AuthProvider }
from "@/contexts/AuthContext";

import { TenantProvider }
from "@/features/tenancy/context/TenantProvider";

type Props = {

  children: ReactNode;
};

export default function RootLayout({
  children,
}: Props) {

  return (
    <html lang="fr">

      <body>

        <AuthProvider>

          <TenantProvider>

            {children}

          </TenantProvider>

        </AuthProvider>

      </body>

    </html>
  );
}