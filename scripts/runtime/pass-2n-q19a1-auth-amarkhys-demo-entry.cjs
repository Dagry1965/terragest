const fs = require("fs");
const path = require("path");

const root = process.cwd();

function file(relativePath) {
  return path.join(root, relativePath);
}

function read(relativePath) {
  return fs.readFileSync(file(relativePath), "utf8");
}

function write(relativePath, content) {
  fs.writeFileSync(file(relativePath), content, {
    encoding: "utf8",
  });
  console.log(`[WRITTEN] ${relativePath}`);
}

function backup(relativePath, suffix) {
  const source = file(relativePath);
  const target = file(`${relativePath}.bak-${suffix}`);

  if (!fs.existsSync(source)) {
    throw new Error(`Missing file: ${relativePath}`);
  }

  if (!fs.existsSync(target)) {
    fs.copyFileSync(source, target);
    console.log(`[BACKUP] ${relativePath}.bak-${suffix}`);
  } else {
    console.log(`[BACKUP_EXISTS] ${relativePath}.bak-${suffix}`);
  }
}

function replaceRegexRequired(content, regex, to, label) {
  if (!regex.test(content)) {
    throw new Error(`Pattern not found: ${label}`);
  }

  return content.replace(regex, to);
}

const suffix = "q19a1-auth-amarkhys-demo-entry";

const loginPage = "src/app/login/page.tsx";
const middleware = "src/middleware.ts";
const sidebar = "src/components/erp/shell/ErpSidebar.tsx";
const contextEnforcer = "src/runtime/context/RuntimeContextEnforcer.ts";

backup(loginPage, suffix);
backup(middleware, suffix);
backup(sidebar, suffix);
backup(contextEnforcer, suffix);

// 1. Login : redirection AMARKHYS après connexion
{
  let content = read(loginPage);

  content = replaceRegexRequired(
    content,
    /router\.push\(\s*["']\/workspaces\/general["']\s*\);/m,
    `router.push(
        "/dashboard/amarkhys"
      );`,
    "login redirect to general workspace"
  );

  content = content.replaceAll(
    "Connexion ERP",
    "Connexion AMARKHYS Garage"
  );

  content = content.replaceAll(
    "Email ou mot de passe invalide.",
    "Email ou mot de passe invalide. Vérifiez les identifiants du compte démo AMARKHYS."
  );

  content = content.replaceAll(
    `placeholder="Email"`,
    `placeholder="Email professionnel"`
  );

  content = content.replaceAll(
    `? "Connexion..."
              : "Se connecter"`,
    `? "Connexion..."
              : "Se connecter à AMARKHYS"`
  );

  write(loginPage, content);
}

// 2. Middleware : si déjà connecté et retour login -> AMARKHYS
{
  let content = read(middleware);

  content = replaceRegexRequired(
    content,
    /new URL\(\s*["']\/workspaces\/general["']\s*,\s*request\.url\s*\)/m,
    `new URL(
        "/dashboard/amarkhys",
        request.url
      )`,
    "middleware login redirect"
  );

  write(middleware, content);
}

// 3. Sidebar : correction textes visibles
{
  let content = read(sidebar);

  content = content
    .replaceAll("Véhicules", "Véhicules")
    .replaceAll("accès Ã", "accès à")
    .replaceAll("accès", "accès")
    .replaceAll("à", "à")
    .replaceAll("é", "é")
    .replaceAll("è", "è")
    .replaceAll("ê", "ê")
    .replaceAll("ô", "ô")
    .replaceAll("'", "’")
    .replaceAll(""¢", "•");

  write(sidebar, content);
}

// 4. RuntimeContextEnforcer : correction message erreur visible
{
  let content = read(contextEnforcer);

  content = content
    .replaceAll("Accès refusé", "Accès refusé")
    .replaceAll("é", "é")
    .replaceAll("è", "è")
    .replaceAll("à", "à")
    .replaceAll("'", "’");

  write(contextEnforcer, content);
}

console.log("");
console.log("[Q19A1_DONE] Auth AMARKHYS demo entry prepared.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  Tester /login -> connexion -> /dashboard/amarkhys");
console.log("  Tester accès direct /dashboard/amarkhys non connecté -> /login");
console.log("  git diff");