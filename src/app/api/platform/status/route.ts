// src/app/api/platform/status/route.ts

import { NextResponse }
from "next/server";

import { ERPMonitoringService }
from "@/platform/monitoring/ERPMonitoringService";

export async function GET() {

  const status =
    ERPMonitoringService
      .getStatus();

  return NextResponse.json(
    status
  );
}