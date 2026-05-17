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
const before = content;

content = content.replace(
  `                  await RuntimeDataBinding.delete(
                    module,
                    String(initialData.id)
                  );

                  router.push(
                    module.metadata.routes?.list ??
                      \`/\${module.metadata.key}\`
                  );`,
  `                  try {
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
                  }`
);

content = content.replaceAll(
  "Supprimer cet Ã©lÃ©ment ?",
  "Supprimer cet élément ?"
);

if (content === before) {
  console.log("NO CHANGE");
  console.log("Inspect delete block manually.");
  process.exit(0);
}

fs.writeFileSync(file, content, { encoding: "utf8" });

console.log("UPDATED src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx");
console.log("DONE show referential integrity delete errors");