const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const target = path.join(
  ROOT,
  "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx"
);

if (!fs.existsSync(target)) {
  throw new Error(`File not found: ${target}`);
}

let content = fs.readFileSync(target, "utf8");
const original = content;

content = content.replace(
  `              message:
                workflowResult?.message ??
                "Action workflow impossible.",`,
  `              message:
                workflowResult && "message" in workflowResult
                  ? String(workflowResult.message)
                  : workflowResult && "error" in workflowResult
                    ? String(workflowResult.error)
                    : "Action workflow impossible.",`
);

if (content === original) {
  throw new Error("Bloc workflowResult?.message non trouvé. Aucun changement appliqué.");
}

fs.writeFileSync(target, content, "utf8");

console.log("OK ERPEnterpriseForm corrigé : résultat workflow compatible message/error.");