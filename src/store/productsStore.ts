import { makeAutoObservable } from "mobx";
import { ProductProps } from "../api/valantisApi";

type DataLoadingStatus = "ok" | "loading";

class ProductStore {
  _status: DataLoadingStatus;
  _brands: string[];
  _prices: number[];
  _products: ProductProps[] | [];
  _filteredProducts: ProductProps[] | [];

  constructor() {
    makeAutoObservable(this);
    this._status = "ok";
    this._brands = [];
    this._prices = [];
    this._products = [];
    this._filteredProducts = [];
  }

  setStatus(status: DataLoadingStatus): void {
    this._status = status;
  }
  setBrands(brands: string[]): void {
    this._brands = brands;
  }
  setPrices(prices: number[]): void {
    this._prices = prices;
  }
  setProducts(products: ProductProps[]): void {
    this._products = products;
  }
  setFilteredProducts(products: ProductProps[]): void {
    this._filteredProducts = products;
  }

  get status(): string {
    return this._status;
  }
  get brands(): string[] {
    return this._brands;
  }
  get prices(): number[] {
    return this._prices;
  }
  get products(): ProductProps[] {
    return this._products;
  }
  get filteredProducts(): ProductProps[] {
    return this._filteredProducts;
  }
}

export default new ProductStore();
