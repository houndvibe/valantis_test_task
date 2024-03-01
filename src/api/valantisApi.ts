import { getErrorMessage } from "../services/services";
import ProductStore from "../store/productsStore";
import $axios_auth from "./interceptor";

class ValantisApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "THIS IS VALANTIS API ERROR";
  }
}

type ProductBrand = null | string;

export interface ProductProps {
  brand: ProductBrand;
  id: string;
  price: number;
  product: string;
}

export interface TableProductProps extends ProductProps {
  key: number | string;
  index: number;
}

interface FilterParams {
  filterType: string;
  filterQuery: string | number;
}

export default class ValantisApi {
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

  static async get_fields(
    field: string,
    offset?: number,
    limit?: number
  ): Promise<ProductBrand[]> {
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

  //метод, который позволяет получить массив с продуктами, с заданным отступом и лимитом
  static async getSomeItems(offset?: number, limit?: number) {
    try {
      ProductStore.setStatus("loading");

      const ids = await this.get_ids(offset, limit);
      const data = await this.get_items(ids);

      ProductStore.setProducts(data);
      ProductStore.setStatus("ok");
    } catch (error: unknown) {
      console.error(error);
      setTimeout(() => {
        this.getSomeItems(offset, limit);
      }, 1000);
    }
  }

  /*   static async upload(offset?: number, limit?: number) {
    ProductStore.setStatus("loading");

    const ids = await this.get_ids(offset, limit);
    const data = await this.get_items(ids);

    const x = ProductStore.products;

    const y = x.concat(data).map((item, index) => {
      return { ...item, index: index + 1 };
    });

    console.log(y);

    ProductStore.setProducts(y);
    ProductStore.setStatus("ok");
  } */

  //метод, который позовляет получить фильтрованный массив с продуктами
  static async getFilteredItems(params: FilterParams) {
    try {
      ProductStore.setStatus("loading");

      const filteredIds = await this.filter(params);
      const data = await this.get_items(filteredIds);

      ProductStore.setLength(data.length);
      ProductStore.setProducts(data);
      ProductStore.setStatus("ok");
    } catch (error) {
      console.error(error);
      setTimeout(() => {
        this.getFilteredItems(params);
      }, 1000);
    }
  }

  //метод, который позовляет получить список брендов для дальнейшего использования в фильтре
  static async getAllBrands() {
    try {
      const brands = await ValantisApi.get_fields("brand");

      const filtered = brands.filter((item: string | null) => item);

      const set = new Set();
      for (const item of filtered) {
        set.add(item);
      }

      const uniqueItems: string[] = Array.from(set.values()) as string[];

      ProductStore.setLength(brands.length);
      ProductStore.setBrands(uniqueItems);
    } catch (error) {
      console.error(error);
      setTimeout(() => {
        this.getAllBrands();
      }, 1000);
    }
  }

  //метод, который позовляет получить список цен для дальнейшего вычисления нижней и верхней границы фильтра цен
  static async getAllPrices() {
    try {
      const prices = await ValantisApi.get_fields("price");

      const set = new Set();
      for (const price of prices) {
        set.add(price);
      }

      const uniquePrices: number[] = Array.from(set.values()) as number[];
      ProductStore.setPrices(uniquePrices);
    } catch (error) {
      console.error(error);
      setTimeout(() => {
        this.getAllPrices();
      }, 1000);
    }
  }

  //Метод для получения необоходимых данных с сервера при запуске приложения.
  static async init() {
    //Запрашиваем 55 позиций за раз, а не 50, т.к некоторые позиции могут быть упразнены из за дублирования.
    this.getSomeItems(0, 50);
    this.getAllBrands();
    this.getAllPrices();
  }
}
