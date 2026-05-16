const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const target = path.join(
  ROOT,
  "src/runtime/modules/generated/rendezvous/rendezvous.actions.ts"
);

if (!fs.existsSync(target)) {
  throw new Error(`File not found: ${target}`);
}

const content = `import type {
  ERPModuleAction,
} from "@/runtime/modules/ERPModule";

export const rendezvousActions: ERPModuleAction[] = [
  {
    key: "Confirmer",
    label: "Confirmer le RDV",
    type: "primary",
    permission: "rendezvous.workflow",
  },
  {
    key: "D\\u00e9marrer",
    label: "D\\u00e9marrer le RDV",
    type: "secondary",
    permission: "rendezvous.workflow",
  },
  {
    key: "Terminer",
    label: "Terminer le RDV",
    type: "secondary",
    permission: "rendezvous.workflow",
  },
  {
    key: "Facturer",
    label: "Facturer",
    type: "secondary",
    permission: "rendezvous.workflow",
  },
  {
    key: "Annuler",
    label: "Annuler",
    type: "danger",
    permission: "rendezvous.workflow",
  },
];
`;

fs.writeFileSync(target, content, { encoding: "utf8" });

console.log("OK rendezvous.actions.ts réécrit en UTF-8 avec unicode escapes.");