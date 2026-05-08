import { useEffect, useState }
from "react";

import type { RuntimeHealth }
from "../types/RuntimeHealth";

import { RuntimeObservabilityService }
from "../services/RuntimeObservabilityService";

export function useRuntimeHealth() {

  const [health, setHealth] =
    useState<RuntimeHealth | null>(
      null
    );

  useEffect(() => {

    const service =
      new RuntimeObservabilityService();

    service
      .getRuntimeHealth()
      .then(setHealth);

  }, []);

  return health;
}
