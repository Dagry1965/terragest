const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const file = path.join(ROOT, "src", "runtime", "status", "RuntimeStatusGovernanceEngine.ts");

if (!fs.existsSync(file)) {
  throw new Error("File not found: " + file);
}

const original = fs.readFileSync(file, "utf8");
let content = original;

const backup = file + ".bak-q1d-c-rendezvous-status-governance";
fs.writeFileSync(backup, original, "utf8");

if (!content.includes('moduleKey: "rendezvous"')) {
  const policy = `  {
    moduleKey: "rendezvous",
    statusField: "statut",
    editMode: "action_only",
    statuses: [
      {
        key: "planifie",
        label: "Planifié",
        description:
          "Le rendez-vous est enregistré et bloque le créneau planning.",
        visibility: "visible",
        tone: "info",
      },
      {
        key: "confirme",
        label: "Confirmé",
        description:
          "Le rendez-vous est confirmé. Le runtime peut créer ou lier une intervention.",
        visibility: "visible",
        tone: "success",
      },
      {
        key: "en_cours",
        label: "En cours",
        description:
          "Le rendez-vous est en cours de traitement à l'atelier.",
        visibility: "visible",
        tone: "warning",
      },
      {
        key: "termine",
        label: "Terminé",
        description:
          "Le rendez-vous est terminé. La suite métier se poursuit dans l'intervention et la facture.",
        visibility: "visible",
        tone: "success",
      },
      {
        key: "annule",
        label: "Annulé",
        description:
          "Le rendez-vous est annulé. Le créneau n'est plus bloquant et la trace est conservée.",
        visibility: "visible",
        tone: "danger",
      },
      {
        key: "facture",
        label: "Facturé",
        description:
          "Ancien état technique retiré du cycle rendez-vous. La facturation appartient aux interventions/factures.",
        visibility: "technical",
        tone: "info",
      },
    ],
    actions: [
      {
        key: "Confirmer",
        label: "Confirmer",
        from: ["planifie"],
        to: "confirme",
        description:
          "Confirme le rendez-vous et déclenche les règles métier associées.",
        recommended: true,
      },
      {
        key: "Démarrer",
        label: "Démarrer",
        from: ["confirme"],
        to: "en_cours",
        description:
          "Indique que le rendez-vous est pris en charge.",
      },
      {
        key: "Terminer",
        label: "Terminer",
        from: ["en_cours"],
        to: "termine",
        description:
          "Clôture le rendez-vous côté planning.",
      },
      {
        key: "Annuler",
        label: "Annuler",
        from: ["planifie", "confirme", "en_cours"],
        to: "annule",
        description:
          "Annule le rendez-vous, conserve une trace et libère le créneau.",
      },
    ],
    guidance: [
      {
        status: "planifie",
        title: "Rendez-vous planifié",
        message:
          "Le créneau est réservé. Utilisez les actions pour confirmer, démarrer ou annuler.",
        tone: "info",
      },
      {
        status: "confirme",
        title: "Rendez-vous confirmé",
        message:
          "La confirmation pilote les règles métier, notamment la création ou liaison d'une intervention.",
        tone: "success",
      },
      {
        status: "en_cours",
        title: "Rendez-vous en cours",
        message:
          "Le rendez-vous est en traitement. Les modifications doivent rester cohérentes avec l'intervention liée.",
        tone: "warning",
      },
      {
        status: "termine",
        title: "Rendez-vous terminé",
        message:
          "Le rendez-vous est terminé. La facturation se pilote depuis l'intervention et les factures.",
        tone: "success",
      },
      {
        status: "annule",
        title: "Rendez-vous annulé",
        message:
          "Le rendez-vous est annulé. Il reste consultable pour historique mais ne doit plus bloquer le planning.",
        tone: "danger",
      },
    ],
    technicalFields: [
      "consumedByInterventionId",
      "consumedAt",
      "cancelledAt",
      "cancelledBy",
      "cancelReason",
    ],
  },
`;

  const marker = "const runtimeStatusPolicies: RuntimeStatusGovernancePolicy[] = [";
  const index = content.indexOf(marker);

  if (index < 0) {
    throw new Error("Point d'insertion runtimeStatusPolicies introuvable.");
  }

  const insertAt = index + marker.length;
  content = content.slice(0, insertAt) + "\n" + policy + content.slice(insertAt);
}

if (!content.includes('moduleKey: "rendezvous"')) {
  console.log("[FAIL] Policy rendezvous non ajoutée.");
  console.log("[BACKUP]", path.relative(ROOT, backup));
  process.exit(1);
}

fs.writeFileSync(file, content, "utf8");

console.log("[DONE] Q1-D-C policy statut rendezvous ajoutée.");
console.log("[BACKUP]", path.relative(ROOT, backup));
console.log("[WRITTEN]", path.relative(ROOT, file));
console.log("");
console.log("Next:");
console.log("pnpm build");
