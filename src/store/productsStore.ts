import { makeAutoObservable } from "mobx";
import { ProductProps } from "../api/valantisApi";

class ProductStore {
  _products: ProductProps[] | [];
  _status: string;

  constructor() {
    makeAutoObservable(this);
    this._products = [];
    this._status = "initial";
  }

  setProducts(products: ProductProps[]): void {
    this._products = products;
  }

  setStatus(status: string): void {
    this._status = status;
  }

  get products(): ProductProps[] {
    return this._products;
  }
  get status(): string {
    return this._status;
  }
}
export default new ProductStore();
