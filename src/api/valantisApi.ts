import ProductStore from "../store/productsStore";
import $axios_auth from "./interceptor";

export interface ValantisActionParams {
  price?: number;
  offset?: number;
  limit?: number;
  ids?: string[];
  field?: string;
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

export interface FilterParams {
  filterType: string;
  filterQuery: string | number;
}

export default class ValantisApi {
  static async get_ids(offset?: number, limit?: number): Promise<string[]> {
    const response = await $axios_auth.post("/", {
      action: "get_ids",
      params: { offset, limit },
    });
    return response.data.result;
  }

  static async get_items(ids: string[]): Promise<ProductProps[]> {
    const response = await $axios_auth.post("/", {
      action: "get_items",
      params: { ids },
    });
    return response.data.result;
  }

  static async get_fields(
    field: string,
    offset?: number,
    limit?: number
  ): Promise<ProductBrand[]> {
    const response = await $axios_auth.post("/", {
      action: "get_fields",
      params: { field, offset, limit },
    });
    return response.data.result;
  }

  static async filter(params: FilterParams): Promise<string[]> {
    const response = await $axios_auth.post("/", {
      action: "filter",
      params: { [params.filterType]: params.filterQuery },
    });
    return response.data.result;
  }

  //метод, который позволяет получить массив с продуктами, с заданным отступом и лимитом
  static async getAllItems(offset?: number, limit?: number) {
    ProductStore.setStatus("loading");

    const ids = await this.get_ids(offset, limit);
    const data = await this.get_items(ids);

    ProductStore.setProducts(data);
    ProductStore.setStatus("ok");
  }

  //метод, который позовляет получить фильтрованный массив с продуктами
  static async getFilteredItems(params: FilterParams) {
    ProductStore.setStatus("loading");

    const filteredIds = await this.filter(params);
    const data = await this.get_items(filteredIds);

    ProductStore.setProducts(data);
    ProductStore.setStatus("ok");
  }

  //метод, который позовляет получить список брендов для дальнейшего использования в фильтре
  static async getAllBrands() {
    const brands = await ValantisApi.get_fields("brand");

    const filtered = brands.filter((item: string | null) => item);

    const set = new Set();
    for (const item of filtered) {
      set.add(item);
    }

    const uniqueItems: string[] = Array.from(set.values()) as string[];

    ProductStore.setLength(brands.length);
    ProductStore.setBrands(uniqueItems);
  }

  //метод, который позовляет получить список цен для дальнейшего вычисления нижней и верхней границы фильтра цен
  static async getAllPrices() {
    const prices = await ValantisApi.get_fields("price");

    const set = new Set();
    for (const price of prices) {
      set.add(price);
    }

    const uniquePrices: string[] = Array.from(set.values()) as string[];
    ProductStore.setPrices(uniquePrices);
  }

  //Получаем необходимые данные с сервера при запуске прилодения
  static async init() {
    //Запрашиваем 55 позиций за раз, а не 50, т.к некоторые позиции могут быть упразднены из за дублирования.
    this.getAllItems(0, 55);
    this.getAllBrands();
    this.getAllPrices();
  }
}
