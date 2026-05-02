"use client";

import {
  AppSidebar,
} from "@/components/sidebar/AppSidebar";

import {
  AppTopbar,
} from "@/components/topbar/AppTopbar";

import {
  NotificationCenter,
} from "@/components/notifications/NotificationCenter";

export const EnterpriseAppShell = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  return (

    <div className="
      flex
      bg-gray-100
      min-h-screen
    ">

      <AppSidebar />

      <div className="
        flex-1
        flex
        flex-col
      ">

        <AppTopbar />

        <main className="
          flex-1
          p-8
        ">

          {children}

        </main>

      </div>

      <NotificationCenter />

    </div>
  );
}
