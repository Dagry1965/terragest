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

if (!content.includes("function canComputeRuntimeField(")) {
  content = content.replace(
    /async function applyComputedFields|function applyComputedFields/,
    `function canComputeRuntimeField(
  dependsOn: string[] | undefined,
  data: Record<string, unknown>
): boolean {
  if (!dependsOn || dependsOn.length === 0) {
    return true;
  }

  return dependsOn.every((key) => {
    const value =
      data[key];

    return (
      value !== undefined &&
      value !== null &&
      value !== ""
    );
  });
}

$&`
  );
}

content = content.replace(
  /const computedValue\s*=\s*RuntimeComputedEngine\.compute\(\s*field\.computed\.formula,\s*computedData\s*\);/g,
  `if (
      !canComputeRuntimeField(
        field.computed.dependsOn,
        computedData
      )
    ) {
      continue;
    }

    const computedValue =
      RuntimeComputedEngine.compute(
        field.computed.formula,
        computedData
      );`
);

content = content.replace(
  /const computedValue\s*=\s*RuntimeComputedEngine\.compute\(\s*field\.computed\.formula,\s*result\s*\);/g,
  `if (
      !canComputeRuntimeField(
        field.computed.dependsOn,
        result
      )
    ) {
      continue;
    }

    const computedValue =
      RuntimeComputedEngine.compute(
        field.computed.formula,
        result
      );`
);

content = content.replace(
  /const computedValue\s*=\s*RuntimeComputedEngine\.compute\(\s*field\.computed\.formula,\s*data\s*\);/g,
  `if (
      !canComputeRuntimeField(
        field.computed.dependsOn,
        data
      )
    ) {
      continue;
    }

    const computedValue =
      RuntimeComputedEngine.compute(
        field.computed.formula,
        data
      );`
);

if (content === before) {
  console.log("NO CHANGE");
  console.log("The expected RuntimeComputedEngine.compute pattern was not found.");
  console.log("Show the file around applyComputedFields:");
  console.log('Get-Content ".\\\\src\\\\runtime\\\\firestore\\\\FirestoreRuntimeMutation.ts" | Select-Object -Skip 70 -First 80');
  process.exit(0);
}

fs.writeFileSync(file, content, { encoding: "utf8" });

console.log("UPDATED src/runtime/firestore/FirestoreRuntimeMutation.ts");
console.log("DONE guard computed fields on partial Firestore updates");