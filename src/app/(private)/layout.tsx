import { Sidebar }
from "@/components/layout/Sidebar";

import { Topbar }
from "@/components/layout/Topbar";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div
      className="
        flex
        min-h-screen
        bg-gray-100
      "
    >
      <Sidebar />

      <div className="flex-1">

        <Topbar />

        <main className="p-6">
          {children}
        </main>

      </div>
    </div>
  );
}