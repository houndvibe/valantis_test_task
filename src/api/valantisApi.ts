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

type MasterQueryResponse =
  | Promise<string[]>
  | Promise<ProductProps[]>
  | Promise<ProductBrand[]>;

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

export default class ValantisApi {
  static async sendMasterQuery(
    action: string,
    params: ValantisActionParams
  ): Promise<MasterQueryResponse> {
    const response = await $axios_auth.post("/", {
      action,
      params,
    });
    return response.data.result;
  }

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
    offset: number,
    limit: number
  ): Promise<ProductBrand[]> {
    const response = await $axios_auth.post("/", {
      action: "get_fields",
      params: { field, offset, limit },
    });
    return response.data.result;
  }

  static async filter(params: ValantisActionParams): Promise<string[]> {
    const response = await $axios_auth.post("/", {
      action: "filter",
      params,
    });
    return response.data.result;
  }

  static async getAllItems(offset?: number, limit?: number) {
    ProductStore.setStatus("loading");
    const ids = await this.get_ids(offset, limit);
    const data = await this.get_items(ids);
    ProductStore.setProducts(data);
    ProductStore.setStatus("ok");
  }
}
