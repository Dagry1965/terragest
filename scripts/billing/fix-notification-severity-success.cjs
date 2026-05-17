const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const target = path.join(
  ROOT,
  "src/runtime/business-rules/runtimeBusinessRules.ts"
);

if (!fs.existsSync(target)) {
  throw new Error("runtimeBusinessRules.ts introuvable");
}

let content = fs.readFileSync(target, "utf8");

content = content.replaceAll(
`          severity:
            statutPaiement === "paye"
              ? "success"
              : "info",`,
`          severity:
            "info",`
);

content = content.replaceAll(
`          severity:
            statutPaiement === "paye"
              ? "success"
              : "info"`,
`          severity:
            "info"`
);

fs.writeFileSync(target, content, "utf8");

console.log("OK severity success remplacé par info.");