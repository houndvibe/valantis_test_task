import { toast } from "react-toastify";
import {
  ValantisApiError,
  getErrorMessage,
  reconnectOnError,
  showError,
} from "../services/services";
import ProductStore from "../store/productsStore";
import $axios_auth from "./interceptor";

export interface ProductProps {
  brand: string;
  id: string;
  price: number;
  product: string;
}

export interface TableProductProps extends ProductProps {
  key: number | string;
  index: number;
}

export interface FilterParams {
  filterType: string;
  filterQuery: string | number;
}

export default class ValantisApi {
  //Имплементирум дефолтные методы представленного api
  static async get_ids(offset?: number, limit?: number) {
    try {
      const response = await $axios_auth.post("/", {
        action: "get_ids",
        params: { offset, limit },
      });
      return response.data.result;
    } catch (error: unknown) {
      throw new ValantisApiError(getErrorMessage(error, "get_ids"));
    }
  }

  static async get_items(ids: string[]) {
    try {
      const response = await $axios_auth.post("/", {
        action: "get_items",
        params: { ids },
      });
      return response.data.result;
    } catch (error: unknown) {
      throw new ValantisApiError(getErrorMessage(error, "get_items"));
    }
  }

  static async get_fields(field: string, offset?: number, limit?: number) {
    try {
      const response = await $axios_auth.post("/", {
        action: "get_fields",
        params: { field, offset, limit },
      });
      return response.data.result;
    } catch (error: unknown) {
      throw new ValantisApiError(getErrorMessage(error, "get_fields"));
    }
  }

  static async filter(params: FilterParams) {
    try {
      const response = await $axios_auth.post("/", {
        action: "filter",
        params: { [params.filterType]: params.filterQuery },
      });
      return response.data.result;
    } catch (error: unknown) {
      throw new ValantisApiError(getErrorMessage(error, "filter"));
    }
  }

  //Добавим несколько доболнительных, более универсальных методов:
  //Каждый из них в случае ошибки Api выводит текст ошибки и отправляет повторный запрос

  //метод, который позволяет получить массив с продуктами указанной величины c указанным отступом и записать его в стор.
  static async getProducts(offset?: number, limit?: number) {
    const ids = await this.get_ids(offset, limit);
    const products = await this.get_items(ids);
    ProductStore.setProducts(ProductStore.products.concat(products));
  }

  //метод, который позовляет быстро получить список цен для дальнейшего вычисления нижней и верхней границы фильтра цен
  static async getPrices() {
    try {
      const prices = await ValantisApi.get_fields("price");
      //в нашем случае это хорошее место чтобы определить общее количество данных
      ProductStore.setDataArrayLength(prices.length);
      const set = new Set();
      for (const price of prices) {
        set.add(price);
      }

      const uniquePrices: number[] = Array.from(set.values()) as number[];
      ProductStore.setPrices(uniquePrices);
    } catch (error) {
      showError(error);
      reconnectOnError(this.getPrices);
    }
  }

  //метод, который позовляет быстро получить список брендов для дальнейшего использования в select-фильтре по бренду
  static async getBrands() {
    try {
      const brands = await ValantisApi.get_fields("brand");
      const filtered = brands.filter((item: string | null) => item);

      const set = new Set();
      for (const item of filtered) {
        set.add(item);
      }
      const uniqueItems: string[] = Array.from(set.values()) as string[];

      ProductStore.setBrands(uniqueItems);
    } catch (error) {
      showError(error);
      reconnectOnError(this.getBrands);
    }
  }

  //метод, который позовляет получить фильтрованный массив с продуктами, записать его в стор, и определисть статус фильтрации.
  static async getFilteredProducts(params: FilterParams) {
    try {
      ProductStore.setIsFiltering(true);
      const filteredIds = await this.filter(params);
      const data = await this.get_items(filteredIds);

      ProductStore.setFilteredProducts(data);
      ProductStore.setIsFiltering(false);
    } catch (error) {
      showError(error);
      reconnectOnError(this.getFilteredProducts, params);
    }
  }

  //метод, который позволяет получить все необходимые данные при запуске приложения
  static async init() {
    let dataTotalCount, dataFirstPartLength, dataSecondPartLength;
    try {
      //быстро получим 5% данных для заполнения первых страниц, чтобы юзеру было чем заняться
      if (!ProductStore.products.length) {
        ProductStore.setIsLoading(true);
        await this.getBrands();
        await this.getPrices();
        //разобьем общее количество данных на 2 части 5% и 95%
        dataTotalCount = ProductStore.dataArrayLength;
        dataFirstPartLength = Math.round((dataTotalCount / 100) * 5);
        dataSecondPartLength = dataTotalCount - dataFirstPartLength;
        //быстро получим 5%
        await this.getProducts(0, dataFirstPartLength);
        ProductStore.setIsLoading(false);
      }

      //Получим остальные 95% данные фоном
      ProductStore.setIsUploading(true);
      await this.getProducts(dataFirstPartLength!, dataSecondPartLength!);
      ProductStore.setIsUploading(false);
      toast.success(`Все данные успешно загружены`);
    } catch (error: unknown) {
      ProductStore.setIsUploading(false);
      showError(error);
      reconnectOnError(this.init);
    }
  }
}
