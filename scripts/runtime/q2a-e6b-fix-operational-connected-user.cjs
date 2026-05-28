const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const rel = "src/components/erp/operational/ERPOperationalModulePage.tsx";
const file = path.join(ROOT, rel);

if (!fs.existsSync(file)) {
  throw new Error("File not found: " + file);
}

const original = fs.readFileSync(file, "utf8");
let content = original;

fs.writeFileSync(
  file + ".bak-q2a-e6b-fix-connected-user-fallback",
  original,
  "utf8"
);

/**
 * 1. Ajouter useEffect dans l'import React.
 */
content = content.replace(
  'import { useMemo, useState } from "react";',
  'import { useEffect, useMemo, useState } from "react";'
);

/**
 * 2. Ajouter imports Firebase auth direct fallback.
 */
if (!content.includes('import { onAuthStateChanged } from "firebase/auth";')) {
  content = content.replace(
    'import Link from "next/link";',
    'import Link from "next/link";\nimport { onAuthStateChanged } from "firebase/auth";'
  );
}

if (!content.includes('import { auth } from "@/lib/firebase/config";')) {
  content = content.replace(
    'import { useAuth } from "@/contexts/AuthContext";',
    'import { useAuth } from "@/contexts/AuthContext";\nimport { auth } from "@/lib/firebase/config";'
  );
}

/**
 * 3. Rendre getOperationalUserLabel plus utile : vide si aucun utilisateur.
 */
content = content.replace(
  /function getOperationalUserLabel\([\s\S]*?\n\}/,
  `function getOperationalUserLabel(
  user: {
    displayName?: string | null;
    email?: string | null;
  } | null
): string {
  if (!user) {
    return "";
  }

  return String(user.displayName ?? user.email ?? "").trim();
}`
);

/**
 * 4. Ajouter state fallback auth direct après useAuth().
 */
if (!content.includes("const [authUserLabel, setAuthUserLabel]")) {
  content = content.replace(
    `  const config = module.operational;
  const { user } = useAuth();`,
    `  const config = module.operational;
  const { user } = useAuth();
  const [authUserLabel, setAuthUserLabel] = useState("Utilisateur");`
  );
}

/**
 * 5. Ajouter effet d'écoute Firebase direct.
 */
if (!content.includes("onAuthStateChanged(auth")) {
  content = content.replace(
    `  const [filters, setFilters] = useState<Record<string, string>>({});
  const [search, setSearch] = useState("");`,
    `  const [filters, setFilters] = useState<Record<string, string>>({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    const current = auth.currentUser;
    const currentLabel = getOperationalUserLabel(current);

    if (currentLabel) {
      setAuthUserLabel(currentLabel);
    }

    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      const nextLabel = getOperationalUserLabel(nextUser);
      setAuthUserLabel(nextLabel || "Utilisateur");
    });

    return () => unsubscribe();
  }, []);`
  );
}

/**
 * 6. Utiliser user context si disponible, sinon fallback Firebase direct.
 */
content = content.replace(
  `  const userLabel = getOperationalUserLabel(user);`,
  `  const userLabel = getOperationalUserLabel(user) || authUserLabel;`
);

const problems = [];

if (!content.includes("onAuthStateChanged")) {
  problems.push("onAuthStateChanged absent");
}

if (!content.includes('import { auth } from "@/lib/firebase/config";')) {
  problems.push("import auth absent");
}

if (!content.includes("auth.currentUser")) {
  problems.push("auth.currentUser absent");
}

if (!content.includes("authUserLabel")) {
  problems.push("authUserLabel absent");
}

if (!content.includes("getOperationalUserLabel(user) || authUserLabel")) {
  problems.push("fallback userLabel non appliqué");
}

if (problems.length > 0) {
  console.log("[FAIL]");
  for (const problem of problems) console.log(" - " + problem);
  process.exit(1);
}

fs.writeFileSync(file, content, "utf8");

console.log("[DONE] Q2-A-E6B utilisateur connecté corrigé avec fallback Firebase auth.");
console.log("[WRITTEN]", rel);
console.log("");
console.log("Next:");
console.log("pnpm build");
