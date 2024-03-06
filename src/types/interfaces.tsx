export interface ProductProps {
  brand: string;
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
export interface FilterProps {
  isTableFiltered: boolean;
  onFilter: (value: boolean) => void;
}
export interface SelectFilterValueProp {
  filterType: string;
  priceFilterValue: number | null;
  productFilterValue: string;
  brandFilterValue: string;
  onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => void;
  onBrandChange: (value: string) => void;
  onPriceChange: (price: number | null) => void;
  onProductChange: (product: string) => void;
}
export interface SelectFilterTypeProps {
  value: string;
  onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => void;
  onChange: (value: string) => void;
}
