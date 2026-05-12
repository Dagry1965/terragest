"use client";

import { useEffect, useState } from "react";

import { coreERPModules } from "@/runtime/modules/definitions/coreModules";
import { RuntimeRealtimeEngine } from "@/runtime/realtime/engine/RuntimeRealtimeEngine";

type UseRealtimeCollectionOptions = {
  collectionName?: string;
  collection?: string;
  organisationId?: string;
  limit?: number;
};

export const useRealtimeCollection = <T = Record<string, any>>({
  collectionName,
  collection,
}: UseRealtimeCollectionOptions) => {
  const targetCollection = collectionName ?? collection;

  const module = coreERPModules.find(
    (item) =>
      item.schema.collection === targetCollection ||
      item.metadata.key === targetCollection
  );

  const [data, setData] = useState<T[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!module) {
      setData([]);
      setCount(0);
      setLoading(false);
      return;
    }

    setLoading(true);

    const unsubscribe = RuntimeRealtimeEngine.subscribe(
      module,
      (payload) => {
        setCount(payload.count);
        setData([]);
        setLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [module]);

  return {
    data,
    count,
    loading,
  };
};