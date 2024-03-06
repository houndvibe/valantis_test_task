import { Button, Flex, Input, InputNumber, Select } from "antd";
import productsStore from "../../store/productsStore";
import { useState } from "react";
import { TableFilterProps } from "../../types/interfaces";
import { getFilterWarningMessage } from "../../services/getFilterWarningMessage";
import { getFilteredProducts } from "../../api/productsApi/getFilteredProducts";

const TableFilter: React.FC<TableFilterProps> = ({
  onFilter: setIsTableFiltered,
  isTableFiltered,
}) => {
  const brands = productsStore.brands;
  const prices = productsStore.prices;

  const [minPrice, maxPrice] = [Math.min(...prices), Math.max(...prices)];

  const [filterType, setFilterType] = useState("");

  const [brandFilter, setBrandFilter] = useState("");
  const [productFilter, setProductFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState(0);

  const [errosMessage, setErrorMessage] = useState("");

  const handleChangeProductFilter = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProductFilter(e.target.value);
  };

  const handleChangePriceFilter = (value: number | null) => {
    setPriceFilter(value!);
  };

  const handleChangeBrandFilter = (brand: string) => {
    setBrandFilter(brand);
  };

  const handleChangeFilterType = (value: string) => {
    setFilterType(value);
  };

  const handleFilterKeyEnter = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      handleSendFilterQuery();
    }
  };

  const handleResetFilter = () => {
    setFilterType("");
    setProductFilter("");
    setBrandFilter("");
    setPriceFilter(minPrice);
    setIsTableFiltered(false);
  };

  const handleSendFilterQuery = async () => {
    const filterQuery =
      filterType == "price"
        ? priceFilter
        : filterType == "brand"
        ? brandFilter
        : productFilter;

    if (!filterType || !filterQuery) {
      const message = getFilterWarningMessage(filterType, filterQuery);
      setErrorMessage(message);
      return;
    }

    getFilteredProducts({
      filterType,
      filterQuery: filterQuery,
    });

    setErrorMessage("");
    setIsTableFiltered(true);
  };

  return brands.length && prices.length ? (
    <Flex gap={"middle"} align="center">
      Категория:
      <Select
        defaultValue={filterType}
        value={filterType}
        style={{ width: 120 }}
        options={[
          { value: "product", label: "Наименование" },
          { value: "brand", label: "Бренд" },
          { value: "price", label: "Цена" },
        ]}
        onChange={handleChangeFilterType}
        onKeyDown={handleFilterKeyEnter}
      />
      Значение:
      {filterType == "brand" ? (
        <Select
          value={brandFilter}
          style={{ width: 120 }}
          options={brands.map((brand) => {
            return { value: brand, label: brand };
          })}
          onChange={handleChangeBrandFilter}
          onKeyDown={handleFilterKeyEnter}
        />
      ) : filterType == "price" ? (
        <InputNumber
          defaultValue={minPrice}
          value={priceFilter}
          min={minPrice}
          max={maxPrice}
          onChange={handleChangePriceFilter}
          onKeyDown={handleFilterKeyEnter}
          onBlur={() => !priceFilter && setPriceFilter(minPrice)}
        />
      ) : (
        <Input
          value={productFilter}
          style={{ width: 120 }}
          placeholder="Золотое кольцо..."
          onChange={handleChangeProductFilter}
          onKeyDown={handleFilterKeyEnter}
        />
      )}
      <Button onClick={handleSendFilterQuery}>Фильтровать</Button>
      {isTableFiltered ? (
        <Button onClick={handleResetFilter}>Сбросить фильтр</Button>
      ) : null}
      {errosMessage && <div style={{ color: "red" }}>{errosMessage}</div>}
    </Flex>
  ) : null;
};
export default TableFilter;
