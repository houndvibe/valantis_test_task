import productsStore from "../../store/productsStore";
import ValantisApiBase from "../ValantisApiBase";

//метод, который позовляет быстро получить список цен для дальнейшего вычисления нижней и верхней границы фильтра цен

//в нашем случае это хорошее место чтобы определить размер массива до того как мы скачаем его с сервера.
export const getPrices = async () => {
  const prices = await ValantisApiBase.get_fields("price");
  productsStore.setDataArrayLength(prices.length);
  productsStore.setPrices(prices);
};
