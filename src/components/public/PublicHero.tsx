"use client";

import Link from "next/link";

import {
  ERPPageHero,
}
from "@/components/erp/layout/ERPPageHero";

import {
  ERPButton,
}
from "@/components/erp/ui";

export function PublicHero() {

  return (

    <ERPPageHero

      category="Garage • Entretien • Diagnostic"

      title="AMARKHYS"

      description="
      Entretien automobile intelligent.
      Vidange, diagnostic, flotte,
      interventions et suivi véhicules.
      "

      side={

        <div
          style={{
            display:"flex",
            flexDirection:"column",
            gap:"12px"
          }}
        >

          <Link href="/rdv">

            <ERPButton>
              Prendre rendez-vous
            </ERPButton>

          </Link>


          <Link href="/contact">

            <ERPButton
              variant="secondary"
            >

              Demander devis

            </ERPButton>

          </Link>


          <a
            href="
            https://wa.me/
            "

            target="_blank"
          >

            <ERPButton
              variant="ghost"
            >

              WhatsApp

            </ERPButton>

          </a>

        </div>

      }

    />

  );

}