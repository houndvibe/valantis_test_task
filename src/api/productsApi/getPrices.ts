import { reconnectOnError } from "../../services/reconnectOnError";
import productsStore from "../../store/productsStore";
import ValantisApiBase from "../ValantisApiBase";

//метод, который позовляет быстро получить список цен для дальнейшего вычисления нижней и верхней границы фильтра цен
//в нашем случае это хорошее место чтобы определить размер массива данных о продуктах
export const getPrices = async () => {
  try {
    const prices = await ValantisApiBase.get_fields("price");
    productsStore.setDataArrayLength(prices.length);
    productsStore.setPrices(prices);
  } catch (error) {
    reconnectOnError(getPrices);
  }
};
