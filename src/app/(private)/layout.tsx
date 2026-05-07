import { ReactNode } from "react";
import { ErpShell } from "@/components/erp/shell/ErpShell";

type Props = {
  children: ReactNode;
};

export default function PrivateLayout({ children }: Props) {
  return <ErpShell>{children}</ErpShell>;
}
