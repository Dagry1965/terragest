const fs = require("fs");
const path = require("path");

const root = process.cwd();
const target = path.join(
  root,
  "src",
  "runtime",
  "modules",
  "generated",
  "facturesauto",
  "facturesauto.module.ts"
);

const passName = "billing-model-b-enrich-facturesauto-source-fields";

function fail(message) {
  console.error(`[${passName}] FAIL: ${message}`);
  process.exit(1);
}

function ok(message) {
  console.log(`[${passName}] OK: ${message}`);
}

function info(message) {
  console.log(`[${passName}] ${message}`);
}

if (!fs.existsSync(target)) {
  fail(`Target file not found: ${target}`);
}

let source = fs.readFileSync(target, "utf8");

if (!source.includes("facturesauto")) {
  fail("Target does not look like facturesauto.module.ts");
}

const backup = `${target}.bak-${passName}`;
if (!fs.existsSync(backup)) {
  fs.writeFileSync(backup, source, "utf8");
  ok(`Backup created: ${backup}`);
} else {
  info(`Backup already exists: ${backup}`);
}

const fieldsToEnsure = [
  {
    key: "typeFacture",
    block: `    {
      key: "typeFacture",
      label: "Type de facture",
      type: "select",
      required: false,
      options: [
        { value: "atelier", label: "Atelier" },
        { value: "boutique", label: "Boutique" },
        { value: "mixte", label: "Mixte" },
        { value: "autre", label: "Autre" },
      ],
      defaultValue: "atelier",
      group: "Origine métier",
    },`
  },
  {
    key: "sourceScope",
    block: `    {
      key: "sourceScope",
      label: "Périmètre source",
      type: "select",
      required: false,
      options: [
        { value: "single", label: "Source unique" },
        { value: "multiple", label: "Sources multiples" },
      ],
      defaultValue: "single",
      group: "Origine métier",
    },`
  },
  {
    key: "sourceType",
    block: `    {
      key: "sourceType",
      label: "Type de source",
      type: "select",
      required: false,
      options: [
        { value: "atelier", label: "Atelier" },
        { value: "boutique", label: "Boutique" },
        { value: "commande", label: "Commande" },
        { value: "autre", label: "Autre" },
      ],
      defaultValue: "atelier",
      group: "Origine métier",
    },`
  },
  {
    key: "sourceModule",
    block: `    {
      key: "sourceModule",
      label: "Module source",
      type: "text",
      required: false,
      readOnly: true,
      group: "Origine métier",
    },`
  },
  {
    key: "sourceRecordId",
    block: `    {
      key: "sourceRecordId",
      label: "Enregistrement source",
      type: "text",
      required: false,
      readOnly: true,
      group: "Origine métier",
    },`
  },
  {
    key: "sourceLabel",
    block: `    {
      key: "sourceLabel",
      label: "Libellé source",
      type: "text",
      required: false,
      readOnly: true,
      group: "Origine métier",
    },`
  }
];

function hasField(content, key) {
  return (
    content.includes(`key: "${key}"`) ||
    content.includes(`key: '${key}'`) ||
    content.includes(`name: "${key}"`) ||
    content.includes(`name: '${key}'`)
  );
}

const missingFields = fieldsToEnsure.filter((field) => !hasField(source, field.key));

if (missingFields.length === 0) {
  ok("All billing source fields already exist. No schema insertion needed.");
} else {
  const markerCandidates = [
    `key: "interventionId"`,
    `key: 'interventionId'`,
    `name: "interventionId"`,
    `name: 'interventionId'`,
    `key: "clientId"`,
    `key: 'clientId'`,
    `name: "clientId"`,
    `name: 'clientId'`
  ];

  let markerIndex = -1;
  let marker = null;

  for (const candidate of markerCandidates) {
    const index = source.indexOf(candidate);
    if (index !== -1) {
      markerIndex = index;
      marker = candidate;
      break;
    }
  }

  if (markerIndex === -1) {
    fail("Could not find a safe insertion marker such as interventionId or clientId.");
  }

  const beforeMarker = source.lastIndexOf("{", markerIndex);
  if (beforeMarker === -1) {
    fail("Could not find start of marker field block.");
  }

  const insertion = missingFields.map((field) => field.block).join("\n");

  source =
    source.slice(0, beforeMarker) +
    insertion +
    "\n" +
    source.slice(beforeMarker);

  ok(`Inserted fields before marker ${marker}: ${missingFields.map((field) => field.key).join(", ")}`);
}

function ensureArrayValues(content, arrayName, values) {
  const arrayRegex = new RegExp(`(${arrayName}\\s*:\\s*\\[)([\\s\\S]*?)(\\])`, "m");
  const match = content.match(arrayRegex);

  if (!match) {
    info(`Array ${arrayName} not found. Skipped.`);
    return content;
  }

  let body = match[2];
  const additions = [];

  for (const value of values) {
    if (!body.includes(`"${value}"`) && !body.includes(`'${value}'`)) {
      additions.push(`"${value}"`);
    }
  }

  if (additions.length === 0) {
    ok(`${arrayName} already contains required values.`);
    return content;
  }

  const trimmedBody = body.trim();
  const prefix = match[1];
  const suffix = match[3];

  let newBody;
  if (trimmedBody.length === 0) {
    newBody = `\n    ${additions.join(",\n    ")}\n  `;
  } else {
    const needsComma = trimmedBody.endsWith(",") ? "" : ",";
    newBody = `${body}${needsComma}\n    ${additions.join(",\n    ")}`;
  }

  ok(`Updated ${arrayName}: ${additions.join(", ")}`);

  return content.replace(arrayRegex, `${prefix}${newBody}${suffix}`);
}

source = ensureArrayValues(source, "readOnlyFields", [
  "sourceModule",
  "sourceRecordId",
  "sourceLabel"
]);

source = ensureArrayValues(source, "labelFields", [
  "numeroFacture",
  "typeFacture"
]);

function ensureFormFields(content, fields) {
  const formRegex = /(form\s*:\s*{[\s\S]*?tabs\s*:\s*\[[\s\S]*?sections\s*:\s*\[[\s\S]*?fields\s*:\s*\[)([\s\S]*?)(\])/m;
  const match = content.match(formRegex);

  if (!match) {
    info("Form fields array not found with generic regex. Schema fields were still enriched.");
    return content;
  }

  let body = match[2];
  const additions = [];

  for (const field of fields) {
    if (!body.includes(`"${field}"`) && !body.includes(`'${field}'`)) {
      additions.push(`"${field}"`);
    }
  }

  if (additions.length === 0) {
    ok("Form already contains required billing source fields.");
    return content;
  }

  const needsComma = body.trim().endsWith(",") || body.trim().length === 0 ? "" : ",";
  const newBody = `${body}${needsComma}\n              ${additions.join(",\n              ")}`;

  ok(`Updated first form fields section: ${additions.join(", ")}`);

  return content.replace(formRegex, `${match[1]}${newBody}${match[3]}`);
}

source = ensureFormFields(source, [
  "typeFacture",
  "sourceScope",
  "sourceType",
  "sourceModule",
  "sourceRecordId",
  "sourceLabel"
]);

fs.writeFileSync(target, source, "utf8");

ok("facturesauto enriched as common financial invoice header.");
ok("Next: run npm run build, then inspect git diff before commit.");
