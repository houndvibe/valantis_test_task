import { makeAutoObservable } from "mobx";
import { ProductProps } from "../api/valantisApi";

class ProductStore {
  _products: ProductProps[] | [];
  _status: string;
  _brands: string[];
  _prices: string[];
  _length: number;

  constructor() {
    makeAutoObservable(this);
    this._products = [];
    this._status = "initial";
    this._brands = [];
    this._prices = [];
    this._length = 0;
  }

  setProducts(products: ProductProps[]): void {
    this._products = products;
  }
  setStatus(status: string): void {
    this._status = status;
  }
  setBrands(brands: string[]): void {
    this._brands = brands;
  }
  setPrices(prices: string[]): void {
    this._prices = prices;
  }
  setLength(length: number): void {
    this._length = length;
  }

  get products(): ProductProps[] {
    return this._products;
  }
  get prices(): string[] {
    return this._prices;
  }
  get brands(): string[] {
    return this._brands;
  }
  get status(): string {
    return this._status;
  }
  get length(): number {
    return this._length;
  }
}
export default new ProductStore();
