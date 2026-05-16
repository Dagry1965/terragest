const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const target = path.join(ROOT, "src/runtime/actions/RuntimeActionEngine.ts");

if (!fs.existsSync(target)) {
  throw new Error(`File not found: ${target}`);
}

let content = fs.readFileSync(target, "utf8");
const original = content;

// 1. Ajouter l'import RuntimeValidationEngine si absent
if (!content.includes("@/runtime/validation/RuntimeValidationEngine")) {
  content = content.replace(
    /import\s+{\s*RuntimeWorkflowEngine\s*,?\s*}\s+from\s+"@\/runtime\/workflows\/RuntimeWorkflowEngine";/,
    `import {
  RuntimeWorkflowEngine,
} from "@/runtime/workflows/RuntimeWorkflowEngine";

import {
  RuntimeValidationEngine,
} from "@/runtime/validation/RuntimeValidationEngine";`
  );

  // Si RuntimeWorkflowEngine n'est pas importé sous cette forme, on ajoute après WorkflowRuntimeService
  if (!content.includes("@/runtime/validation/RuntimeValidationEngine")) {
    content = content.replace(
      /(from\s+"@\/runtime\/workflow-persistence\/WorkflowRuntimeService";\s*)/,
      `$1

import {
  RuntimeValidationEngine,
} from "@/runtime/validation/RuntimeValidationEngine";
`
    );
  }
}

// 2. Injecter validation juste avant WorkflowRuntimeService.executeTransition
const oldBlock = `      if (entityId) {

        return WorkflowRuntimeService
          .executeTransition({`;

const newBlock = `      if (entityId) {

        const validation =
          RuntimeValidationEngine.validate(module, record);

        if (!validation.valid) {
          return {
            success: false,
            message:
              "Veuillez renseigner les champs obligatoires avant de continuer.",
            errors: validation.errors,
            action,
            record,
          };
        }

        return WorkflowRuntimeService
          .executeTransition({`;

if (!content.includes(oldBlock)) {
  throw new Error("Bloc entityId / WorkflowRuntimeService non trouvé. Aucun changement appliqué.");
}

content = content.replace(oldBlock, newBlock);

if (content === original) {
  console.log("Aucune modification appliquée.");
  process.exit(0);
}

fs.writeFileSync(target, content, "utf8");

console.log("OK validation workflow ajoutée avant WorkflowRuntimeService.executeTransition");
console.log("Fichier modifié :", path.relative(ROOT, target));