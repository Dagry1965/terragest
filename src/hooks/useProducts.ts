"use client";

import { useQuery }
from "@tanstack/react-query";

import { apiClient }
from "@/lib/api/apiClient";

export const useProducts =
() => {

  return useQuery({

    queryKey: [
      "products",
    ],

    queryFn:
      async () => {

        return apiClient.get(
          "/v1/products?organisationId=ORG_001"
        );
      },
  });
};
