const fs = require("fs");
const path = require("path");

const root = process.cwd();

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function write(file, content) {
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, content, { encoding: "utf8" });
  console.log(`UPDATED ${path.relative(root, file)}`);
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

const engineFile = path.join(
  root,
  "src",
  "runtime",
  "integrity",
  "RuntimeReferentialIntegrityEngine.ts"
);

const mutationFile = path.join(
  root,
  "src",
  "runtime",
  "firestore",
  "FirestoreRuntimeMutation.ts"
);

write(
  engineFile,
  `import type { ERPModule } from "@/runtime/modules/ERPModule";

import {
  RuntimeDataBinding,
} from "@/runtime/data-binding";

import {
  allERPModules,
} from "@/runtime/modules/definitions/coreModules";

export type ReferentialIntegrityPolicy =
  "restrict"
  | "setNull"
  | "cascade"
  | "archiveCascade";

export interface ReferentialIntegrityRule {
  sourceModule: string;
  sourceField: string;
  targetModule: string;
  policy: ReferentialIntegrityPolicy;
  label: string;
}

const AMARKHYS_REFERENTIAL_RULES: ReferentialIntegrityRule[] = [
  {
    sourceModule: "vehicules",
    sourceField: "clientId",
    targetModule: "clientsauto",
    policy: "restrict",
    label: "véhicules",
  },
  {
    sourceModule: "rendezvous",
    sourceField: "clientId",
    targetModule: "clientsauto",
    policy: "restrict",
    label: "rendez-vous",
  },
  {
    sourceModule: "interventionsauto",
    sourceField: "clientId",
    targetModule: "clientsauto",
    policy: "restrict",
    label: "interventions",
  },
  {
    sourceModule: "facturesauto",
    sourceField: "clientId",
    targetModule: "clientsauto",
    policy: "restrict",
    label: "factures",
  },
  {
    sourceModule: "rendezvous",
    sourceField: "vehiculeId",
    targetModule: "vehicules",
    policy: "restrict",
    label: "rendez-vous",
  },
  {
    sourceModule: "interventionsauto",
    sourceField: "vehiculeId",
    targetModule: "vehicules",
    policy: "restrict",
    label: "interventions",
  },
  {
    sourceModule: "facturesauto",
    sourceField: "vehiculeId",
    targetModule: "vehicules",
    policy: "restrict",
    label: "factures",
  },
  {
    sourceModule: "encaissementsauto",
    sourceField: "factureId",
    targetModule: "facturesauto",
    policy: "restrict",
    label: "encaissements",
  },
  {
    sourceModule: "echeancespaiementauto",
    sourceField: "factureId",
    targetModule: "facturesauto",
    policy: "restrict",
    label: "échéances de paiement",
  },
];

function getModule(
  moduleKey: string
): ERPModule | null {
  return (
    allERPModules.find((module) =>
      module.metadata.key === moduleKey
    ) ?? null
  );
}

function isSameId(
  left: unknown,
  right: string
): boolean {
  return String(left ?? "") === String(right);
}

export class RuntimeReferentialIntegrityEngine {
  static async assertCanDelete(
    module: ERPModule,
    id: string
  ): Promise<void> {
    const moduleKey =
      module.metadata.key;

    const matchingRules =
      AMARKHYS_REFERENTIAL_RULES.filter(
        (rule) =>
          rule.targetModule === moduleKey &&
          rule.policy === "restrict"
      );

    for (const rule of matchingRules) {
      const sourceModule =
        getModule(rule.sourceModule);

      if (!sourceModule) {
        continue;
      }

      const records =
        await RuntimeDataBinding.list(sourceModule);

      const linkedRecords =
        records.filter((record) =>
          isSameId(
            (record as Record<string, unknown>)[rule.sourceField],
            id
          )
        );

      if (linkedRecords.length > 0) {
        throw new Error(
          [
            "Suppression impossible.",
            "Cet élément est lié à",
            linkedRecords.length.toString(),
            rule.label + ".",
            "Archivez ou annulez l’élément au lieu de le supprimer.",
          ].join(" ")
        );
      }
    }

    if (moduleKey === "encaissementsauto") {
      const record =
        await RuntimeDataBinding.detail(module, id);

      const statut =
        String(
          (record as Record<string, unknown> | null)?.statut ?? ""
        );

      if (statut === "valide") {
        throw new Error(
          "Suppression impossible. Un encaissement validé doit être annulé ou rejeté, pas supprimé."
        );
      }
    }

    if (moduleKey === "echeancespaiementauto") {
      const record =
        await RuntimeDataBinding.detail(module, id);

      const statut =
        String(
          (record as Record<string, unknown> | null)?.statut ?? ""
        );

      if (
        statut === "payee" ||
        statut === "en_retard" ||
        statut === "partiellement_payee"
      ) {
        throw new Error(
          "Suppression impossible. Cette échéance a un historique de paiement ou de relance."
        );
      }
    }
  }
}
`
);

if (!fs.existsSync(mutationFile)) {
  console.error(`MISSING ${mutationFile}`);
  process.exit(1);
}

let mutation = read(mutationFile);

if (!mutation.includes("RuntimeReferentialIntegrityEngine")) {
  mutation = mutation.replace(
    `import {
  FirestoreRuntimeRepository,
} from "./FirestoreRuntimeRepository";`,
    `import {
  FirestoreRuntimeRepository,
} from "./FirestoreRuntimeRepository";

import {
  RuntimeReferentialIntegrityEngine,
} from "@/runtime/integrity/RuntimeReferentialIntegrityEngine";`
  );
}

if (!mutation.includes("assertCanDelete")) {
  mutation = mutation.replace(
    `  static async delete(
    module: ERPModule,
    id: string
  ) {
    const result =
      await FirestoreRuntimeRepository.delete(
        module,
        id
      );`,
    `  static async delete(
    module: ERPModule,
    id: string
  ) {
    await RuntimeReferentialIntegrityEngine.assertCanDelete(
      module,
      id
    );

    const result =
      await FirestoreRuntimeRepository.delete(
        module,
        id
      );`
  );
}

write(mutationFile, mutation);

console.log("DONE install runtime referential integrity engine");