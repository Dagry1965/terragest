const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = "src/runtime/modules/generated/clientsauto/clientsauto.module.ts";
const fullPath = path.join(root, file);

let content = fs.readFileSync(fullPath, "utf8");
const before = content;

const workflowStart = content.indexOf("workflows:[");

if (workflowStart === -1) {
  throw new Error("[CLIENT-WORKFLOW-A1-SAFE-3] workflows block not found");
}

const moduleEnd = content.lastIndexOf("};");

if (moduleEnd === -1 || moduleEnd < workflowStart) {
  throw new Error("[CLIENT-WORKFLOW-A1-SAFE-3] module end not found");
}

const workflowBlock = `workflows:[
      {
        key:"client",
        label:"Cycle client",
        stateField:"statut",
        initialState:"prospect",
        states:[
          {
            key:"prospect",
            label:"Prospect",
            color:"warning"
          },
          {
            key:"actif",
            label:"Actif",
            color:"success"
          },
          {
            key:"suspendu",
            label:"Suspendu",
            color:"warning"
          },
          {
            key:"inactif",
            label:"Inactif",
            color:"default"
          },
          {
            key:"archive",
            label:"Archivé",
            color:"muted"
          }
        ],
        transitions:[
          {
            from:"prospect",
            to:"actif",
            action:"clientsauto.activer"
          },
          {
            from:"actif",
            to:"suspendu",
            action:"clientsauto.suspendre"
          },
          {
            from:"suspendu",
            to:"actif",
            action:"clientsauto.reactiver"
          },
          {
            from:"actif",
            to:"inactif",
            action:"clientsauto.desactiver"
          },
          {
            from:"suspendu",
            to:"inactif",
            action:"clientsauto.desactiver"
          },
          {
            from:"inactif",
            to:"actif",
            action:"clientsauto.reactiver"
          },
          {
            from:"prospect",
            to:"archive",
            action:"clientsauto.archiver"
          },
          {
            from:"actif",
            to:"archive",
            action:"clientsauto.archiver"
          },
          {
            from:"suspendu",
            to:"archive",
            action:"clientsauto.archiver"
          },
          {
            from:"inactif",
            to:"archive",
            action:"clientsauto.archiver"
          },
          {
            from:"archive",
            to:"actif",
            action:"clientsauto.restaurer"
          }
        ]
      }
    ]
  };`;

content =
  content.slice(0, workflowStart) +
  workflowBlock +
  content.slice(moduleEnd + 2);

if (content !== before) {
  fs.writeFileSync(fullPath, content, "utf8");
  console.log("[UPDATED]", file);
} else {
  console.log("[UNCHANGED]", file);
}

console.log("[CLIENT-WORKFLOW-A1-SAFE-3] Done");