import { API_RECONNECT_COOLDOWN } from "../consts/consts";

//функция для отправки повторного запрос при ошибке api
export const reconnectOnError = <TParams>(
  func: (...rest: TParams[]) => void,
  ...rest: TParams[]
) => {
  setTimeout(func, API_RECONNECT_COOLDOWN, ...rest);
};
