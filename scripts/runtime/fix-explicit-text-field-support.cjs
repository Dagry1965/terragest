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

// Correction encodage résiduel visible dans le bouton relation.
content = content.split("+ CrÃ©er").join("+ Créer");

// Remplacement du fallback final input.
// Objectifs :
// - support explicite text/email/phone/number/date/datetime
// - disabled si champ verrouillé
// - className verrouillée si isLocked
// - placeholder homogène
const oldBlock = `  return (
    <FieldWrapper field={field}>
      <label className="block space-y-2">
        {label}

        <input
          name={field.key}
          required={field.required}
          value={currentValue}
          onChange={(event) => onChange?.(field.key, event.target.value)}
          type={
            field.type === "number"
              ? "number"
              : field.type === "date"
              ? "date"
              : field.type === "email"
              ? "email"
              : field.type === "phone"
              ? "tel"
              : "text"
          }
          placeholder={field.placeholder ?? field.label}
          className={className}
        />
      </label>
    </FieldWrapper>
  );`;

const newBlock = `  const primitiveInputType =
    field.type === "text"
      ? "text"
      : field.type === "number"
        ? "number"
        : field.type === "date"
          ? "date"
          : field.type === "datetime"
            ? "datetime-local"
            : field.type === "email"
              ? "email"
              : field.type === "phone"
                ? "tel"
                : "text";

  return (
    <FieldWrapper field={field}>
      <label className="block space-y-2">
        {label}

        <input
          name={field.key}
          required={field.required}
          value={currentValue}
          disabled={isLocked}
          onChange={(event) => onChange?.(field.key, event.target.value)}
          type={primitiveInputType}
          placeholder={field.placeholder ?? field.label}
          className={isLocked ? lockedClassName : className}
        />
      </label>
    </FieldWrapper>
  );`;

if (!content.includes(oldBlock)) {
  throw new Error("Fallback input final non trouvé. Aucun changement appliqué.");
}

content = content.replace(oldBlock, newBlock);

if (content === original) {
  console.log("Aucune modification nécessaire.");
  process.exit(0);
}

fs.writeFileSync(target, content, "utf8");

console.log("OK ERPFormField fallback assaini.");
console.log("Fichier modifié :", path.relative(ROOT, target));