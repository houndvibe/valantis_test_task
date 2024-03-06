import { reconnectOnError } from "../../services/reconnectOnError";
import productsStore from "../../store/productsStore";
import ValantisApiBase from "../ValantisApiBase";

//позволяет получить массив с продуктами указанной величины c указанным отступом и записать его в стор.

export const getProducts = async (offset?: number, limit?: number) => {
  try {
    const ids = await ValantisApiBase.get_ids(offset, limit);
    const products = await ValantisApiBase.get_items(ids);
    productsStore.setProducts(productsStore.products.concat(products));
  } catch (e) {
    reconnectOnError(getProducts);
  }
};
