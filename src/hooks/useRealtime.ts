"use client";

import {
  useEffect,
  useState,
} from "react";

export const useRealtime =
<T>(
  callback: () => Promise<T>,
  interval = 5000
) => {

  const [data,
    setData] =
    useState<T | null>(null);

  useEffect(() => {

    let mounted = true;

    const load =
      async () => {

        const result =
          await callback();

        if (mounted) {

          setData(result);
        }
      };

    load();

    const timer =
      setInterval(
        load,
        interval
      );

    return () => {

      mounted = false;

      clearInterval(timer);
    };

  }, []);

  return data;
}
