import { ERPRegistry } from "@/runtime/registry";
import type { ERPSemanticSearchResult } from "./ERPSemanticSearchResult";

export function searchERPRuntime(
  query: string
): ERPSemanticSearchResult[] {
  const normalized =
    query.toLowerCase().trim();

  return ERPRegistry.modules()
    .filter((module) =>
      module.label.toLowerCase().includes(normalized) ||
      module.key.toLowerCase().includes(normalized) ||
      module.description?.toLowerCase().includes(normalized)
    )
    .map((module, index) => ({
      id: module.key,
      title: module.label,
      source: "Runtime Registry",
      score: 100 - index * 5,
      excerpt:
        module.description ??
        "Module ERP runtime.",
    }));
}