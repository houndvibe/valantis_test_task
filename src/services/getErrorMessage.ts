import { AxiosError } from "axios";

//Формируем сообщение об ошибке
export const getErrorMessage = (error: unknown, method: string): string => {
  if (error instanceof AxiosError && error.response) {
    const message: string =
      error.response.status === 400
        ? "400: Неверный запрос"
        : error.response.status === 401
        ? "401: Ошибка авторизации"
        : error.response.status === 404
        ? "404: Страница не найдена"
        : error.response.status === 500
        ? "500: Ошибка сервера"
        : "Что то пошло не так...";
    return `В методe ${method} произошла ошибка: "${message}" Отправлен повторный запрос...`;
  } else {
    return "Произошла неизвестная ошибка";
  }
};
