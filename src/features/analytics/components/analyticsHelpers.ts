export const buildCategoryAnalytics =
  (items: any[]) => {

    const map:
      Record<string, number> = {};

    items.forEach((item) => {

      const key =
        item.categorie ||
        "Non classé";

      map[key] =
        (map[key] || 0) + 1;
    });

    return Object.entries(map)
      .map(([name, value]) => ({
        name,
        value,
      }));
  };

export const buildMonthlyAnalytics =
  (items: any[]) => {

    const map:
      Record<string, number> = {};

    items.forEach((item) => {

      const date =
        new Date(
          item.createdAt
        );

      const month =
        `${date.getMonth() + 1}/${
          date.getFullYear()
        }`;

      map[month] =
        (map[month] || 0) + 1;
    });

    return Object.entries(map)
      .map(([name, value]) => ({
        name,
        value,
      }));
  };
