const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const TARGET = "src/components/public/PublicAppointmentService.ts";
const targetPath = path.join(ROOT, TARGET);

if (!fs.existsSync(targetPath)) {
  throw new Error(`Fichier introuvable: ${TARGET}`);
}

const backupPath = `${targetPath}.bak-qpublic-sched-b-public-dto`;
fs.copyFileSync(targetPath, backupPath);

let content = fs.readFileSync(targetPath, "utf8");

const inputBlock = `type PublicAppointmentInput = {
  nom: string;
  telephone: string;
  vehicule: string;
  immatriculation: string;
};
`;

if (!content.includes(inputBlock)) {
  throw new Error("Bloc PublicAppointmentInput introuvable.");
}

if (!content.includes("type PublicAppointmentResult")) {
  content = content.replace(
    inputBlock,
    `${inputBlock}

type PublicAppointmentResult = {
  ok: true;
  message: string;
};
`
  );
}

content = content.replace(
  `export async function createPublicAppointment(
  data: PublicAppointmentInput
) {`,
  `export async function createPublicAppointment(
  data: PublicAppointmentInput
): Promise<PublicAppointmentResult> {`
);

content = content.replace(
  `  return rendezvous;
}`,
  `  return {
    ok: true,
    message:
      "Votre demande de rendez-vous a bien été enregistrée. Notre équipe vous contactera rapidement.",
  };
}`
);

if (content.includes("return rendezvous;")) {
  throw new Error("Le service public retourne encore le record rendezvous.");
}

fs.writeFileSync(targetPath, content, "utf8");

console.log("");
console.log("[Q-PUBLIC-SCHED-B] DONE");
console.log(`[BACKUP] ${path.relative(ROOT, backupPath).replace(/\\\\/g, "/")}`);
console.log(`[UPDATED] ${TARGET}`);
console.log("");
console.log("Next:");
console.log("pnpm build");
console.log("node .\\scripts\\runtime\\audit-qpublic-sched-a-public-scheduling-availability-readiness.cjs");