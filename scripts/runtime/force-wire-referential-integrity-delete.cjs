const fs = require("fs");
const path = require("path");

const root = process.cwd();

const file = path.join(
  root,
  "src",
  "runtime",
  "firestore",
  "FirestoreRuntimeMutation.ts"
);

if (!fs.existsSync(file)) {
  console.error(`MISSING ${file}`);
  process.exit(1);
}

let content = fs.readFileSync(file, "utf8");
const before = content;

if (!content.includes("@/runtime/integrity/RuntimeReferentialIntegrityEngine")) {
  content = content.replace(
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

content = content.replace(
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

if (content === before) {
  console.log("NO CHANGE");
  console.log("Inspect delete method:");
  console.log('Get-Content ".\\\\src\\\\runtime\\\\firestore\\\\FirestoreRuntimeMutation.ts" | Select-Object -Skip 200 -First 45');
  process.exit(0);
}

fs.writeFileSync(file, content, { encoding: "utf8" });

console.log("UPDATED src/runtime/firestore/FirestoreRuntimeMutation.ts");
console.log("DONE force wire referential integrity delete");