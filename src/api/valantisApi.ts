import $axios_auth from "./interceptor";

export interface ValantisActionParams {
  price: number;
  offset: number;
  limit: number;
  ids: string[];
  field: string;
}

export default class ValantisApi {
  static async sendQuery(action: string, params: ValantisActionParams) {
    const response = await $axios_auth.post("/", {
      action,
      params,
    });
    return response;
  }
}
