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

if (!content.includes("async function handleDeleteRecord()")) {
  const marker = "  return (\r\n    <form";
  const markerLf = "  return (\n    <form";

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

  if (content.includes(marker)) {
    content = content.replace(marker, handler + marker);
  } else if (content.includes(markerLf)) {
    content = content.replace(markerLf, handler + markerLf);
  } else {
    console.error("RETURN FORM MARKER NOT FOUND");
    process.exit(1);
  }
}

const start = content.indexOf(
  `{mode === "edit" && Boolean(initialData?.id) ? (`
);

if (start === -1) {
  console.error("DELETE BLOCK START NOT FOUND");
  process.exit(1);
}

const end = content.indexOf(
  `            ) : null}`,
  start
);

if (end === -1) {
  console.error("DELETE BLOCK END NOT FOUND");
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
  content.slice(end + `            ) : null}`.length);

fs.writeFileSync(file, content, { encoding: "utf8" });

console.log("UPDATED ERPEnterpriseForm safe delete handler");