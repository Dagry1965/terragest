import { ReactNode } from "react";
import { ErpSidebar } from "./ErpSidebar";
import { ErpTopbar } from "./ErpTopbar";

type Props = {
  children: ReactNode;
};

export function ErpShell({ children }: Props) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen">
        <ErpSidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <ErpTopbar />

          <main className="flex-1 px-6 py-6 lg:px-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
