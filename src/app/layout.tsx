import "./globals.css";

import {
  RuntimeBootstrapProvider,
} from "@/components/bootstrap/RuntimeBootstrapProvider";

import {
  AuthProvider,
} from "@/providers/AuthProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <RuntimeBootstrapProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </RuntimeBootstrapProvider>
      </body>
    </html>
  );
}