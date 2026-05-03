import "./globals.css";

import type { Metadata } from "next";

import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
  title: "Terragest",
  description: "ERP Agricole SaaS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}