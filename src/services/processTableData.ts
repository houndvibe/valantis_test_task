import { ProductProps } from "../types/interfaces";

//////////Приводим полученные с сервера данные к необходимому виду
export const processTableData = (items: ProductProps[]) => {
  //Удаляем дубли по id
  const map = new Map();
  for (const item of items) {
    !map.has(item.id) && map.set(item.id, { ...item });
  }
  const uniqueProducts = [...map.values()];

  //Добавляем индексы для нумерации и key для правильной react-итерации строк в antd-таблице.
  const processedProductsData = uniqueProducts?.map((product, index) => {
    return {
      ...product,
      brand: product.brand || "-",
      index: index + 1,
      key: product.id,
    };
  });

  return processedProductsData;
};
