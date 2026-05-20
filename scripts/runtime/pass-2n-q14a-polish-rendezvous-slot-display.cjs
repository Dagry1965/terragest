const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

function assertProjectRoot() {
  if (
    !fs.existsSync(path.join(ROOT, "package.json")) ||
    !fs.existsSync(path.join(ROOT, "src"))
  ) {
    throw new Error("Ce script doit être lancé depuis la racine du projet Terragest.");
  }
}

function readFile(filePath) {
  return fs.readFileSync(filePath, "utf8").replace(/\r\n/g, "\n");
}

function writeFile(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, { encoding: "utf8" });
  console.log("[WRITTEN] " + path.relative(ROOT, filePath));
}

function replaceOnce(content, search, replacement, label) {
  if (!content.includes(search)) {
    throw new Error("Bloc introuvable : " + label);
  }

  return content.replace(search, replacement);
}

assertProjectRoot();

const rendezvousModulePath = path.join(
  ROOT,
  "src",
  "runtime",
  "modules",
  "generated",
  "rendezvous",
  "rendezvous.module.ts"
);

const relationLoaderPath = path.join(
  ROOT,
  "src",
  "runtime",
  "modules",
  "lifecycle",
  "ERPRelationDataLoader.ts"
);

let rendezvousModule = readFile(rendezvousModulePath);

rendezvousModule = replaceOnce(
  rendezvousModule,
  `      {
        key: "heureRendezVous",
        label: "Heure",
        type: "text",
        required: true,
        grid: { cols: 4 },
      },`,
  `      {
        key: "heureRendezVous",
        label: "Heure",
        type: "text",
        required: true,
        list: { order: 4 },
        grid: { cols: 4 },
      },`,
  "heureRendezVous list order"
);

rendezvousModule = replaceOnce(
  rendezvousModule,
  `      {
        key: "durationMinutes",
        label: "Durée prévue",
        type: "number",
        defaultValue: 60,
        grid: { cols: 4 },
      },`,
  `      {
        key: "durationMinutes",
        label: "Durée prévue",
        type: "number",
        defaultValue: 60,
        list: { order: 5 },
        grid: { cols: 4 },
      },`,
  "durationMinutes list order"
);

rendezvousModule = replaceOnce(
  rendezvousModule,
  `      {
        key: "startAt",
        label: "Début créneau",
        type: "text",
        grid: { cols: 4 },
      },`,
  `      {
        key: "startAt",
        label: "Début créneau",
        type: "text",
        list: { visible: false },
        grid: { cols: 4 },
      },`,
  "startAt hide from list"
);

rendezvousModule = replaceOnce(
  rendezvousModule,
  `      {
        key: "endAt",
        label: "Fin créneau",
        type: "text",
        grid: { cols: 4 },
      },`,
  `      {
        key: "endAt",
        label: "Fin créneau",
        type: "text",
        list: { visible: false },
        grid: { cols: 4 },
      },`,
  "endAt hide from list"
);

rendezvousModule = replaceOnce(
  rendezvousModule,
  `      {
        key: "consumedByInterventionId",
        label: "Intervention liée",
        type: "relation",
        relation: { module: "interventionsauto" },
        searchable: true,
        grid: { cols: 4 },
      },`,
  `      {
        key: "consumedByInterventionId",
        label: "Intervention liée",
        type: "relation",
        relation: { module: "interventionsauto" },
        searchable: true,
        list: { visible: false },
        grid: { cols: 4 },
      },`,
  "consumedByInterventionId hide from list"
);

rendezvousModule = replaceOnce(
  rendezvousModule,
  `        list: { order: 4 },
        grid: { cols: 6 },`,
  `        list: { order: 6 },
        grid: { cols: 6 },`,
  "statut list order"
);

rendezvousModule = replaceOnce(
  rendezvousModule,
  `          "dateRendezVous",
          "heureRendezVous",
          "typeService",
          "statut",`,
  `          "dateRendezVous",
          "heureRendezVous",
          "durationMinutes",
          "typeService",
          "statut",`,
  "durationMinutes tab fields"
);

rendezvousModule = replaceOnce(
  rendezvousModule,
  `              "dateRendezVous",
              "heureRendezVous",
              "typeService",
              "statut",`,
  `              "dateRendezVous",
              "heureRendezVous",
              "durationMinutes",
              "typeService",
              "statut",`,
  "durationMinutes section fields"
);

writeFile(rendezvousModulePath, rendezvousModule);

let relationLoader = readFile(relationLoaderPath);

const helperAnchor = `    const numberLabel = (input: string) => {
      const text = String(input ?? "").trim();

      if (!text) {
        return "";
      }

      const number = Number(text);

      if (!Number.isFinite(number)) {
        return text;
      }

      return number.toLocaleString("fr-FR");
    };

`;

const helperBlock = `    const normalizeTimeLabel = (input: string) => {
      const text = String(input ?? "").trim();

      if (!text) {
        return "";
      }

      const isoTime =
        text.match(/T(\\d{1,2}):(\\d{2})/);

      if (isoTime) {
        return isoTime[1].padStart(2, "0") + "h" + isoTime[2];
      }

      const colonTime =
        text.match(/^(\\d{1,2}):(\\d{2})/);

      if (colonTime) {
        return colonTime[1].padStart(2, "0") + "h" + colonTime[2];
      }

      const frenchTime =
        text.match(/^(\\d{1,2})\\s*h\\s*(\\d{0,2})$/i);

      if (frenchTime) {
        return (
          frenchTime[1].padStart(2, "0") +
          "h" +
          String(frenchTime[2] || "00").padStart(2, "0")
        );
      }

      const compactTime =
        text.match(/^(\\d{1,2})(\\d{2})$/);

      if (compactTime) {
        return compactTime[1].padStart(2, "0") + "h" + compactTime[2];
      }

      const date = new Date(text);

      if (!Number.isNaN(date.getTime())) {
        return (
          String(date.getHours()).padStart(2, "0") +
          "h" +
          String(date.getMinutes()).padStart(2, "0")
        );
      }

      return text;
    };

    const addMinutesToTimeLabel = (
      input: string,
      minutesToAdd: number
    ) => {
      const time =
        normalizeTimeLabel(input);

      const match =
        time.match(/^(\\d{1,2})h(\\d{2})$/);

      if (!match || !Number.isFinite(minutesToAdd)) {
        return "";
      }

      const date =
        new Date(2000, 0, 1, Number(match[1]), Number(match[2]), 0, 0);

      date.setMinutes(date.getMinutes() + minutesToAdd);

      return (
        String(date.getHours()).padStart(2, "0") +
        "h" +
        String(date.getMinutes()).padStart(2, "0")
      );
    };

    const rendezvousSlotLabel = () => {
      const start =
        normalizeTimeLabel(
          value("heureRendezVous") ||
          value("heureRdv") ||
          value("heure") ||
          value("startAt")
        );

      const duration =
        Number(
          value("durationMinutes") ||
          60
        );

      const end =
        value("endAt")
          ? normalizeTimeLabel(value("endAt"))
          : addMinutesToTimeLabel(start, duration);

      if (start && end) {
        return start + " → " + end;
      }

      return start;
    };

`;

if (!relationLoader.includes("const normalizeTimeLabel =")) {
  relationLoader = replaceOnce(
    relationLoader,
    helperAnchor,
    helperAnchor + helperBlock,
    "insert rendezvous time helpers"
  );
}

const oldRdvBlock = `    if (normalizedModuleKey === "rendezvous") {
      const dateValue =
        value("dateRendezVous") ||
        value("dateRdv") ||
        value("date") ||
        value("dateIntervention");

      const heureValue =
        value("heureRendezVous") ||
        value("heureRdv") ||
        value("heure");

      const rdvLabel = compact(
        value("motif") || value("objet") || "Rendez-vous",
        dateValue ? dateLabel(dateValue) : "",
        heureValue
      );

      if (rdvLabel) {
        return rdvLabel;
      }
    }`;

const newRdvBlock = `    if (normalizedModuleKey === "rendezvous") {
      const dateValue =
        value("dateRendezVous") ||
        value("dateRdv") ||
        value("date") ||
        value("dateIntervention");

      const rdvLabel = compact(
        "Rendez-vous",
        dateValue ? dateLabel(dateValue) : "",
        rendezvousSlotLabel()
      );

      if (rdvLabel) {
        return rdvLabel;
      }
    }`;

relationLoader = replaceOnce(
  relationLoader,
  oldRdvBlock,
  newRdvBlock,
  "rendezvous label block"
);

writeFile(relationLoaderPath, relationLoader);

console.log("");
console.log("[OK] Q14A affichage créneaux RDV et libellés relationnels améliorés.");
console.log("");
console.log("Prochaines commandes :");
console.log("node .\\\\scripts\\\\runtime\\\\check-encoding.cjs");
console.log("pnpm build");