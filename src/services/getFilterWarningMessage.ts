//////////Формируем предупреждение о незаполненных полях фильтра
export const getFilterWarningMessage = (
  filterType: string,
  filterQuery: string | number
) => {
  return !filterType
    ? "Выберите тип фильтра"
    : filterType === "brand" && !filterQuery
    ? "Укажите бренд "
    : filterType === "product" && !filterQuery
    ? "Укажите наименование "
    : filterType === "price" && !filterQuery
    ? "Укажите цену"
    : "";
};
