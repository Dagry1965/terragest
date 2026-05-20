const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

function assertProjectRoot() {
  if (
    !fs.existsSync(path.join(ROOT, "package.json")) ||
    !fs.existsSync(path.join(ROOT, "src"))
  ) {
    throw new Error("Ce script doit être lancé depuis la racine du projet Terragest.");
  }
}

function readFile(filePath) {
  return fs.readFileSync(filePath, "utf8").replace(/\r\n/g, "\n");
}

function writeFile(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, { encoding: "utf8" });
  console.log("[WRITTEN] " + path.relative(ROOT, filePath));
}

assertProjectRoot();

const targetPath = path.join(
  ROOT,
  "src",
  "components",
  "erp",
  "forms",
  "enterprise",
  "ERPEnterpriseForm.tsx"
);

let content = readFile(targetPath);

const oldBlock = `    } catch (error) {
      pendingWorkflowActionRef.current = null;

      console.error(
        "ERP ENTERPRISE FORM ERROR",
        error
      );
    } finally {`;

const newBlock = `    } catch (error) {
      pendingWorkflowActionRef.current = null;

      const message =
        error instanceof Error
          ? error.message
          : "Enregistrement impossible.";

      console.error(
        "ERP ENTERPRISE FORM ERROR",
        error
      );

      setErrors([
        {
          field: "runtime",
          message,
        },
      ]);
    } finally {`;

if (!content.includes(oldBlock)) {
  throw new Error("Bloc catch handleSubmit introuvable.");
}

content = content.replace(oldBlock, newBlock);

writeFile(targetPath, content);

console.log("");
console.log("[OK] Les erreurs runtime de formulaire sont maintenant affichées dans l'UI.");