import Link from "next/link";
import type { ERPModule } from "@/runtime/modules";

interface ERPBreadcrumbsProps {
  module: ERPModule;
  current?: string;
}

export function ERPBreadcrumbs({ module, current = "Liste" }: ERPBreadcrumbsProps) {
  return (
    <nav className="mb-4 flex items-center gap-2 text-sm text-slate-500">
      <Link href="/dashboard" className="font-medium hover:text-slate-900">
        Dashboard
      </Link>
      <span>/</span>
      <span className="font-medium text-slate-700">{module.metadata.label}</span>
      <span>/</span>
      <span>{current}</span>
    </nav>
  );
}