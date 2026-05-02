export const DataWarehouseService = {

  async store(
    dataset: string,
    payload: any
  ) {

    console.log(

      `[WAREHOUSE]`,
      dataset,
      payload
    );

    return {

      success: true,
    };
  },
};
