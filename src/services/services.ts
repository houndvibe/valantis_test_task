import ValantisApi, { FilterParams, ProductProps } from "../api/valantisApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const uniqueItems = Array.from(map.values());
  //Добавляем индексы для нумерации и key для правильной react-итерации строк.
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

//Заведем отдельный класс для ошибок api
export class ValantisApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValantisApiError";
  }
}

//////////Формируем сообщение об ошибке api
export const getErrorMessage = (error: unknown): string => {
  let message: string;
  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Something went wrong";
  }

  return message + ". Sending another request...";
};

//////////Формируем сообщение предупреждения о незаполненных параметрах фильтра
export const getFilterErrorMessage = (
  filterType: string,
  filterQuery: string | number
) => {
  if (!filterType) {
    return "Выберите тип фильтра";
  }

  if (filterType === "brand" && !filterQuery) {
    return "Укажите бренд ";
  }
  if (filterType === "product" && !filterQuery) {
    return "Укажите наименование ";
  }
};

//Функция, которая выводит ошибку в виде нотификации +  в консоль
export const showError = (error: unknown) => {
  console.error(error);
  toast.error(`${error}`);
};

type ValantisApiAdditionalMethods =
  | ((offset?: number | undefined, limit?: number | undefined) => Promise<void>)
  | ((params: FilterParams) => Promise<void>)
  | (() => Promise<void>)
  | (() => Promise<void>);

//функция для отправки повторного запрос при ошибке api
export const reconnectOnError = (
  func: ValantisApiAdditionalMethods,
  ...rest: (number | FilterParams | undefined)[]
) => {
  const bound = func.bind(ValantisApi, ...rest);
  setTimeout(() => {
    bound();
  }, 1500);
};
