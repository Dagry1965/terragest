export const SortUtils = {

  sortByField(
    items: any[],
    field: string
  ) {

    return items.sort(
      (
        a,
        b
      ) => {

        if (
          a[field] < b[field]
        ) {

          return -1;
        }

        if (
          a[field] > b[field]
        ) {

          return 1;
        }

        return 0;
      }
    );
  },
};
