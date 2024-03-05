import { makeAutoObservable } from "mobx";
import { ProductProps } from "../api/valantisApi";

class ProductStore {
  _isLoading: boolean;
  _isUploading: boolean;
  _isFiltering: boolean;
  _isError: boolean;
  _brands: string[];
  _prices: number[];
  _products: ProductProps[] | [];
  _filteredProducts: ProductProps[] | [];
  _dataArrayLength: number;

  constructor() {
    makeAutoObservable(this);
    this._isLoading = false;
    this._isUploading = false;
    this._isFiltering = false;
    this._isError = false;
    this._brands = [];
    this._prices = [];
    this._products = [];
    this._filteredProducts = [];
    this._dataArrayLength = 0;
  }

  setIsLoading(status: boolean): void {
    this._isLoading = status;
  }
  setIsUploading(isUploading: boolean): void {
    this._isUploading = isUploading;
  }
  setIsFiltering(isFiltering: boolean): void {
    this._isFiltering = isFiltering;
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
  setDataArrayLength(length: number): void {
    this._dataArrayLength = length;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }
  get isUploading(): boolean {
    return this._isUploading;
  }
  get isFiltering(): boolean {
    return this._isFiltering;
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
  get dataArrayLength(): number {
    return this._dataArrayLength;
  }
}

export default new ProductStore();
