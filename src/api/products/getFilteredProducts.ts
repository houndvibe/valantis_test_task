import { reconnectOnError } from "../../services/reconnectOnError";
import productsStore from "../../store/productsStore";
import { FilterParams } from "../../types/interfaces";
import ValantisApiBase from "../ValantisApiBase";

//метод, который позовляет получить фильтрованный массив с продуктами, записать его в стор, и определисть статус фильтрации.

export const getFilteredProducts = async (params: FilterParams) => {
  try {
    productsStore.setIsFiltering(true);
    const filteredIds = await ValantisApiBase.filter(params);
    const data = await ValantisApiBase.get_items(filteredIds);
    productsStore.setFilteredProducts(data);
    productsStore.setIsFiltering(false);
  } catch (error) {
    reconnectOnError(getFilteredProducts, params);
  }
};
