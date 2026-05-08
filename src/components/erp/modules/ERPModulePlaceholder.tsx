import { ERPEmptyState } from "@/components/erp/ui";

type ERPModulePlaceholderProps = {
  moduleLabel: string;
};

export function ERPModulePlaceholder({
  moduleLabel,
}: ERPModulePlaceholderProps) {
  return (
    <ERPEmptyState
      title={`${moduleLabel} pret`}
      description="Ce module est raccorde au shell ERP enterprise."
    />
  );
}