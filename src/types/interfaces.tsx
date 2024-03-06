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
export interface TableFilterProps {
  isTableFiltered: boolean;
  onFilter: (value: boolean) => void;
}
