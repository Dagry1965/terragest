import { apiClient } from "@/services/apiClient";

export const ProductLookupService = {

  async findByCode(
    code: string,
    organisationId: string
  ) {

    const response =
      await apiClient.get(
        `/produits?organisationId=${organisationId}`
      );

    const produits =
      response.data || [];

    return produits.find(
      (item: any) =>
        item.codeBarre === code
    );
  },
};
