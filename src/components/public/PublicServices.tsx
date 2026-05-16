"use client";

import {
  ERPCard,
  ERPSection,
} from "@/components/erp/ui";

const services = [
  "Vidange rapide",
  "Diagnostic moteur",
  "Entretien flotte",
  "Préparation visite technique",
  "Lavage auto",
  "Parallélisme",
  "Équilibrage",
  "Plaquettes",
];

export function PublicServices() {
  return (
    <ERPSection
      title="Nos services"
      description="Des interventions rapides, fiables et suivies."
    >
      <div className="grid gap-6 md:grid-cols-4">
        {services.map((service) => (
          <ERPCard
            key={service}
            title={service}
          >
            Service professionnel.
          </ERPCard>
        ))}
      </div>
    </ERPSection>
  );
}