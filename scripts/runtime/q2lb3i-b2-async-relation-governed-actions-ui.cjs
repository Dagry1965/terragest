const fs = require("fs");
const path = require("path");

const root = process.cwd();

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function write(file, content) {
  fs.writeFileSync(path.join(root, file), content, "utf8");
}

function replaceOrFail(file, content, regex, replacement) {
  if (!regex.test(content)) {
    throw new Error(`[MISSING REGEX] ${file}\n${regex}`);
  }
  return content.replace(regex, replacement);
}

let changed = 0;

// 1) RuntimeActionEngine : add async action availability resolver
{
  const file = "src/runtime/actions/RuntimeActionEngine.ts";
  let content = read(file);
  const before = content;

  if (!content.includes("static async getAvailableActionsAsync")) {
    const asyncBlock = `
  static async getAvailableActionsAsync({
    actions = [],
    userPermissions = ["*"],
    workflow,
    record,
  }: {
    actions?: ERPModuleAction[];
    userPermissions?: string[];
    workflow?: ERPModuleWorkflow;
    record?: Record<string, unknown>;
  }): Promise<RuntimeGovernedAction[]> {
    const availableActions =
      RuntimeActionEngine.getAvailableActions({
        actions,
        userPermissions,
        workflow,
        record,
      });

    const governedActions: RuntimeGovernedAction[] = [];

    for (const action of availableActions) {
      const relationGovernanceBlockReason =
        await RuntimeActionEngine.getRelationGovernanceBlockReason({
          action,
          record,
        });

      if (relationGovernanceBlockReason) {
        governedActions.push({
          ...action,
          disabled: true,
          description: relationGovernanceBlockReason,
        });
        continue;
      }

      governedActions.push(action);
    }

    return governedActions;
  }

`;

    content = replaceOrFail(
      file,
      content,
      /\n\s*static\s+async\s+execute\s*\(\s*\{/,
      "\n" + asyncBlock + "  static async execute({"
    );
  }

  if (content !== before) {
    write(file, content);
    changed++;
    console.log("[UPDATED]", file);
  } else {
    console.log("[UNCHANGED]", file);
  }
}

// 2) ERPRuntimePage : use async runtime actions state
{
  const file = "src/components/erp/runtime/ERPRuntimePage.tsx";
  let content = read(file);
  const before = content;

  if (!content.includes("setRuntimeActions")) {
    content = replaceOrFail(
      file,
      content,
      /(\s*const \[loading, setLoading\] =\s*\n\s*useState\(false\);)/,
      `$1

  const [runtimeActions, setRuntimeActions] =
    useState<ERPRuntimePageActionSource[]>([]);`
    );
  }

  if (!content.includes("Q2_L_B3_I_B2_ASYNC_RELATION_GOVERNED_ACTIONS")) {
    content = replaceOrFail(
      file,
      content,
      /(\s*useEffect\(\(\) => \{\s*\n\s*async function loadData\(\) \{[\s\S]*?\n\s*\}, \[module, type\]\);\s*)/,
      `$1

  // Q2_L_B3_I_B2_ASYNC_RELATION_GOVERNED_ACTIONS
  // Resolve action availability asynchronously so relation-based governance
  // can disable actions before the user clicks.
  useEffect(() => {
    let mounted = true;

    async function loadRuntimeActions() {
      const removedRecord =
        Boolean(currentRecord?.removedAt);

      if (
        (type !== "detail" && type !== "edit") ||
        !module ||
        !currentRecord ||
        removedRecord
      ) {
        if (mounted) {
          setRuntimeActions([]);
        }

        return;
      }

      const actions =
        await RuntimeActionEngine.getAvailableActionsAsync({
          actions: module.actions ?? [],
          workflow: module.workflows?.[0],
          record: currentRecord,
        });

      if (mounted) {
        setRuntimeActions(
          actions as ERPRuntimePageActionSource[]
        );
      }
    }

    void loadRuntimeActions();

    return () => {
      mounted = false;
    };
  }, [module, type, currentRecord]);
`
    );
  }

  // Remove old synchronous runtimeActions const block.
  content = content.replace(
    /\n\s*const runtimeActions =\s*\n\s*\n\s*\n\s*\(type === "detail" \|\| type === "edit"\) && !isRemovedRecord\s*\n\s*\n\s*\n\s*\? RuntimeActionEngine\.getAvailableActions\(\{[\s\S]*?\n\s*: \[\];/,
    ""
  );

  // Fallback removal for slightly different spacing.
  content = content.replace(
    /\n\s*const runtimeActions =[\s\S]*?RuntimeActionEngine\.getAvailableActions\(\{[\s\S]*?record: currentRecord,[\s\S]*?\}\)\s*: \[\];/,
    ""
  );

  if (content !== before) {
    write(file, content);
    changed++;
    console.log("[UPDATED]", file);
  } else {
    console.log("[UNCHANGED]", file);
  }
}

console.log("[Q2-L-B3-I-B2] Changed files:", changed);