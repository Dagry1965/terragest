import { ReactNode } from "react";
import { ErpShell } from "@/components/erp/shell/ErpShell";
import { ERPErrorBoundary } from "@/components/erp/errors/ERPErrorBoundary";

type Props = {
  children: ReactNode;
};

export default function PrivateLayout({ children }: Props) {
  return (
    <ERPErrorBoundary>
      <ErpShell>{children}</ErpShell>
    </ERPErrorBoundary>
  );
}