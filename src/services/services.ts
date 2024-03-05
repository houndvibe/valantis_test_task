import ValantisApi, { FilterParams, ProductProps } from "../api/valantisApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import productsStore from "../store/productsStore";

//////////Получаем форматированный таймштамп для авторизационного токена
export const getFormattedTimestamp = (currentDate: Date) => {
  const year = currentDate.getUTCFullYear();
  const month = (currentDate.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getUTCDate().toString().padStart(2, "0");
  return year + month + day;
};

//////////Приводим полученные с сервера данные к необходимому виду
export const processTableData = (items: ProductProps[]) => {
  //Удаляем дубли по id
  const map = new Map();
  for (const item of items) {
    if (!map.has(item.id)) {
      map.set(item.id, { ...item });
    }
  }
  const uniqueProducts = Array.from(map.values());

  //Добавляем индексы для нумерации и key для правильной react-итерации строк.
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

////////////Заведем отдельный класс для ошибок api
export class ValantisApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValantisApiError";
  }
}

//////////Формируем сообщение об ошибке api
export const getErrorMessage = (error: unknown): string => {
  const message: string =
    error instanceof Error
      ? error.message
      : error && typeof error === "object" && "message" in error
      ? String(error.message)
      : typeof error === "string"
      ? error
      : "Something went wrong";

  return message + ". Sending another request...";
};

//////////Формируем сообщение предупреждения о незаполненных параметрах фильтра
export const getFilterErrorMessage = (
  filterType: string,
  filterQuery: string | number
) => {
  return !filterType
    ? "Выберите тип фильтра"
    : filterType === "brand" && !filterQuery
    ? "Укажите бренд "
    : filterType === "product" && !filterQuery
    ? "Укажите наименование "
    : "";
};

//////////Функция, которая выводит ошибку в консоль + в виде нотификации
export const showError = (error: unknown) => {
  console.error(error);

  if (!productsStore.isError) {
    toast.error(`${error}`);
    productsStore.setisError(true);
    setTimeout(() => {
      productsStore.setisError(false);
    }, 3000);
  }
};

type ValantisApiAdditionalMethods =
  | ((offset?: number | undefined, limit?: number | undefined) => Promise<void>)
  | ((params: FilterParams) => Promise<void>)
  | (() => Promise<void>)
  | (() => Promise<void>);

//////////функция для отправки повторного запрос при ошибке api
export const reconnectOnError = (
  func: ValantisApiAdditionalMethods,
  ...rest: (number | FilterParams | undefined)[]
) => {
  const bound = func.bind(ValantisApi, ...rest);

  setTimeout(() => {
    bound();
  }, 1500);
};
