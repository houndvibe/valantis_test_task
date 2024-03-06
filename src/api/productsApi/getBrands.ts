import { reconnectOnError } from "../../services/reconnectOnError";
import productsStore from "../../store/productsStore";
import ValantisApiBase from "../ValantisApiBase";

//метод, который позовляет быстро получить список брендов для дальнейшего использования в select-фильтре по бренду
export const getBrands = async () => {
  try {
    const brands = await ValantisApiBase.get_fields("brand");
    const filtered = brands.filter((item: string | null) => item);
    const set = new Set([...filtered]);
    const uniqueItems: string[] = Array.from(set.values()) as string[];
    productsStore.setBrands(uniqueItems);
  } catch (error) {
    reconnectOnError(getBrands);
  }
};
