import "./globals.css";

export const metadata = {
  title: "AMARKHYS — Garage premium digitalisé",
  description:
    "AMARKHYS est un garage automobile premium pour diagnostic, vidange, entretien, suivi atelier et rendez-vous digital.",
  keywords: [
    "AMARKHYS",
    "garage premium",
    "garage automobile",
    "vidange",
    "diagnostic automobile",
    "entretien véhicule",
    "PETRONAS",
  ],
};

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