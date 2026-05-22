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

  if (!fs.existsSync(target)) {
    fs.copyFileSync(source, target);
    console.log(`[BACKUP] ${relativePath}.bak-${suffix}`);
  } else {
    console.log(`[BACKUP_EXISTS] ${relativePath}.bak-${suffix}`);
  }
}

function replaceRequired(content, from, to, label) {
  if (!content.includes(from)) {
    throw new Error(`Pattern not found: ${label}`);
  }

  return content.replace(from, to);
}

const suffix = "q19d1a-wait-auth-before-relation-load";
const target = "src/components/erp/forms/enterprise/ERPFormField.tsx";

backup(target, suffix);

let content = read(target);

// Import useAuth
if (!content.includes("@/providers/AuthProvider")) {
  content = content.replace(
    `import { ERPRelationDataLoader } from "@/runtime/modules/lifecycle/ERPRelationDataLoader";`,
    `import { ERPRelationDataLoader } from "@/runtime/modules/lifecycle/ERPRelationDataLoader";
import {
  useAuth,
} from "@/providers/AuthProvider";`
  );
}

// Add auth state inside component
if (!content.includes("authLoading")) {
  content = replaceRequired(
    content,
    `  const router = useRouter();

  const [relationOptions, setRelationOptions] = useState<RelationOption[]>([]);`,
    `  const router = useRouter();

  const {
    loading: authLoading,
    user: authUser,
  } = useAuth();

  const [relationOptions, setRelationOptions] = useState<RelationOption[]>([]);`,
    "insert useAuth state"
  );
}

// Replace relation loading effect
content = replaceRequired(
  content,
  `  useEffect(() => {
    async function loadRelation() {
      if (field.type !== "relation") return;

      const targetModule =
        getRelationTargetModule(field);

      if (!targetModule) return;

      try {
        const options = await ERPRelationDataLoader.load(targetModule);
        setRelationOptions(options as RelationOption[]);
      } catch (error) {
        console.error("ERP RELATION LOAD ERROR", error);
        setRelationOptions([]);
      }
    }

    loadRelation();
  }, [field]);`,
  `  useEffect(() => {
    async function loadRelation() {
      if (field.type !== "relation") return;

      if (authLoading) {
        return;
      }

      const targetModule =
        getRelationTargetModule(field);

      if (!targetModule) return;

      try {
        const options =
          await ERPRelationDataLoader.load(targetModule);

        setRelationOptions(options as RelationOption[]);
      } catch (error) {
        console.error("ERP RELATION LOAD ERROR", error);
        setRelationOptions([]);
      }
    }

    loadRelation();
  }, [
    field,
    authLoading,
    authUser?.uid,
  ]);`,
  "replace relation load effect"
);

write(target, content);

console.log("");
console.log("[Q19D1A_DONE] Relation dropdowns now wait for auth session before loading.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  Tester /vehicules/nouveau client dropdown");