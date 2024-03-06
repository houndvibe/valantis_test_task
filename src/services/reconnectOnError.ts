import { FilterParams } from "../types/interfaces";

//////////функция для отправки повторного запрос при ошибке api
export const reconnectOnError = <TParams>(
  func: TParams,
  ...rest: FilterParams[]
) => {
  console.log("повторный запросэ");
  console.log(func);
  setTimeout(() => {
    func(...rest);
  }, 1500);
};
