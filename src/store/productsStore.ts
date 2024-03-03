import { makeAutoObservable } from "mobx";
import { ProductProps } from "../api/valantisApi";

class ProductStore {
  _products: ProductProps[] | [];
  _filteredProducts: ProductProps[] | [];
  _status: string;
  _brands: string[];
  _prices: number[];

  constructor() {
    makeAutoObservable(this);
    this._products = [];
    this._filteredProducts = [];
    this._status = "initial";
    this._brands = [];
    this._prices = [];
  }

  setProducts(products: ProductProps[]): void {
    this._products = products;
  }
  setStatus(status: string): void {
    this._status = status;
  }
  setFilteredProducts(products: ProductProps[]): void {
    this._filteredProducts = products;
  }
  setBrands(brands: string[]): void {
    this._brands = brands;
  }
  setPrices(prices: number[]): void {
    this._prices = prices;
  }

  get products(): ProductProps[] {
    return this._products;
  }
  get filteredProducts(): ProductProps[] {
    return this._filteredProducts;
  }
  get prices(): number[] {
    return this._prices;
  }
  get brands(): string[] {
    return this._brands;
  }
  get status(): string {
    return this._status;
  }
}
export default new ProductStore();
