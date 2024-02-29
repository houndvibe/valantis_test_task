import { ProductProps } from "../api/valantisApi";

//Получаем форматированный таймштамп для авторизационного токена
export const getFormattedTimestamp = (currentDate: Date) => {
  const year = currentDate.getUTCFullYear();
  const month = (currentDate.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getUTCDate().toString().padStart(2, "0");
  return year + month + day;
};

//приводим полученные с сервера данные у необходимому виду
export const processTableData = (items: ProductProps[]) => {
  //удаляем дубли по id
  const map = new Map();
  for (const item of items) {
    if (!map.has(item.id)) {
      map.set(item.id, { ...item });
    }
  }
  const uniqueItems = Array.from(map.values());

  //добавляем индексы, key для итерации строк в реакте 
  const indexed = uniqueItems?.map((item, index) => {
    return {
      ...item,
      brand: item.brand || "-",
      index: index + 1,
      key: item.id,
    };
  });

  return indexed;
};
