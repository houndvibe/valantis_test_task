//////////Формируем сообщение об ошибке
export const getErrorMessage = (error: unknown, method: string): string => {
  const message: string =
    error instanceof Error
      ? error.message
      : error && typeof error === "object" && "message" in error
      ? String(error.message)
      : typeof error === "string"
      ? error
      : "Something went wrong";

  return `В методe ${method} произошла ошибка: "${message}" Отправляем повторный запрос...`;
};
