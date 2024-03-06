import { Input, InputNumber, Select } from "antd";
import productsStore from "../../store/productsStore";
import { SelectFilterValueProp } from "../../types/interfaces";

const SelectFilterValue: React.FC<SelectFilterValueProp> = ({
  filterType,
  priceFilterValue,
  brandFilterValue,
  productFilterValue,
  onKeyDown,
  onBrandChange,
  onPriceChange,
  onProductChange,
}) => {
  const brands = productsStore.brands;
  const prices = productsStore.prices;

  const handleChangeProductFilter = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onProductChange(e.target.value);
  };

  const [minPrice, maxPrice] = [Math.min(...prices), Math.max(...prices)];
  return (
    <div>
      {"Значение: "}
      {filterType == "brand" ? (
        <Select
          value={brandFilterValue}
          style={{ width: 120 }}
          options={brands.map((brand) => {
            return { value: brand, label: brand };
          })}
          onChange={onBrandChange}
          onKeyDown={onKeyDown}
        />
      ) : filterType == "price" ? (
        <InputNumber
          defaultValue={minPrice}
          value={priceFilterValue}
          min={minPrice}
          max={maxPrice}
          onChange={onPriceChange}
          onKeyDown={onKeyDown}
          onBlur={() => !priceFilterValue && onPriceChange(minPrice)}
        />
      ) : (
        <Input
          value={productFilterValue}
          style={{ width: 120 }}
          placeholder="Золотое кольцо..."
          onChange={handleChangeProductFilter}
          onKeyDown={onKeyDown}
        />
      )}
    </div>
  );
};

export default SelectFilterValue;
