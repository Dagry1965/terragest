const fs = require("fs");
const path = require("path");

const root = process.cwd();
const target = path.join(root, "src/runtime/workspaces/ERPWorkspaceRegistry.ts");

function writeFile(filePath, content) {
  fs.writeFileSync(filePath, content, "utf8");
  console.log("WRITTEN", path.relative(root, filePath));
}

let content = fs.readFileSync(target, "utf8");

content = content
  .replaceAll("Vue GÃ©nÃ©rale", "Vue Générale")
  .replaceAll("MatÃ©riels", "Matériels")
  .replaceAll("RÃ©coltes", "Récoltes")
  .replaceAll("matÃ©riels", "matériels")
  .replaceAll("financiÃ¨re", "financière")
  .replaceAll("DÃ©penses", "Dépenses")
  .replaceAll("ObservabilitÃ©", "Observabilité")
  .replaceAll("VÃ©hicules", "Véhicules");

content = content.replace(
  /key:\s*"amarkhys",([\s\S]*?)defaultHref:\s*"\/clientsauto",/,
  'key: "amarkhys",$1defaultHref:\n    "/dashboard/amarkhys",'
);

if (!content.includes('key:"cockpit-amarkhys"') && !content.includes('key: "cockpit-amarkhys"')) {
  content = content.replace(
    /quickActions:\s*\[/,
    `quickActions:[

    {
      key: "cockpit-amarkhys",
      label: "Cockpit AMARKHYS",
      href: "/dashboard/amarkhys",
    },`
  );
}

content = content.replaceAll('key:"amarkhys"', 'key: "amarkhys"');
content = content.replaceAll('label:"AMARKHYS"', 'label: "AMARKHYS"');
content = content.replaceAll('modules:[', 'modules: [');
content = content.replaceAll('kpis:[', 'kpis: [');
content = content.replaceAll('quickActions:[', 'quickActions: [');
content = content.replaceAll('key:"clientsauto"', 'key: "clientsauto"');
content = content.replaceAll('key:"vehicules"', 'key: "vehicules"');
content = content.replaceAll('key:"rendezvous"', 'key: "rendezvous"');
content = content.replaceAll('key:"interventionsauto"', 'key: "interventionsauto"');
content = content.replaceAll('key:"facturesauto"', 'key: "facturesauto"');
content = content.replaceAll('key:"produitsauto"', 'key: "produitsauto"');
content = content.replaceAll('key:"stocksauto"', 'key: "stocksauto"');
content = content.replaceAll('key:"rappelsauto"', 'key: "rappelsauto"');

writeFile(target, content);

console.log("PASS 2N-C OK: AMARKHYS workspace now opens cockpit and exposes cockpit quick action.");
