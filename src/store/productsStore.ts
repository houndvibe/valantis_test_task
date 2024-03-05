import { makeAutoObservable } from "mobx";
import { ProductProps } from "../api/valantisApi";

class ProductStore {
  _isLoading: boolean;
  _isError: boolean;
  _brands: string[];
  _prices: number[];
  _products: ProductProps[] | [];
  _filteredProducts: ProductProps[] | [];

  constructor() {
    makeAutoObservable(this);
    this._isLoading = false;
    this._isError = false;
    this._brands = [];
    this._prices = [];
    this._products = [];
    this._filteredProducts = [];
  }

  setIsLoading(status: boolean): void {
    this._isLoading = status;
  }
  setisError(isError: boolean): void {
    this._isError = isError;
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

  get isLoading(): boolean {
    return this._isLoading;
  }
  get isError(): boolean {
    return this._isError;
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
