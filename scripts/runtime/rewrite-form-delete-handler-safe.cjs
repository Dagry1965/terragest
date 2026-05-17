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

/**
 * 1) Add a dedicated safe delete handler before return.
 */
if (!content.includes("async function handleDeleteRecord()")) {
  const marker = `  return (
    <form`;

  if (!content.includes(marker)) {
    console.error("Return form marker not found.");
    process.exit(1);
  }

  const handler = `  async function handleDeleteRecord() {
    const confirmed = window.confirm(
      "Supprimer cet élément ?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await RuntimeDataBinding.delete(
        module,
        String(initialData.id)
      );

      router.push(
        module.metadata.routes?.list ??
          \`/\${module.metadata.key}\`
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Suppression impossible.";

      setErrors([
        {
          field: "delete",
          message,
        },
      ]);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }

`;

  content = content.replace(marker, handler + marker);
}

/**
 * 2) Replace the entire delete button block.
 */
const startMarker = `{mode === "edit" && Boolean(initialData?.id) ? (`;
const endMarker = `            ) : null}`;

const start = content.indexOf(startMarker);

if (start === -1) {
  console.error("Delete block start not found.");
  process.exit(1);
}

const end = content.indexOf(endMarker, start);

if (end === -1) {
  console.error("Delete block end not found.");
  process.exit(1);
}

const replacement = `{mode === "edit" && Boolean(initialData?.id) ? (
              <ERPButton
                type="button"
                variant="danger"
                disabled={saving}
                onClick={handleDeleteRecord}
              >
                Supprimer
              </ERPButton>
            ) : null}`;

content =
  content.slice(0, start) +
  replacement +
  content.slice(end + endMarker.length);

fs.writeFileSync(file, content, { encoding: "utf8" });

console.log("UPDATED src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx");
console.log("DONE rewrite safe delete handler");