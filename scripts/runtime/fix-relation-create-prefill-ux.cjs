const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const target = path.join(
  ROOT,
  "src/components/erp/forms/enterprise/ERPFormField.tsx"
);

if (!fs.existsSync(target)) {
  throw new Error(`File not found: ${target}`);
}

let content = fs.readFileSync(target, "utf8");
const original = content;

// 1. Corriger encodage résiduel si présent
content = content
  .split("SÃ©lectionner")
  .join("Sélectionner")
  .split("+ CrÃ©er")
  .join("+ Créer")
  .split("Aucun champ Ã  afficher")
  .join("Aucun champ à afficher");

// 2. Ajouter helpers internes si absents
if (!content.includes("function buildRelationCreateUrl")) {
  content = content.replace(
    `function normalizeFormFieldValue(
  field: ERPModuleField,
  value: unknown
): string {`,
    `function buildRelationCreateUrl({
  targetModule,
  fieldKey,
  prefill,
}: {
  targetModule: string;
  fieldKey: string;
  prefill?: Record<string, unknown>;
}) {
  const params =
    new URLSearchParams();

  Object.entries(prefill ?? {}).forEach(
    ([key, value]) => {
      if (
        value !== undefined &&
        value !== null
      ) {
        params.set(key, String(value));
      }
    }
  );

  if (typeof window !== "undefined") {
    params.set(
      "returnTo",
      window.location.pathname
    );

    const pathParts =
      window.location.pathname
        .split("/")
        .filter(Boolean);

    const parentModule =
      pathParts[0];

    const parentId =
      pathParts[1] ?? "";

    if (
      targetModule === "contrats" &&
      !params.has("dateDebut")
    ) {
      params.set(
        "dateDebut",
        new Date()
          .toISOString()
          .split("T")[0]
      );
    }

    if (
      fieldKey === "contratId" &&
      parentModule === "terrains" &&
      parentId
    ) {
      params.set("typeContrat", "terrain");
      params.set("terrainId", parentId);
      params.set("exploitationId", "");
      params.set(
        "lockFields",
        "typeContrat,terrainId,exploitationId"
      );
    }

    if (
      fieldKey === "contratId" &&
      parentModule === "exploitations" &&
      parentId
    ) {
      params.set("typeContrat", "exploitation");
      params.set("exploitationId", parentId);
      params.set("terrainId", "");
      params.set(
        "lockFields",
        "typeContrat,terrainId,exploitationId"
      );
    }
  }

  const query =
    params.toString();

  return query
    ? \`/\${targetModule}/nouveau?\${query}\`
    : \`/\${targetModule}/nouveau\`;
}

function normalizeFormFieldValue(
  field: ERPModuleField,
  value: unknown
): string {`
  );
}

// 3. Remplacer les gros blocs onClick relation create par un appel helper.
// Variante relationConfig?.create?.prefill
content = content.replace(
  /onClick=\{\(\) => \{\s*const targetModule =\s*relationConfig\?\.module;[\s\S]*?router\.push\(\s*`\/\$\{targetModule\}\/nouveau\?\$\{query\}`\s*\);\s*\}\}/g,
  `onClick={() => {
                const targetModule =
                  relationConfig?.module;

                if (!targetModule) {
                  return;
                }

                router.push(
                  buildRelationCreateUrl({
                    targetModule,
                    fieldKey: field.key,
                    prefill:
                      relationConfig?.create?.prefill ?? {},
                  })
                );
              }}`
);

// Variante typeof field.relation === "string" ...
content = content.replace(
  /onClick=\{\(\) => \{\s*const targetModule =\s*typeof field\.relation === "string"[\s\S]*?router\.push\(\s*`\/\$\{targetModule\}\/nouveau\?\$\{query\}`\s*\);\s*\}\}/g,
  `onClick={() => {
                const targetModule =
                  typeof field.relation === "string"
                    ? field.relation
                    : field.relation?.module;

                if (!targetModule) {
                  return;
                }

                router.push(
                  buildRelationCreateUrl({
                    targetModule,
                    fieldKey: field.key,
                    prefill:
                      typeof field.relation === "string"
                        ? {}
                        : field.relation?.create?.prefill ?? {},
                  })
                );
              }}`
);

// 4. Corriger le placeholder si encore cassé
content = content
  .split(`{field.placeholder ?? "SÃ©lectionner"}`)
  .join(`{field.placeholder ?? "Sélectionner"}`)
  .split(`+ CrÃ©er {field.label}`)
  .join(`+ Créer {field.label}`);

if (content === original) {
  throw new Error("Aucune modification appliquée. Inspection manuelle nécessaire.");
}

fs.writeFileSync(target, content, "utf8");

console.log("OK relation create / prefill UX assaini.");
console.log("Fichier modifié :", path.relative(ROOT, target));