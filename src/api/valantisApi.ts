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
      throw new ValantisApiError(getErrorMessage(error));
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
      throw new ValantisApiError(getErrorMessage(error));
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
      throw new ValantisApiError(getErrorMessage(error));
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
      throw new ValantisApiError(getErrorMessage(error));
    }
  }

  //Добавим несколько доболнительных, более универсальных методов:
  //Каждый из них в случае ошибки Api выводит текст ошибки и отправляет повторный запрос

  //метод, который позволяет получить массив с продуктами, записать его в стор, и определисть статус загрузки.
  static async getAllProducts() {
    try {
      //получим данные для первых страниц, чтобы юзеру было чем заняться
      if (!ProductStore.products.length) {
        ProductStore.setIsLoading(true);
        const firstIds = await this.get_ids(0, 300);
        const firstData = await this.get_items(firstIds);
        ProductStore.setProducts(firstData);
        ProductStore.setIsLoading(false);
      }

      //Получим остальные данные фоном
      ProductStore.setIsUploading(true);
      const restIds = await this.get_ids(300);
      const restData = await this.get_items(restIds);
      ProductStore.setProducts(ProductStore.products.concat(restData));
      ProductStore.setIsUploading(false);
      toast.success(`Все данные успешно загружены`);
    } catch (error: unknown) {
      ProductStore.setIsUploading(false);
      showError(error);
      reconnectOnError(this.getAllProducts);
    }
  }

  //метод, который позовляет получить фильтрованный массив с продуктами, записать его в стор, и определисть статус загрузки.
  static async getFilteredProducts(params: FilterParams) {
    try {
      ProductStore.setIsLoading(true);

      const filteredIds = await this.filter(params);
      const data = await this.get_items(filteredIds);

      ProductStore.setFilteredProducts(data);
      ProductStore.setIsLoading(false);
    } catch (error) {
      showError(error);
      reconnectOnError(this.getFilteredProducts, params);
    }
  }

  //метод, который позовляет получить список брендов для дальнейшего использования в select-фильтре по бренду
  static async getAllBrands() {
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
      reconnectOnError(this.getAllBrands);
    }
  }

  //метод, который позовляет получить список цен для дальнейшего вычисления нижней и верхней границы фильтра цен
  static async getAllPrices() {
    try {
      const prices = await ValantisApi.get_fields("price");
      ProductStore.setDataArrayLength(prices.length);

      const set = new Set();
      for (const price of prices) {
        set.add(price);
      }

      const uniquePrices: number[] = Array.from(set.values()) as number[];
      ProductStore.setPrices(uniquePrices);
    } catch (error) {
      showError(error);
      reconnectOnError(this.getAllPrices);
    }
  }

  //Метод для получения всех необоходимых данных при запуске приложения.
  static async init() {
    this.getAllBrands();
    this.getAllPrices();
    this.getAllProducts();
  }
}
