import $axios_auth from "./interceptor";
import { FilterParams } from "../types/interfaces";
import { getErrorMessage } from "../services/getErrorMessage";
import { showError } from "../services/showError";
import { ValantisApiError } from "./error/ValantisApiError";

export default class ValantisApiBase {
  static async apiBase<TParams>(action: string, params: TParams) {
    try {
      const response = await $axios_auth.post("/", {
        action,
        params,
      });
      return response.data.result;
    } catch (error: unknown) {
      const err = new ValantisApiError(getErrorMessage(error, action));
      showError(err);
      throw err;
    }
  }

  static async get_items(ids: string[]) {
    return this.apiBase("get_items", { ids });
  }

  static async get_ids(offset?: number, limit?: number) {
    return this.apiBase("get_ids", { offset, limit });
  }

  static async get_fields(field: string, offset?: number, limit?: number) {
    return this.apiBase("get_fields", { field, offset, limit });
  }

  static async filter(params: FilterParams) {
    return this.apiBase("filter", { [params.filterType]: params.filterQuery });
  }
}
