const fs = require("fs");
const path = require("path");

const root = process.cwd();

function full(relativePath) {
  return path.join(root, relativePath);
}

function write(relativePath, content) {
  const file = full(relativePath);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, "utf8");
  console.log("[WRITTEN]", relativePath);
}

function backup(relativePath, suffix) {
  const file = full(relativePath);
  if (!fs.existsSync(file)) return;

  const bak = file + "." + suffix;
  if (!fs.existsSync(bak)) {
    fs.copyFileSync(file, bak);
    console.log("[BACKUP]", path.relative(root, bak));
  }
}

const componentPath = "src/components/erp/runtime/ERPRuntimeActionBar.tsx";
const indexPath = "src/components/erp/runtime/index.ts";

backup(componentPath, "bak-q2op-i10-runtime-action-bar");
backup(indexPath, "bak-q2op-i10-runtime-action-bar-index");

const component = `"use client";

import Link from "next/link";
import type { ReactNode } from "react";

export type ERPRuntimeActionBarTone =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "muted";

export type ERPRuntimeActionBarAction = {
  key: string;
  label: string;
  description?: string;
  href?: string;
  disabled?: boolean;
  loading?: boolean;
  hidden?: boolean;
  tone?: ERPRuntimeActionBarTone;
  icon?: ReactNode;
  onClick?: () => void | Promise<void>;
};

export type ERPRuntimeActionBarProps = {
  title?: string;
  description?: string;
  actions?: ERPRuntimeActionBarAction[];
  compact?: boolean;
  className?: string;
};

function actionClassName(
  tone: ERPRuntimeActionBarTone = "default",
  disabled?: boolean
): string {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-black transition focus:outline-none focus:ring-2 focus:ring-offset-2";

  const tones: Record<ERPRuntimeActionBarTone, string> = {
    default:
      "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50 focus:ring-slate-300",
    primary:
      "border border-slate-950 bg-slate-950 text-white hover:bg-slate-800 focus:ring-slate-400",
    success:
      "border border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-300",
    warning:
      "border border-amber-500 bg-amber-500 text-white hover:bg-amber-600 focus:ring-amber-300",
    danger:
      "border border-rose-600 bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-300",
    muted:
      "border border-slate-200 bg-slate-100 text-slate-600 hover:bg-slate-200 focus:ring-slate-300",
  };

  const state = disabled
    ? " pointer-events-none cursor-not-allowed opacity-50"
    : "";

  return [base, tones[tone], state].join(" ");
}

function RuntimeActionButton({
  action,
}: {
  action: ERPRuntimeActionBarAction;
}) {
  const content = (
    <>
      {action.icon ? <span className="shrink-0">{action.icon}</span> : null}
      <span>{action.loading ? "Traitement..." : action.label}</span>
    </>
  );

  const className = actionClassName(
    action.tone ?? "default",
    action.disabled || action.loading
  );

  if (action.href && !action.disabled && !action.loading) {
    return (
      <Link href={action.href} className={className} title={action.description}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={className}
      disabled={action.disabled || action.loading}
      title={action.description}
      onClick={action.onClick}
    >
      {content}
    </button>
  );
}

export function ERPRuntimeActionBar({
  title = "Actions métier",
  description,
  actions = [],
  compact = false,
  className = "",
}: ERPRuntimeActionBarProps) {
  const visibleActions = actions.filter((action) => !action.hidden);

  if (visibleActions.length === 0) {
    return null;
  }

  return (
    <section
      className={[
        "rounded-[2rem] border border-slate-200 bg-white shadow-sm",
        compact ? "p-4" : "p-5",
        className,
      ].join(" ")}
      data-runtime-action-bar="true"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
            Runtime
          </p>
          <h2 className="mt-1 text-lg font-black text-slate-950">{title}</h2>
          {description ? (
            <p className="mt-1 max-w-3xl text-sm text-slate-500">
              {description}
            </p>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {visibleActions.map((action) => (
            <RuntimeActionButton key={action.key} action={action} />
          ))}
        </div>
      </div>
    </section>
  );
}
`;

write(componentPath, component);

let index = fs.existsSync(full(indexPath))
  ? fs.readFileSync(full(indexPath), "utf8")
  : "";

if (!index.includes('ERPRuntimeActionBar')) {
  index += `${index.endsWith("\n") || index.length === 0 ? "" : "\n"}export { ERPRuntimeActionBar } from "./ERPRuntimeActionBar";
export type {
  ERPRuntimeActionBarAction,
  ERPRuntimeActionBarProps,
  ERPRuntimeActionBarTone,
} from "./ERPRuntimeActionBar";
`;
  write(indexPath, index);
} else {
  console.log("[SKIP] ERPRuntimeActionBar already exported.");
}

const written = fs.readFileSync(full(componentPath), "utf8");

const required = [
  "ERPRuntimeActionBar",
  "ERPRuntimeActionBarAction",
  "data-runtime-action-bar",
  "actions.filter",
  "RuntimeActionButton",
];

for (const marker of required) {
  if (!written.includes(marker)) {
    console.error("[FAIL] Missing marker:", marker);
    process.exit(1);
  }
}

console.log("[Q2-OP-I10] ERPRuntimeActionBar created.");
console.log("Next:");
console.log("  pnpm build");
console.log("  git status --short");