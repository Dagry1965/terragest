export const PaginationUtils = {

  paginate(
    items: any[],
    page: number,
    limit: number
  ) {

    const start =
      (page - 1) * limit;

    const end =
      start + limit;

    return {

      data:
        items.slice(
          start,
          end
        ),

      total:
        items.length,

      page,

      limit,
    };
  },
};
