// src/app/page.tsx

"use client";

import { useRouter }
from "next/navigation";

import { useEffect }
from "react";

import { ERPLayout }
from "@/components/layout/ERPLayout";

import { AuthGuard }
from "@/platform/auth/guards/AuthGuard";

export default function HomePage() {

  const router =
    useRouter();

  useEffect(() => {

    const allowed =
      AuthGuard.check();

    if (!allowed) {

      router.push(
        "/login"
      );
    }

  }, [router]);

  return (

    <ERPLayout>

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-6
        "
      >

        <div
          className="
            bg-white
            rounded-2xl
            shadow-sm
            p-6
          "
        >
          Stocks
        </div>

        <div
          className="
            bg-white
            rounded-2xl
            shadow-sm
            p-6
          "
        >
          Maintenance
        </div>

        <div
          className="
            bg-white
            rounded-2xl
            shadow-sm
            p-6
          "
        >
          Paiements
        </div>

        <div
          className="
            bg-white
            rounded-2xl
            shadow-sm
            p-6
          "
        >
          Workflows
        </div>

      </div>

    </ERPLayout>
  );
}
