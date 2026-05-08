"use client";

import {
  useEffect,
}
from "react";

import {
  RuntimeScheduler,
}
from "@/runtime/scheduler/RuntimeScheduler";

export function RuntimeSchedulerBootstrap() {

  useEffect(() => {

    RuntimeScheduler.start();

  }, []);

  return null;
}
