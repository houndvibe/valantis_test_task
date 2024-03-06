//Получаем форматированный таймштамп для авторизационного токена
export const getFormattedTimestamp = () => {
  return new Date().toISOString().slice(0, 10).replace(/-/g, "");
};
