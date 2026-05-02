export const FilterUtils = {

  filterByField(
    items: any[],
    field: string,
    value: any
  ) {

    return items.filter(
      (item) =>
        item[field] === value
    );
  },
};
