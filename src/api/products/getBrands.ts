import productsStore from "../../store/productsStore";
import ValantisApiBase from "../ValantisApiBase";

//getBrands озовляет быстро получить список брендов для дальнейшего использования в select-фильтре по бренду

export const getBrands = async () => {
  const brands = await ValantisApiBase.get_fields("brand");
  const filtered = brands.filter((item: string | null) => item);
  const uniqueBrands = new Set([...filtered]);
  productsStore.setBrands([...uniqueBrands]);
};
