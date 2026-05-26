import {
  RuntimeDataBinding,
} from "@/runtime/data-binding";

import {
  RuntimeNotificationEngine,
} from "@/runtime/notifications/RuntimeNotificationEngine";

import {
  clientsautoModule,
} from "@/runtime/modules/generated/clientsauto/clientsauto.module";

import {
  vehiculesModule,
} from "@/runtime/modules/generated/vehicules/vehicules.module";

import {
  rendezvousModule,
} from "@/runtime/modules/generated/rendezvous/rendezvous.module";

import {
  rappelsautoModule,
} from "@/runtime/modules/generated/rappelsauto/rappelsauto.module";

type PublicAppointmentInput = {
  nom: string;
  telephone: string;
  vehicule: string;
  immatriculation: string;
  dateSouhaitee?: string;
  heureSouhaitee?: string;
  durationMinutes?: number;
};


type PublicAppointmentResult = {
  ok: true;
  message: string;
};

function buildPublicAppointmentMessage(
  data: PublicAppointmentInput
): string {
  return [
    "Nouveau rendez-vous public AMARKHYS.",
    `Client : ${data.nom}`,
    `Téléphone : ${data.telephone}`,
    `Véhicule : ${data.vehicule}`,
    `Immatriculation : ${data.immatriculation}`,
  ].join("\n");
}

function addDays(
  date: Date,
  days: number
): Date {
  const next = new Date(date);

  next.setDate(
    next.getDate() + days
  );

  return next;
}

function normalizePublicAppointmentDate(value: unknown): string {
  if (typeof value !== "string") {
    return new Date().toISOString().slice(0, 10);
  }

  const trimmed = value.trim();

  return /^\d{4}-\d{2}-\d{2}$/.test(trimmed)
    ? trimmed
    : new Date().toISOString().slice(0, 10);
}

function normalizePublicAppointmentTime(value: unknown): string {
  if (typeof value !== "string") {
    return "";
  }

  const trimmed = value.trim();

  return /^\d{2}:\d{2}$/.test(trimmed)
    ? trimmed
    : "";
}

function normalizePublicAppointmentDuration(value: unknown): number {
  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return 60;
  }

  return Math.max(1, Math.min(Math.trunc(parsed), 480));
}

export async function createPublicAppointment(
  data: PublicAppointmentInput
): Promise<PublicAppointmentResult> {
  const now =
    new Date();

  const dateRendezVous =
    normalizePublicAppointmentDate(data.dateSouhaitee);

  const heureRendezVous =
    normalizePublicAppointmentTime(data.heureSouhaitee);

  const durationMinutes =
    normalizePublicAppointmentDuration(data.durationMinutes);

  const client =
    await RuntimeDataBinding.create(
      clientsautoModule,
      {
        nom: data.nom,
        telephone: data.telephone,
        statut: "prospect",
        source: "site_public",
        codeClient: crypto.randomUUID(),
      }
    );

  const vehicule =
    await RuntimeDataBinding.create(
      vehiculesModule,
      {
        marque: data.vehicule,
        immatriculation: data.immatriculation,
        clientId: client.id,
        statut: "actif",
      }
    );

  const rendezvous =
    await RuntimeDataBinding.create(
      rendezvousModule,
      {
        clientId: client.id,
        vehiculeId: vehicule.id,
        statut: "planifie",
        dateRendezVous,
        heureRendezVous,
        durationMinutes,
        typeService: "autre",
        motif: "Demande de rendez-vous depuis le site public",
        commentaire: buildPublicAppointmentMessage(data),
        source: "site_public",
      }
    );

  await RuntimeNotificationEngine.notify({
    type: "amarkhys.public_appointment.created",
    module: "rendezvous",
    title: "Nouveau RDV public",
    message: buildPublicAppointmentMessage(data),
    severity: "info",
  });

  await RuntimeDataBinding.create(
    rappelsautoModule,
    {
      clientId: client.id,
      vehiculeId: vehicule.id,
      rendezvousId: rendezvous.id,
      typeRappel: "rendezvous",
      dateRappel: addDays(now, 1),
      canal: "notification",
      statut: "planifie",
      message:
        "Relancer le client pour confirmer le rendez-vous demandé depuis le site public.",
      source: "site_public",
    }
  );

  await RuntimeDataBinding.create(
    rappelsautoModule,
    {
      clientId: client.id,
      vehiculeId: vehicule.id,
      rendezvousId: rendezvous.id,
      typeRappel: "marketing",
      dateRappel: addDays(now, 30),
      canal: "whatsapp",
      statut: "planifie",
      message:
        "Préparer un message WhatsApp de suivi client AMARKHYS après le premier contact.",
      source: "site_public",
    }
  );

  return {
    ok: true,
    message:
      "Votre demande de rendez-vous a bien été enregistrée. Notre équipe vous contactera rapidement.",
  };
}