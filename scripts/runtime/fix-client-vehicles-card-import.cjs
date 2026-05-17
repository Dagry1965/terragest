const fs = require("fs");
const path = require("path");

const root = process.cwd();

const file = path.join(
  root,
  "src",
  "components",
  "erp",
  "forms",
  "enterprise",
  "ERPEnterpriseForm.tsx"
);

if (!fs.existsSync(file)) {
  console.error(`MISSING ${file}`);
  process.exit(1);
}

let content = fs.readFileSync(file, "utf8");

if (!content.includes("ClientVehiclesReadonlyCard")) {
  console.error("ClientVehiclesReadonlyCard JSX not found");
  process.exit(1);
}

if (!content.includes("@/components/erp/relations/ClientVehiclesReadonlyCard")) {
  const importToAdd = `import {
  ClientVehiclesReadonlyCard,
} from "@/components/erp/relations/ClientVehiclesReadonlyCard";

`;

  const firstInterfaceIndex = content.indexOf("interface ");

  if (firstInterfaceIndex === -1) {
    console.error("Could not find import insertion point");
    process.exit(1);
  }

  content =
    content.slice(0, firstInterfaceIndex) +
    importToAdd +
    content.slice(firstInterfaceIndex);
}

fs.writeFileSync(file, content, { encoding: "utf8" });

console.log("UPDATED ERPEnterpriseForm import ClientVehiclesReadonlyCard");