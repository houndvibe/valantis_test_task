import { toast } from "react-toastify";
import productsStore from "../../store/productsStore";
import { getBrands } from "./getBrands";
import { getPrices } from "./getPrices";
import { getProducts } from "./getProducts";
import { reconnectOnError } from "../../services/reconnectOnError";
import { calculateOffsets } from "../../services/calculateOFfsets";

//метод, который позволяет получить все необходимые данные при запуске приложения

export const onAppStart = async () => {
  let dataFirstPartLength, dataSecondPartLength;
  try {
    if (!productsStore.products.length) {
      productsStore.setIsLoading(true);
      await getBrands();
      await getPrices();

      //разобьем общее количество данных на 2 части 5% и 95%
      [dataFirstPartLength, dataSecondPartLength] = calculateOffsets(
        productsStore.dataArrayLength
      );

      //быстро получим 5% данных
      await getProducts(0, dataFirstPartLength);
      productsStore.setIsLoading(false);
    }

    //Получим остальные 95% данные фоном
    productsStore.setIsUploading(true);
    await getProducts(dataFirstPartLength, dataSecondPartLength);
    productsStore.setIsUploading(false);

    toast.success(`Все данные успешно загружены`);
  } catch (error: unknown) {
    reconnectOnError(onAppStart);
  }
};
