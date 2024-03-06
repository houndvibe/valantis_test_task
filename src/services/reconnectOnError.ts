//////////функция для отправки повторного запрос при ошибке api
export const reconnectOnError = <TParams>(
  func: (...rest: TParams[]) => void,
  ...rest: TParams[]
) => {
  setTimeout(() => {
    func(...rest);
  }, 1500);
};
